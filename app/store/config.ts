// config
import { LLMModel } from "../client/api";
import { getClientConfig } from "../config/client";
import {
  DEFAULT_INPUT_TEMPLATE,
  DEFAULT_MODELS,
  DEFAULT_SIDEBAR_WIDTH,
  StoreKey,
  ServiceProvider,
  CUSTOMTITLE,
  CUSTOMSUBTITLE,
} from "../constant";
import { createPersistStore } from "../utils/store";

export type ModelType = (typeof DEFAULT_MODELS)[number]["name"];

export enum SubmitKey {
  Enter = "Enter",
  CtrlEnter = "Ctrl + Enter",
  ShiftEnter = "Shift + Enter",
  AltEnter = "Alt + Enter",
  MetaEnter = "Meta + Enter",
}

export enum Theme {
  Auto = "auto",
  Dark = "dark",
  Light = "light",
}

//add theme color
export enum ThemeColor {
  Yellow = "yellow",
  Purple = "purple",
  Brown = "brown",
  Green = "green",
}

export enum Background {
  dot = "dot",
  stripe = "stripe",
  mountain = "mountain",
  pinwheel = "pinwheel",
  rain = "rain",
}
const config = getClientConfig();

export enum SuggestConfig {
  RealTime = "RealTime",
  Creative = "Creative",
  Programming = "Programming",
}

export const CustomConfig = {
  [SuggestConfig.RealTime]: {
    name: "RealTime",
    model: "llama-3.1-sonar-small-128k-online",
    providerName: "Perplexity" as ServiceProvider,
    temperature: 0.5,
    top_p: 1,
    presence_penalty: 0.5,
    frequency_penalty: 1,
  },
  [SuggestConfig.Creative]: {
    name: "Creative",
    model: "gpt-4o",
    providerName: "OpenAI" as ServiceProvider,
    temperature: 0.8,
    top_p: 0.9,
    max_tokens: 3000,
    presence_penalty: 0,
    frequency_penalty: 0.3,
  },
  [SuggestConfig.Programming]: {
    name: "Programming",
    model: "claude-3-5-sonnet-20240620",
    providerName: "Anthropic" as ServiceProvider,
    temperature: 0.3,
    top_p: 0.5,
    max_tokens: 3000,
    presence_penalty: 0.1,
    frequency_penalty: 0.6,
  },
};

export const DEFAULT_CONFIG = {
  lastUpdate: Date.now(), // timestamp, to merge state
  customTitle: CUSTOMTITLE, //add custom title
  customSubtitle: CUSTOMSUBTITLE, //add custom subtitle
  submitKey: SubmitKey.Enter,
  avatar: "1f9d0",
  fontSize: 14,
  theme: Theme.Light as Theme,
  themeColor: ThemeColor.Green,
  background: Background.mountain,
  tightBorder: !!config?.isApp,
  sendPreviewBubble: true,
  enableAutoGenerateTitle: true,
  sidebarWidth: DEFAULT_SIDEBAR_WIDTH,

  disablePromptHint: false,

  dontShowMaskSplashScreen: false, // dont show splash screen when create chat
  hideBuiltinMasks: false, // dont add builtin masks

  enableArtifacts: true, // show artifacts config

  customModels: "",
  models: DEFAULT_MODELS as any as LLMModel[],

  //suggestConfig: SuggestConfig.RealTime as SuggestConfig|| null,

  modelConfig: {
    name: "Creactive",
    model: "gpt-4o-mini" as ModelType,
    providerName: "OpenAI" as ServiceProvider,
    temperature: 0.5,
    top_p: 1,
    max_tokens: 2000,
    presence_penalty: 0,
    frequency_penalty: 0,
    sendMemory: true,
    historyMessageCount: 4,
    compressMessageLengthThreshold: 1000,
    enableInjectSystemPrompts: true,
    template: config?.template ?? DEFAULT_INPUT_TEMPLATE,
  },
};

export type ChatConfig = typeof DEFAULT_CONFIG;

export type ModelConfig = ChatConfig["modelConfig"];

export function limitNumber(
  x: number,
  min: number,
  max: number,
  defaultValue: number,
) {
  if (isNaN(x)) {
    return defaultValue;
  }

  return Math.min(max, Math.max(min, x));
}

export const ModalConfigValidator = {
  model(x: string) {
    return x as ModelType;
  },
  max_tokens(x: number) {
    return limitNumber(x, 0, 512000, 1024);
  },
  presence_penalty(x: number) {
    return limitNumber(x, -2, 2, 0);
  },
  frequency_penalty(x: number) {
    return limitNumber(x, -2, 2, 0);
  },
  temperature(x: number) {
    return limitNumber(x, 0, 2, 1);
  },
  top_p(x: number) {
    return limitNumber(x, 0, 1, 1);
  },
};

export const useAppConfig = createPersistStore(
  { ...DEFAULT_CONFIG },
  (set, get) => ({
    reset() {
      set(() => ({ ...DEFAULT_CONFIG }));
    },

    mergeModels(newModels: LLMModel[]) {
      if (!newModels || newModels.length === 0) {
        return;
      }

      const oldModels = get().models;
      const modelMap: Record<string, LLMModel> = {};

      for (const model of oldModels) {
        model.available = false;
        modelMap[`${model.name}@${model?.provider?.id}`] = model;
      }

      for (const model of newModels) {
        model.available = true;
        modelMap[`${model.name}@${model?.provider?.id}`] = model;
      }

      set(() => ({
        models: Object.values(modelMap),
      }));
    },

    allModels() {},
  }),
  {
    name: StoreKey.Config,
    version: 3.9,
    migrate(persistedState, version) {
      const state = persistedState as ChatConfig;

      if (version < 3.4) {
        state.modelConfig.sendMemory = true;
        state.modelConfig.historyMessageCount = 4;
        state.modelConfig.compressMessageLengthThreshold = 1000;
        state.modelConfig.frequency_penalty = 0;
        state.modelConfig.top_p = 1;
        state.modelConfig.template = DEFAULT_INPUT_TEMPLATE;
        state.dontShowMaskSplashScreen = false;
        state.hideBuiltinMasks = false;
      }

      if (version < 3.5) {
        state.customModels = "claude,claude-100k";
      }

      if (version < 3.6) {
        state.modelConfig.enableInjectSystemPrompts = true;
      }

      if (version < 3.7) {
        state.enableAutoGenerateTitle = true;
      }

      if (version < 3.8) {
        state.lastUpdate = Date.now();
      }

      if (version < 3.9) {
        state.modelConfig.template =
          state.modelConfig.template !== DEFAULT_INPUT_TEMPLATE
            ? state.modelConfig.template
            : config?.template ?? DEFAULT_INPUT_TEMPLATE;
      }

      return state as any;
    },
  },
);
