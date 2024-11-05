// server/moonshot.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/api/auth";
import { ModelProvider, MOONSHOT_BASE_URL } from "@/app/constant";

export async function handle(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  console.log("[Moonshot Route] params ", params);

  if (req.method === "OPTIONS") {
    return NextResponse.json({ body: "OK" }, { status: 200 });
  }

  const authResult = auth(req, ModelProvider.Moonshot);
  if (authResult.error) {
    return NextResponse.json(authResult, {
      status: 401,
    });
  }

  try {
    let path = `${req.nextUrl.pathname}`.replace("/api/moonshot/", "");
    const baseUrl = MOONSHOT_BASE_URL;
    const fetchUrl = `${baseUrl}/${path}`;

    console.log("[Moonshot Server] Target URL:", fetchUrl);

    const contentType = req.headers.get("content-type") || "";
    const isFormData = contentType.includes("multipart/form-data");

    // 準備 fetchOptions
    const fetchOptions: RequestInit = {
      method: req.method,
      headers: {
        Authorization: req.headers.get("Authorization") ?? "",
      },
      // @ts-ignore
      duplex: "half",
    };

    // 根據請求類型處理 body 和 headers
    if (isFormData) {
      try {
        const formData = await req.formData();
        fetchOptions.body = formData;
      } catch (error) {
        console.error("[Moonshot] FormData error:", error);
        return NextResponse.json(
          { error: "Invalid form data" },
          { status: 400 },
        );
      }
    } else {
      fetchOptions.headers = {
        ...fetchOptions.headers,
        "Content-Type": "application/json",
      };
      fetchOptions.body = req.body;
    }

    // 發送請求
    const response = await fetch(fetchUrl, fetchOptions);

    // 處理響應
    const newHeaders = new Headers(response.headers);
    newHeaders.delete("www-authenticate");
    newHeaders.set("X-Accel-Buffering", "no");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  } catch (e) {
    console.error("[Moonshot] Error:", e);
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export const GET = handle;
export const POST = handle;

export const runtime = "edge";
