import {
  ApiPath,
  DEFAULT_API_HOST,
  GoogleSafetySettingsThreshold,
  ServiceProvider,
  StoreKey,
} from "../constant";
import { getHeaders } from "../client/api";
import { getClientConfig } from "../config/client";
import { createPersistStore } from "../utils/store";
import { ensure } from "../utils/clone";
import { DEFAULT_CONFIG } from "./config";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import LogRocket from "logrocket";

let fetchState = 0; // 0 not fetch, 1 fetching, 2 done

const isApp = getClientConfig()?.buildMode === "export";

const DEFAULT_OPENAI_URL = isApp
  ? DEFAULT_API_HOST + "/api/proxy/openai"
  : ApiPath.OpenAI;

const DEFAULT_GOOGLE_URL = isApp
  ? DEFAULT_API_HOST + "/api/proxy/google"
  : ApiPath.Google;

const DEFAULT_ANTHROPIC_URL = isApp
  ? DEFAULT_API_HOST + "/api/proxy/anthropic"
  : ApiPath.Anthropic;

const DEFAULT_BAIDU_URL = isApp
  ? DEFAULT_API_HOST + "/api/proxy/baidu"
  : ApiPath.Baidu;

const DEFAULT_BYTEDANCE_URL = isApp
  ? DEFAULT_API_HOST + "/api/proxy/bytedance"
  : ApiPath.ByteDance;

const DEFAULT_ALIBABA_URL = isApp
  ? DEFAULT_API_HOST + "/api/proxy/alibaba"
  : ApiPath.Alibaba;

const DEFAULT_MOONSHOT_URL = isApp
  ? DEFAULT_API_HOST + "/api/proxy/moonshot"
  : ApiPath.Moonshot;

const DEFAULT_STABILITY_URL = isApp
  ? DEFAULT_API_HOST + "/api/proxy/stability"
  : ApiPath.Stability;

//perplexity
const DEFAULT_PERPLEXITY_URL = isApp
  ? DEFAULT_API_HOST + "/api/proxy/perplexity"
  : ApiPath.Perplexity;

const DEFAULT_ACCESS_STATE = {
  isSignedIn: false,
  userId: "",
  userEmail: "",
  userRole: "",

  accessCode: "",
  useCustomConfig: true,

  // server config
  needCode: false,
  hideUserApiKey: false,
  hideBalanceQuery: false,
  disableGPT4: false,
  disableFastLink: false,
  customModels: "",
  defaultModel: "",

  provider: ServiceProvider.OpenAI,

  // openai
  openaiUrl: DEFAULT_OPENAI_URL,
  openaiApiKey: "",

  // azure
  azureUrl: "",
  azureApiKey: "",
  azureApiVersion: "2023-08-01-preview",

  // google ai studio
  googleUrl: DEFAULT_GOOGLE_URL,
  googleApiKey: "",
  googleApiVersion: "v1",
  googleSafetySettings: GoogleSafetySettingsThreshold.BLOCK_ONLY_HIGH,

  // anthropic
  anthropicUrl: DEFAULT_ANTHROPIC_URL,
  anthropicApiKey: "",
  anthropicApiVersion: "2023-06-01",

  // baidu
  baiduUrl: DEFAULT_BAIDU_URL,
  baiduApiKey: "",
  baiduSecretKey: "",

  // bytedance
  bytedanceUrl: DEFAULT_BYTEDANCE_URL,
  bytedanceApiKey: "",

  // alibaba
  alibabaUrl: DEFAULT_ALIBABA_URL,
  alibabaApiKey: "",

  // moonshot
  moonshotUrl: DEFAULT_MOONSHOT_URL,
  moonshotApiKey: "",

  //stability
  stabilityUrl: DEFAULT_STABILITY_URL,
  stabilityApiKey: "",

  //perplexity
  perplexityUrl: DEFAULT_PERPLEXITY_URL,
  perplexityApiKey: "",
};

