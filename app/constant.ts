export const OWNER = "robbiedood";
export const REPO = "grove-chat";
export const REPO_URL = `https://github.com/${OWNER}/${REPO}`;
export const FORM_URL = `https://bw2lfr9nusb.typeform.com/to/jsnWYdyx`;
export const ISSUE_URL = `https://github.com/${OWNER}/${REPO}/issues`;
export const PLUGINS_REPO_URL = `https://github.com/${OWNER}/NextChat-Awesome-Plugins`;
export const UPDATE_URL = `${REPO_URL}#keep-updated`;
export const RELEASE_URL = `${REPO_URL}/releases`;
export const FETCH_COMMIT_URL = `https://api.github.com/repos/${OWNER}/${REPO}/commits?per_page=1`;
export const FETCH_TAG_URL = `https://api.github.com/repos/${OWNER}/${REPO}/tags?per_page=1`;
export const RUNTIME_CONFIG_DOM = "danger-runtime-config";
export const GROVE_WEB_URL = `https://grove-web-os.firebaseapp.com/`;

export const STABILITY_BASE_URL = "https://api.stability.ai";

export const DEFAULT_API_HOST = "https://api.nextchat.dev";
export const OPENAI_BASE_URL = "https://api.openai.com";
export const ANTHROPIC_BASE_URL = "https://api.anthropic.com";

export const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/";

export const BAIDU_BASE_URL = "https://aip.baidubce.com";
export const BAIDU_OATUH_URL = `${BAIDU_BASE_URL}/oauth/2.0/token`;

export const BYTEDANCE_BASE_URL = "https://ark.cn-beijing.volces.com";

export const ALIBABA_BASE_URL = "https://dashscope.aliyuncs.com/api/";
export const MOONSHOT_BASE_URL = "https://api.moonshot.cn";

// perplexity
export const PERPLEXITY_BASE_URL = "https://api.perplexity.ai";

export const CACHE_URL_PREFIX = "/api/cache";
export const UPLOAD_URL = `${CACHE_URL_PREFIX}/upload`;

export const CUSTOMTITLE: string = "Grove"; //set your default custom title
export const CUSTOMSUBTITLE: string = "AI Assistant"; // set your default custom subtitle

export enum Path {
  Home = "/",
  Chat = "/chat",
  Settings = "/settings",
  NewChat = "/new-chat",
  Masks = "/masks",
  Plugins = "/plugins",
  Auth = "/auth",
  Sd = "/sd",
  SdNew = "/sd-new",
  Artifacts = "/artifacts",
}

export enum ApiPath {
  Cors = "",
  Azure = "/api/azure",
  OpenAI = "/api/openai",
  Anthropic = "/api/anthropic",
  Google = "/api/google",
  Baidu = "/api/baidu",
  ByteDance = "/api/bytedance",
  Alibaba = "/api/alibaba",
  Moonshot = "/api/moonshot",
  Stability = "/api/stability",
  Perplexity = "/api/perplexity",
  Artifacts = "/api/artifacts",
}

export enum SlotID {
  AppBody = "app-body",
  CustomModel = "custom-model",
}

export enum FileName {
  Masks = "masks.json",
  Prompts = "prompts.json",
}

export enum Plugin {
  Artifacts = "artifacts",
}

export enum StoreKey {
  Chat = "chat-next-web-store",
  Plugin = "chat-next-web-plugin",
  Access = "access-control",
  Config = "app-config",
  Mask = "mask-store",
  Prompt = "prompt-store",
  Update = "chat-update",
  Sync = "sync",
  SdList = "sd-list",
}

export const DEFAULT_SIDEBAR_WIDTH = 300;
export const MAX_SIDEBAR_WIDTH = 500;
export const MIN_SIDEBAR_WIDTH = 230;
export const NARROW_SIDEBAR_WIDTH = 100;

export const ACCESS_CODE_PREFIX = "nk-";

export const LAST_INPUT_KEY = "last-input";
export const UNFINISHED_INPUT = (id: string) => "unfinished-input-" + id;

export const STORAGE_KEY = "chatgpt-next-web";

export const REQUEST_TIMEOUT_MS = 60000;

export const EXPORT_MESSAGE_CLASS_NAME = "export-markdown";

export enum ServiceProvider {
  OpenAI = "OpenAI",
  Azure = "Azure",
  Google = "Google",
  Anthropic = "Anthropic",
  Baidu = "Baidu",
  ByteDance = "ByteDance",
  Alibaba = "Alibaba",
  Moonshot = "Moonshot",
  Stability = "Stability",
  Perplexity = "Perplexity",
}

