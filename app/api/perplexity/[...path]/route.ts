import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../auth";
import { getServerSideConfig } from "@/app/config/server";
import { ApiPath, PERPLEXITY_BASE_URL, ModelProvider } from "@/app/constant";
import { prettyObject } from "@/app/utils/format";

const serverConfig = getServerSideConfig();

async function handle(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  console.log("[Perplexity Route] params ", params);

  if (req.method === "OPTIONS") {
    return NextResponse.json({ body: "OK" }, { status: 200 });
  }

  const authResult = auth(req, ModelProvider.Perplexity);
  if (authResult.error) {
    return NextResponse.json(authResult, {
      status: 401,
    });
  }

  const bearToken = req.headers.get("Authorization") ?? "";
  const token = bearToken.trim().replaceAll("Bearer ", "").trim();

  const apiKey = token ? token : serverConfig.perplexityApiKey;

  if (!apiKey) {
    return NextResponse.json(
      {
        error: true,
        message: `missing PERPLEXITY_API_KEY in server env vars`,
      },
      {
        status: 401,
      },
    );
  }

  try {
    const response = await request(req, apiKey);
    return response;
  } catch (e) {
    console.error("[Perplexity] ", e);
    return NextResponse.json(prettyObject(e));
  }
}

export const GET = handle;
export const POST = handle;

export const runtime = "edge";

function validateAndAdjustParameters(body: any) {
  // Ensure frequency_penalty is greater than 0
  if (body.frequency_penalty !== undefined && body.frequency_penalty <= 0) {
    body.frequency_penalty = 0.01; // Set a small positive value
  }
  // Add more parameter validations here if needed
  return body;
}

async function request(req: NextRequest, apiKey: string) {
  const controller = new AbortController();

  let baseUrl = serverConfig.perplexityUrl || PERPLEXITY_BASE_URL;
  let path = `${req.nextUrl.pathname}`.replaceAll(ApiPath.Perplexity, "");

  if (!baseUrl.startsWith("http")) {
    baseUrl = `https://${baseUrl}`;
  }

  if (baseUrl.endsWith("/")) {
    baseUrl = baseUrl.slice(0, -1);
  }

  console.log("[Proxy] ", path);
  console.log("[Base Url]", baseUrl);

  const timeoutId = setTimeout(
    () => {
      controller.abort();
    },
    10 * 60 * 1000,
  );

  const fetchUrl = `${baseUrl}${path}`;

  console.log("[Fetch Url] ", fetchUrl);

  let body = await req.json();
  body = validateAndAdjustParameters(body);

  const fetchOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "Cache-Control": "no-store",
    },
    method: req.method,
    body: JSON.stringify(body),
    redirect: "manual",
    // @ts-ignore
    duplex: "half",
    signal: controller.signal,
  };

  try {
    const res = await fetch(fetchUrl, fetchOptions);

    if (!res.ok) {
      const errorBody = await res.text();
      return NextResponse.json(
        { error: true, message: `${res.status}: ${errorBody}` },
        { status: res.status },
      );
    }

    const newHeaders = new Headers(res.headers);
    newHeaders.delete("www-authenticate");
    newHeaders.set("X-Accel-Buffering", "no");

    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: newHeaders,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