export const useAccessStore = createPersistStore(
  { ...DEFAULT_ACCESS_STATE, clerkUser: null },

  (set, get) => ({
    enabledAccessControl() {
      this.fetch();

      return get().needCode;
    },

    isValidOpenAI() {
      return ensure(get(), ["openaiApiKey"]);
    },

    isValidAzure() {
      return ensure(get(), ["azureUrl", "azureApiKey", "azureApiVersion"]);
    },

    isValidGoogle() {
      return ensure(get(), ["googleApiKey"]);
    },

    isValidAnthropic() {
      return ensure(get(), ["anthropicApiKey"]);
    },

    isValidBaidu() {
      return ensure(get(), ["baiduApiKey", "baiduSecretKey"]);
    },

    isValidByteDance() {
      return ensure(get(), ["bytedanceApiKey"]);
    },

    isValidAlibaba() {
      return ensure(get(), ["alibabaApiKey"]);
    },

    isValidMoonshot() {
      return ensure(get(), ["moonshotApiKey"]);
    },

    isValidPerplexity() {
      return ensure(get(), ["perplexityApiKey"]);
    },

    setClerkUser: (userInfo: {
      isSignedIn: boolean;
      userId: string;
      userEmail: string;
      userRole: string;
    }) => {
      set(userInfo);
    },

    isAuthorized() {
      this.fetch();

      // has token or has code or disabled access control
      return (
        get().isSignedIn ||
        this.isValidOpenAI() ||
        this.isValidAzure() ||
        this.isValidGoogle() ||
        this.isValidAnthropic() ||
        this.isValidBaidu() ||
        this.isValidByteDance() ||
        this.isValidAlibaba() ||
        this.isValidMoonshot() ||
        this.isValidPerplexity() ||
        !this.enabledAccessControl() ||
        (this.enabledAccessControl() && ensure(get(), ["accessCode"]))
      );
    },
    fetch() {
      if (fetchState > 0 || getClientConfig()?.buildMode === "export") return;
      fetchState = 1;
      fetch("/api/config", {
        method: "post",
        body: null,
        headers: {
          ...getHeaders(),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          // Set default model from env request
          let defaultModel = res.defaultModel ?? "";
          DEFAULT_CONFIG.modelConfig.model =
            defaultModel !== "" ? defaultModel : "gpt-3.5-turbo";
          return res;
        })
        .then((res: DangerConfig) => {
          console.log("[Config] got config from server", res);
          set(() => ({ ...res }));
        })
        .catch(() => {
          console.error("[Config] failed to fetch config");
        })
        .finally(() => {
          fetchState = 2;
        });
    },
  }),
  {
    name: StoreKey.Access,
    version: 3,
    migrate(persistedState, version) {
      if (version < 2) {
        const state = persistedState as {
          token: string;
          openaiApiKey: string;
          azureApiVersion: string;
          googleApiKey: string;
        };
        state.openaiApiKey = state.token;
        state.azureApiVersion = "2023-08-01-preview";
      }
      if (version < 3) {
        (persistedState as any).isSignedIn = false;
        (persistedState as any).userId = "";
        (persistedState as any).userEmail = "";
        (persistedState as any).userRole = "guest";
      }
      return persistedState as any;
    },
  },
);

export function useUpdateClerkUser() {
  const { user, isLoaded, isSignedIn } = useUser();
  const setClerkUser = useAccessStore((state) => state.setClerkUser);

  useEffect(() => {
    if (isLoaded) {
      setClerkUser({
        isSignedIn: isSignedIn || false,
        userId: user?.id || "",
        userEmail: user?.primaryEmailAddress?.emailAddress || "",
        userRole: (user?.publicMetadata.role as string) || "guest",
      });

      if (isSignedIn && user?.id) {
        LogRocket.identify(user?.id, {
          email: user?.primaryEmailAddress?.emailAddress || "",
        });
      }
      // console.log(
      //   "useUpdateClerkUser",
      //   isLoaded,
      //   isSignedIn,
      //   user?.id,
      //   user?.primaryEmailAddress?.emailAddress,
      //   user?.publicMetadata.role,
      // );
    }
  }, [isLoaded, isSignedIn, user, setClerkUser]);
}