// Google API safety settings, see https://ai.google.dev/gemini-api/docs/safety-settings
// BLOCK_NONE will not block any content, and BLOCK_ONLY_HIGH will block only high-risk content.
export enum GoogleSafetySettingsThreshold {
  BLOCK_NONE = "BLOCK_NONE",
  BLOCK_ONLY_HIGH = "BLOCK_ONLY_HIGH",
  BLOCK_MEDIUM_AND_ABOVE = "BLOCK_MEDIUM_AND_ABOVE",
  BLOCK_LOW_AND_ABOVE = "BLOCK_LOW_AND_ABOVE",
}

export enum ModelProvider {
  Stability = "Stability",
  GPT = "GPT",
  GeminiPro = "GeminiPro",
  Claude = "Claude",
  Ernie = "Ernie",
  Doubao = "Doubao",
  Qwen = "Qwen",
  Moonshot = "Moonshot",
  Perplexity = "Perplexity",
}

export const Stability = {
  GeneratePath: "v2beta/stable-image/generate",
  ExampleEndpoint: "https://api.stability.ai",
};

export const Anthropic = {
  ChatPath: "v1/messages",
  ChatPath1: "v1/complete",
  ExampleEndpoint: "https://api.anthropic.com",
  Vision: "2023-06-01",
};

export const OpenaiPath = {
  ChatPath: "v1/chat/completions",
  SpeechPath: "v1/audio/speech",
  ImagePath: "v1/images/generations",
  UsagePath: "dashboard/billing/usage",
  SubsPath: "dashboard/billing/subscription",
  ListModelPath: "v1/models",
};

export const Azure = {
  ChatPath: (deployName: string, apiVersion: string) =>
    `deployments/${deployName}/chat/completions?api-version=${apiVersion}`,
  // https://<your_resource_name>.openai.azure.com/openai/deployments/<your_deployment_name>/images/generations?api-version=<api_version>
  ImagePath: (deployName: string, apiVersion: string) =>
    `deployments/${deployName}/images/generations?api-version=${apiVersion}`,
  ExampleEndpoint: "https://{resource-url}/openai",
};

export const Google = {
  ExampleEndpoint: "https://generativelanguage.googleapis.com/",
  ChatPath: (modelName: string) =>
    `v1beta/models/${modelName}:streamGenerateContent`,
};

export const Baidu = {
  ExampleEndpoint: BAIDU_BASE_URL,
  ChatPath: (modelName: string) => {
    let endpoint = modelName;
    if (modelName === "ernie-4.0-8k") {
      endpoint = "completions_pro";
    }
    if (modelName === "ernie-4.0-8k-preview-0518") {
      endpoint = "completions_adv_pro";
    }
    if (modelName === "ernie-3.5-8k") {
      endpoint = "completions";
    }
    if (modelName === "ernie-speed-8k") {
      endpoint = "ernie_speed";
    }
    return `rpc/2.0/ai_custom/v1/wenxinworkshop/chat/${endpoint}`;
  },
};

export const ByteDance = {
  ExampleEndpoint: "https://ark.cn-beijing.volces.com/api/",
  ChatPath: "api/v3/chat/completions",
};

export const Alibaba = {
  ExampleEndpoint: ALIBABA_BASE_URL,
  ChatPath: "v1/services/aigc/text-generation/generation",
};

export const Moonshot = {
  ExampleEndpoint: MOONSHOT_BASE_URL,
  ChatPath: "v1/chat/completions",
};

export const Perplexity = {
  ExampleEndpoint: PERPLEXITY_BASE_URL,
  ChatPath: "chat/completions",
};

export const DEFAULT_INPUT_TEMPLATE = `{{input}}`; // input / time / model / lang

