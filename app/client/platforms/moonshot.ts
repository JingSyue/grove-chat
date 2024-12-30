"use client";
/**
 * Moonshot API Client Implementation
 * Handles chat completions and image recognition capabilities
 */
import {
  ApiPath,
  MOONSHOT_BASE_URL,
  Moonshot,
  REQUEST_TIMEOUT_MS,
} from "@/app/constant";
import {
  useAccessStore,
  useAppConfig,
  useChatStore,
  ChatMessageTool,
  usePluginStore,
} from "@/app/store";
import { stream } from "@/app/utils/chat";
import {
  ChatOptions,
  getHeaders,
  LLMApi,
  LLMModel,
  SpeechOptions,
} from "../api";
import { getClientConfig } from "@/app/config/client";
import { RequestPayload } from "./openai";
import { getMessageTextContent } from "@/app/utils";
import { fetch } from "@/app/utils/stream";

export class MoonshotApi implements LLMApi {
  private disableListModels = true;

  path(path: string): string {
    const accessStore = useAccessStore.getState();

    let baseUrl = "";

    if (accessStore.useCustomConfig) {
      baseUrl = accessStore.moonshotUrl;
    }

    if (baseUrl.length === 0) {
      const isApp = !!getClientConfig()?.isApp;
      const apiPath = ApiPath.Moonshot;
      baseUrl = isApp ? MOONSHOT_BASE_URL : apiPath;
    }

    if (baseUrl.endsWith("/")) {
      baseUrl = baseUrl.slice(0, baseUrl.length - 1);
    }
    if (!baseUrl.startsWith("http") && !baseUrl.startsWith(ApiPath.Moonshot)) {
      baseUrl = "https://" + baseUrl;
    }

    console.log("[Proxy Endpoint] ", baseUrl, path);

    return [baseUrl, path].join("/");
  }

  extractMessage(res: any) {
    return res.choices?.at(0)?.message?.content ?? "";
  }

  speech(options: SpeechOptions): Promise<ArrayBuffer> {
    throw new Error("Method not implemented.");
  }