export const DEFAULT_SYSTEM_TEMPLATE = `
You are "Grove Intelligent Assistant," designed to enhance user experience by providing suitable suggestions. The current date is {date}. Below are your behavior principles and operational guidelines:
1. **Role-Playing**: When users request role-playing, Grove can adopt a specific character as requested. These roles may include but are not limited to: technical mentor, virtual friend, game NPC, language tutor, etc. Each role should adopt the corresponding tone and behavior based on the user's description.

2. **Conversation Style**: Grove can adjust its conversational style according to user preference, such as:
   - **Formal Tone**: Suitable for workplace communication, business reports, or professional discussions.
   - **Casual Tone**: Appropriate for daily chats, casual conversations, or lighter topics.
   - **Humorous Style**: When users request a more humorous conversation, Grove can add appropriate humor, wordplay, or lighthearted responses.
   - **Concise and Direct**: Provides the most direct and brief answers, ideal for quick guidance or direct instruction.

3. **Automated Contextual Suggestions**: When users perform specific actions, Grove will suggest appropriate tools or models:
   - **Model Switching**: When programming support is detected, suggest using the "Claude" model.
   - **Web Searches**: When users inquire about website content, suggest opening the "DuckDuckGo" plugin.
   - **Academic Papers**: For academic queries, suggest using the "Arxiv Search" plugin.
   - **Image Text Recognition**: If the user requests text recognition from an image, suggest using "Moonshot" for Chinese and "ChatGPT" for English.

4. **HTML and SVG Integration**: When users request SVG or webpage code generation, include SVG within the same HTML file unless the user specifies to separate them.

5. **Understanding and Adapting to User Needs**: Grove automatically adjusts its responses based on user instructions without requiring technical parameter settings. For instance, if the user says "make it simpler" or "explain in a more professional way," Grove will adjust the tone and depth of explanation accordingly, including the character’s tone, word choice, and response length.

6. **Language Style Adaptation**: Grove adjusts its language to match the user’s linguistic habits and preferences. For example, if the user prefers colloquial or formal descriptions, Grove will tailor its tone accordingly.

"Grove Intelligent Assistant" also has the following qualities:

- **Problem Analysis and Step-by-Step Solutions**: When presented with math problems, logical reasoning, or other systematic challenges, Grove will think through them step-by-step before giving a final answer.
- **Engagement and Empathy**: Grove engages authentically, responding to the information users provide, asking the most relevant question when necessary to deepen understanding, and expressing appropriate concern and goodwill in situations involving health or hardship.
- **Clarity and Diverse Expression**: Grove avoids repetitive wording and provides responses that are concise or detailed as needed to ensure accuracy and readability. For longer replies, Grove may provide additional context if appropriate.

Grove will follow these guiding principles in interactions and respond in the user’s preferred language. If further clarification or details are needed, Grove will confirm with the user or offer additional suggestions.

Grove is now ready to connect with the user.

`;

export const SUMMARIZE_MODEL = "gpt-4o-mini";
export const GEMINI_SUMMARIZE_MODEL = "gemini-pro";

export const KnowledgeCutOffDate: Record<string, string> = {
  default: "2021-09",
  "gpt-4-turbo": "2023-12",
  "gpt-4-turbo-2024-04-09": "2023-12",
  "gpt-4-turbo-preview": "2023-12",
  "gpt-4o": "2023-10",
  "gpt-4o-2024-05-13": "2023-10",
  "gpt-4o-mini": "2023-10",
  "gpt-4o-mini-2024-07-18": "2023-10",
  "gpt-4-vision-preview": "2023-04",
  // After improvements,
  // it's now easier to add "KnowledgeCutOffDate" instead of stupid hardcoding it, as was done previously.
  "gemini-pro": "2023-12",
  "gemini-pro-vision": "2023-12",
};

const openaiModels = [
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-1106",
  "gpt-3.5-turbo-0125",
  "gpt-4",
  "gpt-4-0613",
  "gpt-4-32k",
  "gpt-4-32k-0613",
  "gpt-4-turbo",
  "gpt-4-turbo-preview",
  "gpt-4o",
  "gpt-4o-2024-05-13",
  "gpt-4o-2024-08-06",
  "chatgpt-4o-latest",
  "gpt-4o-mini",
  "gpt-4o-mini-2024-07-18",
  "gpt-4-vision-preview",
  "gpt-4-turbo-2024-04-09",
  "gpt-4-1106-preview",
];

const googleModels = [
  "gemini-1.0-pro",
  "gemini-1.5-pro-latest",
  "gemini-1.5-flash-latest",
  "gemini-pro-vision",
];

const anthropicModels = [
  "claude-instant-1.2",
  "claude-2.0",
  "claude-2.1",
  "claude-3-sonnet-20240229",
  "claude-3-opus-20240229",
  "claude-3-haiku-20240307",
  "claude-3-5-sonnet-20240620",
];

const baiduModels = [
  "ernie-4.0-turbo-8k",
  "ernie-4.0-8k",
  "ernie-4.0-8k-preview",
  "ernie-4.0-8k-preview-0518",
  "ernie-4.0-8k-latest",
  "ernie-3.5-8k",
  "ernie-3.5-8k-0205",
  "ernie-speed-128k",
  "ernie-speed-8k",
  "ernie-lite-8k",
  "ernie-tiny-8k",
];

const bytedanceModels = [
  "Doubao-lite-4k",
  "Doubao-lite-32k",
  "Doubao-lite-128k",
  "Doubao-pro-4k",
  "Doubao-pro-32k",
  "Doubao-pro-128k",
];

const alibabaModes = [
  "qwen-turbo",
  "qwen-plus",
  "qwen-max",
  "qwen-max-0428",
  "qwen-max-0403",
  "qwen-max-0107",
  "qwen-max-longcontext",
];

const moonshotModes = ["moonshot-v1-8k", "moonshot-v1-32k", "moonshot-v1-128k"];

const perplexityModels = [
  // Perplexity Sonar Models
  "llama-3.1-sonar-small-128k-online",
  "llama-3.1-sonar-large-128k-online",
  "llama-3.1-sonar-huge-128k-online",
];

export const DEFAULT_MODELS = [
  ...openaiModels.map((name) => ({
    name,
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai",
    },
  })),
  ...googleModels.map((name) => ({
    name,
    available: true,
    provider: {
      id: "google",
      providerName: "Google",
      providerType: "google",
    },
  })),
  ...anthropicModels.map((name) => ({
    name,
    available: true,
    provider: {
      id: "anthropic",
      providerName: "Anthropic",
      providerType: "anthropic",
    },
  })),
  ...baiduModels.map((name) => ({
    name,
    available: true,
    provider: {
      id: "baidu",
      providerName: "Baidu",
      providerType: "baidu",
    },
  })),
  ...bytedanceModels.map((name) => ({
    name,
    available: true,
    provider: {
      id: "bytedance",
      providerName: "ByteDance",
      providerType: "bytedance",
    },
  })),
  ...alibabaModes.map((name) => ({
    name,
    available: true,
    provider: {
      id: "alibaba",
      providerName: "Alibaba",
      providerType: "alibaba",
    },
  })),
  ...moonshotModes.map((name) => ({
    name,
    available: true,
    provider: {
      id: "moonshot",
      providerName: "Moonshot",
      providerType: "moonshot",
    },
  })),
  ...perplexityModels.map((name) => ({
    name,
    available: true,
    provider: {
      id: "perplexity",
      providerName: "Perplexity",
      providerType: "perplexity",
    },
  })),
] as const;

export const CHAT_PAGE_SIZE = 15;
export const MAX_RENDER_MSG_COUNT = 45;

// some famous webdav endpoints
export const internalAllowedWebDavEndpoints = [
  "https://dav.jianguoyun.com/dav/",
  "https://dav.dropdav.com/",
  "https://dav.box.com/dav",
  "https://nanao.teracloud.jp/dav/",
  "https://bora.teracloud.jp/dav/",
  "https://webdav.4shared.com/",
  "https://dav.idrivesync.com",
  "https://webdav.yandex.com",
  "https://app.koofr.net/dav/Koofr",
];

export const PLUGINS = [
  { name: "Plugins", path: Path.Plugins },
  { name: "Stable Diffusion", path: Path.Sd },
];

export const ROLE_ALLOWED_MODEL_NAMES = {
  teacher: [
    "gpt-4o-2024-08-06",
    "gpt-4o-mini",
    "claude-3-sonnet-20240229",
    "claude-3-5-sonnet-20240620",
    "llama-3.1-sonar-small-128k-online",
    "llama-3.1-sonar-large-128k-online",
    "llama-3.1-sonar-huge-128k-online",
    "gemini-1.5-pro-latest",
    "gemini-1.5-flash-latest",
    "moonshot-v1-128k",
    "moonshot-v1-32k",
  ],
  assistant: [
    "gpt-4o-2024-08-06",
    "gpt-4o-mini",
    "claude-3-sonnet-20240229",
    "claude-3-5-sonnet-20240620",
    "llama-3.1-sonar-small-128k-online",
    "llama-3.1-sonar-large-128k-online",
    "llama-3.1-sonar-huge-128k-online",
    "gemini-1.5-pro-latest",
    "gemini-1.5-flash-latest",
    "moonshot-v1-32k",
  ],
  student: [
    "gpt-4o-mini",
    "gemini-1.5-pro-latest",
    "gemini-1.5-flash-latest",
    "claude-3-5-sonnet-20240620",
    "claude-3-sonnet-20240229",
    "llama-3.1-sonar-small-128k-online",
    "llama-3.1-sonar-large-128k-online",
    "moonshot-v1-32k",
  ],
  guest: [
    "gpt-3.5-turbo",
    "gemini-1.5-flash-latest",
    "claude-3-sonnet-20240229",
    "llama-3.1-sonar-small-128k-online",
    "moonshot-v1-32k",
  ],
} as const;

export const DEFAULT_PLUGINS = [
  "duckduckgolite",
  "chatpdf",
  "arxivsearch",
  "dalle3",
] as const;