  async chat(options: ChatOptions) {
    const messages: ChatOptions["messages"] = [];
    const imageProcessingTasks: Promise<any>[] = [];

    for (const v of options.messages) {
      if (Array.isArray(v.content)) {
        // 收集當前消息中的所有圖片處理任務
        const currentMessageTasks = v.content
          .filter((item) => item.type === "image_url" && item.image_url?.url)
          .map(async (item) => {
            try {
              //console.log('[Moonshot] Processing image:', item.image_url!.url);

              // 並行處理圖片獲取和 FormData 準備
              const [imageResponse, formData] = await Promise.all([
                fetch(item.image_url!.url),
                Promise.resolve(new FormData()),
              ]);

              const blob = await imageResponse.blob();
              formData.append("file", blob, "image.jpg");
              formData.append("purpose", "file-extract");

              // 上傳文件
              const uploadResult = await this.uploadFile(formData);
              // console.log('[Moonshot] Upload success:', uploadResult);

              // 獲取文件內容
              const contentResponse = await fetch(
                this.path(`v1/files/${uploadResult.id}/content`),
                {
                  headers: getHeaders(),
                },
              );

              if (!contentResponse.ok) {
                throw new Error("Failed to get file content");
              }

              const fileContent = await contentResponse.text();
              return {
                role: "system",
                content:
                  "Please analyze the content of the provided document and output the complete text in a well-formatted way." +
                  fileContent,
              };
            } catch (error) {
              console.error("[Moonshot] Image processing error:", error);
              return null;
            }
          });

        imageProcessingTasks.push(...currentMessageTasks);

        // 處理文字內容
        const textContent = v.content
          .filter((item) => item.type === "text")
          .map((item) => item.text)
          .join("\n");

        if (textContent) {
          messages.push({ role: v.role, content: textContent });
        }
      } else {
        messages.push({ role: v.role, content: v.content });
      }
    }

    // 等待所有圖片處理完成
    const imageResults = await Promise.all(imageProcessingTasks);
    messages.push(...imageResults.filter(Boolean));

    console.log("[Moonshot] Final messages:", messages);
    const modelConfig = {
      ...useAppConfig.getState().modelConfig,
      ...useChatStore.getState().currentSession().mask.modelConfig,
      ...{
        model: options.config.model,
        providerName: options.config.providerName,
      },
    };

    const requestPayload: RequestPayload = {
      messages,
      stream: options.config.stream,
      model: modelConfig.model,
      temperature: modelConfig.temperature,
      presence_penalty: modelConfig.presence_penalty,
      frequency_penalty: modelConfig.frequency_penalty,
      top_p: modelConfig.top_p,
      max_tokens: Math.max(5000, 1024), // todo: max_token size is set to 5000 for image/file extraction, but it can be adjusted
      // see https://platform.moonshot.cn/docs/guide/faq to estimate max_token size
    };

    console.log("[Request] moonshot payload: ", requestPayload);

    const shouldStream = !!options.config.stream;
    const controller = new AbortController();
    options.onController?.(controller);

    try {
      const chatPath = this.path(Moonshot.ChatPath);
      const chatPayload = {
        method: "POST",
        body: JSON.stringify(requestPayload),
        signal: controller.signal,
        headers: getHeaders(),
      };

      // make a fetch request
      const requestTimeoutId = setTimeout(
        () => controller.abort(),
        REQUEST_TIMEOUT_MS * 5,
      );

      if (shouldStream) {
        const [tools, funcs] = usePluginStore
          .getState()
          .getAsTools(
            useChatStore.getState().currentSession().mask?.plugin || [],
          );
        return stream(
          chatPath,
          requestPayload,
          getHeaders(),
          tools as any,
          funcs,
          controller,
          // parseSSE
          (text: string, runTools: ChatMessageTool[]) => {
            // console.log("parseSSE", text, runTools);
            const json = JSON.parse(text);
            const choices = json.choices as Array<{
              delta: {
                content: string;
                tool_calls: ChatMessageTool[];
              };
            }>;
            const tool_calls = choices[0]?.delta?.tool_calls;
            if (tool_calls?.length > 0) {
              const index = tool_calls[0]?.index;
              const id = tool_calls[0]?.id;
              const args = tool_calls[0]?.function?.arguments;
              if (id) {
                runTools.push({
                  id,
                  type: tool_calls[0]?.type,
                  function: {
                    name: tool_calls[0]?.function?.name as string,
                    arguments: args,
                  },
                });
              } else {
                // @ts-ignore
                runTools[index]["function"]["arguments"] += args;
              }
            }
            return choices[0]?.delta?.content;
          },
          // processToolMessage, include tool_calls message and tool call results
          (
            requestPayload: RequestPayload,
            toolCallMessage: any,
            toolCallResult: any[],
          ) => {
            // @ts-ignore
            requestPayload?.messages?.splice(
              // @ts-ignore
              requestPayload?.messages?.length,
              0,
              toolCallMessage,
              ...toolCallResult,
            );
          },
          options,
        );
      } else {
        const res = await fetch(chatPath, chatPayload);
        clearTimeout(requestTimeoutId);

        const resJson = await res.json();
        const message = this.extractMessage(resJson);
        options.onFinish(message, res);
      }
    } catch (e) {
      console.log("[Request] failed to make a chat request", e);
      options.onError?.(e as Error);
    }
  }
  async usage() {
    return {
      used: 0,
      total: 0,
    };
  }

  async models(): Promise<LLMModel[]> {
    return [];
  }

  /**
   * Implements file upload for image recognition
   * Processes images and extracts content using Moonshot's vision capabilities
   * @param formData Form data containing the image file
   * @returns Upload response with file ID
   */
  async uploadFile(formData: FormData): Promise<any> {
    try {
      const uploadResponse = await fetch(this.path(Moonshot.FilePath), {
        method: "POST",
        headers: getHeaders(true),
        body: formData,
        // @ts-ignore
        duplex: "half",
      });

      if (!uploadResponse.ok) {
        let errorMessage = "Upload failed";
        try {
          const errorData = await uploadResponse.json();
          errorMessage = errorData.error?.message || errorMessage;
        } catch {
          errorMessage = `Upload failed with status ${uploadResponse.status}`;
        }
        console.error("[Moonshot] Upload failed:", errorMessage);
        throw new Error(errorMessage);
      }

      const result = await uploadResponse.json();
      // console.log('[Moonshot] File uploaded:', result);
      return result;
    } catch (error) {
      // console.error('[Moonshot] File upload error:', error);
      throw error;
    }
  }
}
