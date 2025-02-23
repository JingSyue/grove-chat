// settings.tsx
import React, { useState, useEffect, useMemo } from "react";
import styles from "./settings.module.scss";

import DownIcon from "../icons/down.svg";
import UpIcon from "../icons/up.svg";
import ResetIcon from "../icons/reload.svg";
import AddIcon from "../icons/add.svg";
import CloseIcon from "../icons/close.svg";
import CopyIcon from "../icons/copy.svg";
import ClearIcon from "../icons/clear.svg";
import LoadingIcon from "../icons/three-dots.svg";
import EditIcon from "../icons/edit.svg";
import FireIcon from "../icons/fire.svg";
import EyeIcon from "../icons/eye.svg";
import DownloadIcon from "../icons/download.svg";
import UploadIcon from "../icons/upload.svg";
import ConfigIcon from "../icons/config.svg";
import ConfirmIcon from "../icons/confirm.svg";
import GeneralIcon from "../icons/general.svg";
import PasswordIcon from "../icons/password.svg";
import ModelIcon from "../icons/model.svg";
import DataIcon from "../icons/data.svg";
import ProxyIcon from "../icons/proxy.svg";
import PromptIcon from "../icons/prompt.svg";
import MaskIcon from "../icons/mask.svg";
import HeadphoneIcon from "../icons/headphone.svg";

import ConnectionIcon from "../icons/connection.svg";
import CloudSuccessIcon from "../icons/cloud-success.svg";
import CloudFailIcon from "../icons/cloud-fail.svg";
import { trackSettingsPageGuideToCPaymentClick } from "../utils/auth-settings-events";
import {
  Input,
  List,
  ListItem,
  Modal,
  PasswordInput,
  Popover,
  Select,
  showConfirm,
  showToast,
} from "./ui-lib";
import { ModelConfigList } from "./model-config";

import { IconButton } from "./button";
import {
  SubmitKey,
  useChatStore,
  Theme,
  useUpdateStore,
  useAccessStore,
  useAppConfig,
  ThemeColor,
  Background,
} from "../store";

import Locale, {
  AllLangs,
  ALL_LANG_OPTIONS,
  changeLang,
  getLang,
} from "../locales";
import { copyToClipboard, clientUpdate, semverCompare } from "../utils";
import Link from "next/link";
import {
  Anthropic,
  Azure,
  Baidu,
  Tencent,
  ByteDance,
  Alibaba,
  Moonshot,
  XAI,
  Google,
  GoogleSafetySettingsThreshold,
  OPENAI_BASE_URL,
  Path,
  RELEASE_URL,
  STORAGE_KEY,
  ServiceProvider,
  SlotID,
  UPDATE_URL,
  Stability,
  Perplexity,
  Iflytek,
  SAAS_CHAT_URL,
  ChatGLM,
  ROLE_ALLOWED_MODEL_NAMES,
} from "../constant";
import { Prompt, SearchService, usePromptStore } from "../store/prompt";
import { ErrorBoundary } from "./error";
import { InputRange } from "./input-range";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarPicker } from "./emoji";
import { getClientConfig } from "../config/client";
import { useSyncStore } from "../store/sync";
import { nanoid } from "nanoid";
import { useMaskStore } from "../store/mask";
import { ProviderType } from "../utils/cloud";
import { useUser, OrganizationSwitcher } from "@clerk/clerk-react";
import { getHighestUserRole } from "./chat";
import { TTSConfigList } from "./tts-config";
import { RealtimeConfigList } from "./realtime-chat/realtime-config";

function EditPromptModal(props: { id: string; onClose: () => void }) {
  const promptStore = usePromptStore();
  const prompt = promptStore.get(props.id);

  return prompt ? (
    <div className="modal-mask">
      <Modal
        title={Locale.Settings.Prompt.EditModal.Title}
        onClose={props.onClose}
        actions={[
          <IconButton
            key=""
            onClick={props.onClose}
            text={Locale.UI.Confirm}
            bordered
          />,
        ]}
      >
        <div className={styles["edit-prompt-modal"]}>
          <input
            type="text"
            value={prompt.title}
            readOnly={!prompt.isUser}
            className={styles["edit-prompt-title"]}
            onInput={(e) =>
              promptStore.updatePrompt(
                props.id,
                (prompt) => (prompt.title = e.currentTarget.value),
              )
            }
          ></input>
          <Input
            value={prompt.content}
            readOnly={!prompt.isUser}
            className={styles["edit-prompt-content"]}
            rows={10}
            onInput={(e) =>
              promptStore.updatePrompt(
                props.id,
                (prompt) => (prompt.content = e.currentTarget.value),
              )
            }
          ></Input>
        </div>
      </Modal>
    </div>
  ) : null;
}

function UserPromptModal(props: { onClose?: () => void }) {
  const promptStore = usePromptStore();
  const userPrompts = promptStore.getUserPrompts();
  const builtinPrompts = SearchService.builtinPrompts;
  const allPrompts = userPrompts.concat(builtinPrompts);
  const [searchInput, setSearchInput] = useState("");
  const [searchPrompts, setSearchPrompts] = useState<Prompt[]>([]);
  const prompts = searchInput.length > 0 ? searchPrompts : allPrompts;

  const [editingPromptId, setEditingPromptId] = useState<string>();

  useEffect(() => {
    if (searchInput.length > 0) {
      const searchResult = SearchService.search(searchInput);
      setSearchPrompts(searchResult);
    } else {
      setSearchPrompts([]);
    }
  }, [searchInput]);

  return (
    <div className="modal-mask">
      <Modal
        title={Locale.Settings.Prompt.Modal.Title}
        onClose={() => props.onClose?.()}
        actions={[
          <IconButton
            key="add"
            onClick={() => {
              const promptId = promptStore.add({
                id: nanoid(),
                createdAt: Date.now(),
                title: "Empty Prompt",
                content: "Empty Prompt Content",
              });
              setEditingPromptId(promptId);
            }}
            icon={<AddIcon />}
            bordered
            text={Locale.Settings.Prompt.Modal.Add}
          />,
        ]}
      >
        <div className={styles["user-prompt-modal"]}>
          <input
            type="text"
            className={styles["user-prompt-search"]}
            placeholder={Locale.Settings.Prompt.Modal.Search}
            value={searchInput}
            onInput={(e) => setSearchInput(e.currentTarget.value)}
          ></input>

          <div className={styles["user-prompt-list"]}>
            {prompts.map((v, _) => (
              <div className={styles["user-prompt-item"]} key={v.id ?? v.title}>
                <div className={styles["user-prompt-header"]}>
                  <div className={styles["user-prompt-title"]}>{v.title}</div>
                  <div className={styles["user-prompt-content"] + " one-line"}>
                    {v.content}
                  </div>
                </div>

                <div className={styles["user-prompt-buttons"]}>
                  {v.isUser && (
                    <IconButton
                      icon={<ClearIcon />}
                      className={styles["user-prompt-button"]}
                      onClick={() => promptStore.remove(v.id!)}
                    />
                  )}
                  {v.isUser ? (
                    <IconButton
                      icon={<EditIcon />}
                      className={styles["user-prompt-button"]}
                      onClick={() => setEditingPromptId(v.id)}
                    />
                  ) : (
                    <IconButton
                      icon={<EyeIcon />}
                      className={styles["user-prompt-button"]}
                      onClick={() => setEditingPromptId(v.id)}
                    />
                  )}
                  <IconButton
                    icon={<CopyIcon />}
                    className={styles["user-prompt-button"]}
                    onClick={() => copyToClipboard(v.content)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {editingPromptId !== undefined && (
        <EditPromptModal
          id={editingPromptId!}
          onClose={() => setEditingPromptId(undefined)}
        />
      )}
    </div>
  );
}

function DangerItems() {
  const chatStore = useChatStore();
  const appConfig = useAppConfig();

  return (
    <List>
      <ListItem
        title={Locale.Settings.Danger.Reset.Title}
        subTitle={Locale.Settings.Danger.Reset.SubTitle}
      >
        <IconButton
          aria={Locale.Settings.Danger.Reset.Title}
          text={Locale.Settings.Danger.Reset.Action}
          onClick={async () => {
            if (await showConfirm(Locale.Settings.Danger.Reset.Confirm)) {
              appConfig.reset();
            }
          }}
          type="danger"
        />
      </ListItem>
      <ListItem
        title={Locale.Settings.Danger.Clear.Title}
        subTitle={Locale.Settings.Danger.Clear.SubTitle}
      >
        <IconButton
          aria={Locale.Settings.Danger.Clear.Title}
          text={Locale.Settings.Danger.Clear.Action}
          onClick={async () => {
            if (await showConfirm(Locale.Settings.Danger.Clear.Confirm)) {
              chatStore.clearAllData();
            }
          }}
          type="danger"
        />
      </ListItem>
    </List>
  );
}

function CheckButton() {
  const syncStore = useSyncStore();

  const couldCheck = useMemo(() => {
    return syncStore.cloudSync();
  }, [syncStore]);

  const [checkState, setCheckState] = useState<
    "none" | "checking" | "success" | "failed"
  >("none");

  async function check() {
    setCheckState("checking");
    const valid = await syncStore.check();
    setCheckState(valid ? "success" : "failed");
  }

  if (!couldCheck) return null;

  return (
    <IconButton
      text={Locale.Settings.Sync.Config.Modal.Check}
      bordered
      onClick={check}
      icon={
        checkState === "none" ? (
          <ConnectionIcon />
        ) : checkState === "checking" ? (
          <LoadingIcon />
        ) : checkState === "success" ? (
          <CloudSuccessIcon />
        ) : checkState === "failed" ? (
          <CloudFailIcon />
        ) : (
          <ConnectionIcon />
        )
      }
    ></IconButton>
  );
}

function SyncConfigModal(props: { onClose?: () => void }) {
  const syncStore = useSyncStore();

  return (
    <div className="modal-mask">
      <Modal
        title={Locale.Settings.Sync.Config.Modal.Title}
        onClose={() => props.onClose?.()}
        actions={[
          <CheckButton key="check" />,
          <IconButton
            key="confirm"
            onClick={props.onClose}
            icon={<ConfirmIcon />}
            bordered
            text={Locale.UI.Confirm}
          />,
        ]}
      >
        <List>
          <ListItem
            title={Locale.Settings.Sync.Config.SyncType.Title}
            subTitle={Locale.Settings.Sync.Config.SyncType.SubTitle}
          >
            <select
              value={syncStore.provider}
              onChange={(e) => {
                syncStore.update(
                  (config) =>
                    (config.provider = e.target.value as ProviderType),
                );
              }}
            >
              {Object.entries(ProviderType).map(([k, v]) => (
                <option value={v} key={k}>
                  {k}
                </option>
              ))}
            </select>
          </ListItem>

          <ListItem
            title={Locale.Settings.Sync.Config.Proxy.Title}
            subTitle={Locale.Settings.Sync.Config.Proxy.SubTitle}
          >
            <input
              type="checkbox"
              checked={syncStore.useProxy}
              onChange={(e) => {
                syncStore.update(
                  (config) => (config.useProxy = e.currentTarget.checked),
                );
              }}
            ></input>
          </ListItem>
          {syncStore.useProxy ? (
            <ListItem
              title={Locale.Settings.Sync.Config.ProxyUrl.Title}
              subTitle={Locale.Settings.Sync.Config.ProxyUrl.SubTitle}
            >
              <input
                type="text"
                value={syncStore.proxyUrl}
                onChange={(e) => {
                  syncStore.update(
                    (config) => (config.proxyUrl = e.currentTarget.value),
                  );
                }}
              ></input>
            </ListItem>
          ) : null}
        </List>

        {syncStore.provider === ProviderType.WebDAV && (
          <>
            <List>
              <ListItem title={Locale.Settings.Sync.Config.WebDav.Endpoint}>
                <input
                  type="text"
                  value={syncStore.webdav.endpoint}
                  onChange={(e) => {
                    syncStore.update(
                      (config) =>
                        (config.webdav.endpoint = e.currentTarget.value),
                    );
                  }}
                ></input>
              </ListItem>

              <ListItem title={Locale.Settings.Sync.Config.WebDav.UserName}>
                <input
                  type="text"
                  value={syncStore.webdav.username}
                  onChange={(e) => {
                    syncStore.update(
                      (config) =>
                        (config.webdav.username = e.currentTarget.value),
                    );
                  }}
                ></input>
              </ListItem>
              <ListItem title={Locale.Settings.Sync.Config.WebDav.Password}>
                <PasswordInput
                  value={syncStore.webdav.password}
                  onChange={(e) => {
                    syncStore.update(
                      (config) =>
                        (config.webdav.password = e.currentTarget.value),
                    );
                  }}
                ></PasswordInput>
              </ListItem>
            </List>
          </>
        )}

        {syncStore.provider === ProviderType.UpStash && (
          <List>
            <ListItem title={Locale.Settings.Sync.Config.UpStash.Endpoint}>
              <input
                type="text"
                value={syncStore.upstash.endpoint}
                onChange={(e) => {
                  syncStore.update(
                    (config) =>
                      (config.upstash.endpoint = e.currentTarget.value),
                  );
                }}
              ></input>
            </ListItem>

            <ListItem title={Locale.Settings.Sync.Config.UpStash.UserName}>
              <input
                type="text"
                value={syncStore.upstash.username}
                placeholder={STORAGE_KEY}
                onChange={(e) => {
                  syncStore.update(
                    (config) =>
                      (config.upstash.username = e.currentTarget.value),
                  );
                }}
              ></input>
            </ListItem>
            <ListItem title={Locale.Settings.Sync.Config.UpStash.Password}>
              <PasswordInput
                value={syncStore.upstash.apiKey}
                onChange={(e) => {
                  syncStore.update(
                    (config) => (config.upstash.apiKey = e.currentTarget.value),
                  );
                }}
              ></PasswordInput>
            </ListItem>
          </List>
        )}
      </Modal>
    </div>
  );
}

function GeneralSettings() {
  const navigate = useNavigate();
  const config = useAppConfig();
  const updateConfig = config.update;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [customTitle, setCustomTitle] = useState(config.customTitle);
  const [customSubtitle, setCustomSubtitle] = useState(config.customSubtitle);
  const accessStore = useAccessStore();

  useEffect(() => {
    const keydownEvent = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate(Path.Home);
      }
    };
    if (clientConfig?.isApp) {
      // Force to set custom endpoint to true if it's app
      accessStore.update((state) => {
        state.useCustomConfig = true;
      });
    }
    document.addEventListener("keydown", keydownEvent);
    return () => {
      document.removeEventListener("keydown", keydownEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clientConfig = useMemo(() => getClientConfig(), []);

  return (
    <List>
      <List>
        <ListItem title={Locale.Settings.Avatar}>
          <Popover
            onClose={() => setShowEmojiPicker(false)}
            content={
              <AvatarPicker
                onEmojiClick={(avatar: string) => {
                  updateConfig((config) => (config.avatar = avatar));
                  setShowEmojiPicker(false);
                }}
                onImageUpload={(imageUrl: string) => {
                  updateConfig((config) => (config.avatar = imageUrl));
                  setShowEmojiPicker(false);
                }}
              />
            }
            open={showEmojiPicker}
          >
            <div
              className={styles.avatar}
              onClick={() => {
                setShowEmojiPicker(!showEmojiPicker);
              }}
            >
              <Avatar avatar={config.avatar} />
            </div>
          </Popover>
        </ListItem>

        <ListItem title={Locale.Settings.Lang.Name}>
          <Select
            aria-label={Locale.Settings.Lang.Name}
            value={getLang()}
            onChange={(e) => {
              changeLang(e.target.value as any);
            }}
          >
            {AllLangs.map((lang) => (
              <option value={lang} key={lang}>
                {ALL_LANG_OPTIONS[lang]}
              </option>
            ))}
          </Select>
        </ListItem>

        <ListItem title={Locale.Settings.NeatUI}>
          <input
            aria-label={Locale.Settings.NeatUI}
            type="checkbox"
            checked={config.neatUI}
            onChange={(e) =>
              updateConfig(
                (config) => (config.neatUI = e.currentTarget.checked),
              )
            }
          ></input>
        </ListItem>

        <ListItem
          title={Locale.Settings.CustomTitle.Title}
          subTitle={Locale.Settings.CustomTitle.SubTitle}
        >
          <input
            type="text"
            value={customTitle}
            onChange={(e) => {
              setCustomTitle(e.target.value);
              updateConfig((config) => (config.customTitle = e.target.value));
            }}
          />
        </ListItem>

        <ListItem
          title={Locale.Settings.CustomSubtitle.Title}
          subTitle={Locale.Settings.CustomSubtitle.SubTitle}
        >
          <input
            type="text"
            value={customSubtitle}
            onChange={(e) => {
              setCustomSubtitle(e.target.value);
              updateConfig(
                (config) => (config.customSubtitle = e.target.value),
              );
            }}
          />
        </ListItem>

        <ListItem
          title={Locale.Settings.FontSize.Title}
          subTitle={Locale.Settings.FontSize.SubTitle}
        >
          <InputRange
            aria={Locale.Settings.FontSize.Title}
            title={`${config.fontSize ?? 14}px`}
            value={config.fontSize}
            min="12"
            max="40"
            step="1"
            onChange={(e) =>
              updateConfig(
                (config) =>
                  (config.fontSize = Number.parseInt(e.currentTarget.value)),
              )
            }
          ></InputRange>
        </ListItem>

        <ListItem
          title={Locale.Settings.FontFamily.Title}
          subTitle={Locale.Settings.FontFamily.SubTitle}
        >
          <input
            aria-label={Locale.Settings.FontFamily.Title}
            type="text"
            value={config.fontFamily}
            placeholder={Locale.Settings.FontFamily.Placeholder}
            onChange={(e) =>
              updateConfig(
                (config) => (config.fontFamily = e.currentTarget.value),
              )
            }
          ></input>
        </ListItem>

        <ListItem title={Locale.Settings.Theme}>
          <Select
            aria-label={Locale.Settings.Theme}
            value={config.theme}
            onChange={(e) => {
              updateConfig(
                (config) => (config.theme = e.target.value as any as Theme),
              );
            }}
          >
            {Object.values(Theme).map((v) => (
              <option value={v} key={v}>
                {v}
              </option>
            ))}
          </Select>
        </ListItem>

        <ListItem title={Locale.Settings.ThemeColor}>
          <Select
            value={config.themeColor}
            onChange={(e) => {
              updateConfig(
                (config) =>
                  (config.themeColor = e.target.value as any as ThemeColor),
              );
            }}
          >
            {Object.values(ThemeColor).map((v) => (
              <option value={v} key={v}>
                {Locale.Chat.InputActions.ThemeColor[v] || v}
              </option>
            ))}
          </Select>
        </ListItem>

        <ListItem
          className={styles.mobile}
          title={Locale.Settings.Background.Title}
        >
          <Select
            value={config.background}
            onChange={(e) => {
              updateConfig(
                (config) =>
                  (config.background = e.target.value as any as Background),
              );
            }}
          >
            {Object.values(Background).map((v) => (
              <option value={v} key={v}>
                {Locale.Chat.InputActions.Background[v] || v}
              </option>
            ))}
          </Select>
        </ListItem>
      </List>

      <List>
        <ListItem title={Locale.Settings.SendKey}>
          <Select
            aria-label={Locale.Settings.SendKey}
            value={config.submitKey}
            onChange={(e) => {
              updateConfig(
                (config) =>
                  (config.submitKey = e.target.value as any as SubmitKey),
              );
            }}
          >
            {Object.values(SubmitKey).map((v) => (
              <option value={v} key={v}>
                {v}
              </option>
            ))}
          </Select>
        </ListItem>

        <ListItem
          title={Locale.Settings.AutoGenerateTitle.Title}
          subTitle={Locale.Settings.AutoGenerateTitle.SubTitle}
        >
          <input
            aria-label={Locale.Settings.AutoGenerateTitle.Title}
            type="checkbox"
            checked={config.enableAutoGenerateTitle}
            onChange={(e) =>
              updateConfig(
                (config) =>
                  (config.enableAutoGenerateTitle = e.currentTarget.checked),
              )
            }
          ></input>
        </ListItem>

        <ListItem
          title={Locale.Settings.SendPreviewBubble.Title}
          subTitle={Locale.Settings.SendPreviewBubble.SubTitle}
        >
          <input
            aria-label={Locale.Settings.SendPreviewBubble.Title}
            type="checkbox"
            checked={config.sendPreviewBubble}
            onChange={(e) =>
              updateConfig(
                (config) =>
                  (config.sendPreviewBubble = e.currentTarget.checked),
              )
            }
          ></input>
        </ListItem>
      </List>
    </List>
  );
}

export function PasswordSettings() {
  const navigate = useNavigate();
  const updateStore = useUpdateStore();
  const [checkingUpdate, setCheckingUpdate] = useState(false);
  const currentVersion = updateStore.formatVersion(updateStore.version);
  const remoteId = updateStore.formatVersion(updateStore.remoteVersion);
  const hasNewVersion = semverCompare(currentVersion, remoteId) === -1;

  function checkUpdate(force = false) {
    setCheckingUpdate(true);
    updateStore.getLatestVersion(force).then(() => {
      setCheckingUpdate(false);
    });

    console.log("[Update] local version ", updateStore.version);
    console.log("[Update] remote version ", updateStore.remoteVersion);
  }

  const accessStore = useAccessStore();
  const usage = {
    used: updateStore.used,
    subscription: updateStore.subscription,
  };
  const [loadingUsage, setLoadingUsage] = useState(false);
  function checkUsage(force = false) {
    if (shouldHideBalanceQuery) {
      return;
    }

    setLoadingUsage(true);
    updateStore.updateUsage(force).finally(() => {
      setLoadingUsage(false);
    });
  }

  const enabledAccessControl = useMemo(
    () => accessStore.enabledAccessControl(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const showUsage = accessStore.isAuthorized();
  useEffect(() => {
    // checks per minutes
    checkUpdate();
    showUsage && checkUsage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const keydownEvent = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate(Path.Home);
      }
    };
    if (clientConfig?.isApp) {
      // Force to set custom endpoint to true if it's app
      accessStore.update((state) => {
        state.useCustomConfig = true;
      });
    }
    document.addEventListener("keydown", keydownEvent);
    return () => {
      document.removeEventListener("keydown", keydownEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clientConfig = useMemo(() => getClientConfig(), []);
  const showAccessCode = enabledAccessControl && !clientConfig?.isApp;

  const shouldHideBalanceQuery = useMemo(() => {
    const isOpenAiUrl = accessStore.openaiUrl.includes(OPENAI_BASE_URL);

    return (
      accessStore.hideBalanceQuery ||
      isOpenAiUrl ||
      accessStore.provider === ServiceProvider.Azure
    );
  }, [
    accessStore.hideBalanceQuery,
    accessStore.openaiUrl,
    accessStore.provider,
  ]);

  const accessCodeComponent = showAccessCode && (
    <ListItem
      title={Locale.Settings.Access.AccessCode.Title}
      subTitle={Locale.Settings.Access.AccessCode.SubTitle}
    >
      <PasswordInput
        value={accessStore.accessCode}
        type="text"
        placeholder={Locale.Settings.Access.AccessCode.Placeholder}
        onChange={(e) => {
          accessStore.update(
            (access) => (access.accessCode = e.currentTarget.value),
          );
        }}
      />
    </ListItem>
  );

  const openAIConfigComponent = accessStore.provider ===
    ServiceProvider.OpenAI && (
    <>
      <ListItem
        title={Locale.Settings.Access.OpenAI.ApiKey.Title}
        subTitle={Locale.Settings.Access.OpenAI.ApiKey.SubTitle}
      >
        <PasswordInput
          value={accessStore.openaiApiKey}
          type="text"
          placeholder={Locale.Settings.Access.OpenAI.ApiKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.openaiApiKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
    </>
  );

  const azureConfigComponent = accessStore.provider ===
    ServiceProvider.Azure && (
    <>
      <ListItem
        title={Locale.Settings.Access.Azure.ApiKey.Title}
        subTitle={Locale.Settings.Access.Azure.ApiKey.SubTitle}
      >
        <PasswordInput
          value={accessStore.azureApiKey}
          type="text"
          placeholder={Locale.Settings.Access.Azure.ApiKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.azureApiKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.Azure.ApiVerion.Title}
        subTitle={Locale.Settings.Access.Azure.ApiVerion.SubTitle}
      >
        <input
          type="text"
          value={accessStore.azureApiVersion}
          placeholder="2023-08-01-preview"
          onChange={(e) =>
            accessStore.update(
              (access) => (access.azureApiVersion = e.currentTarget.value),
            )
          }
        ></input>
      </ListItem>
    </>
  );

  const googleConfigComponent = accessStore.provider ===
    ServiceProvider.Google && (
    <>
      <ListItem
        title={Locale.Settings.Access.Google.ApiKey.Title}
        subTitle={Locale.Settings.Access.Google.ApiKey.SubTitle}
      >
        <PasswordInput
          value={accessStore.googleApiKey}
          type="text"
          placeholder={Locale.Settings.Access.Google.ApiKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.googleApiKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
    </>
  );

  const anthropicConfigComponent = accessStore.provider ===
    ServiceProvider.Anthropic && (
    <>
      <ListItem
        title={Locale.Settings.Access.Anthropic.ApiKey.Title}
        subTitle={Locale.Settings.Access.Anthropic.ApiKey.SubTitle}
      >
        <PasswordInput
          value={accessStore.anthropicApiKey}
          type="text"
          placeholder={Locale.Settings.Access.Anthropic.ApiKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.anthropicApiKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
    </>
  );

  const baiduConfigComponent = accessStore.provider ===
    ServiceProvider.Baidu && (
    <>
      <ListItem
        title={Locale.Settings.Access.Baidu.ApiKey.Title}
        subTitle={Locale.Settings.Access.Baidu.ApiKey.SubTitle}
      >
        <PasswordInput
          value={accessStore.baiduApiKey}
          type="text"
          placeholder={Locale.Settings.Access.Baidu.ApiKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.baiduApiKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.Baidu.SecretKey.Title}
        subTitle={Locale.Settings.Access.Baidu.SecretKey.SubTitle}
      >
        <PasswordInput
          value={accessStore.baiduSecretKey}
          type="text"
          placeholder={Locale.Settings.Access.Baidu.SecretKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.baiduSecretKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
    </>
  );

  const byteDanceConfigComponent = accessStore.provider ===
    ServiceProvider.ByteDance && (
    <>
      <ListItem
        title={Locale.Settings.Access.ByteDance.ApiKey.Title}
        subTitle={Locale.Settings.Access.ByteDance.ApiKey.SubTitle}
      >
        <PasswordInput
          value={accessStore.bytedanceApiKey}
          type="text"
          placeholder={Locale.Settings.Access.ByteDance.ApiKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.bytedanceApiKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
    </>
  );

  const alibabaConfigComponent = accessStore.provider ===
    ServiceProvider.Alibaba && (
    <>
      <ListItem
        title={Locale.Settings.Access.Alibaba.ApiKey.Title}
        subTitle={Locale.Settings.Access.Alibaba.ApiKey.SubTitle}
      >
        <PasswordInput
          value={accessStore.alibabaApiKey}
          type="text"
          placeholder={Locale.Settings.Access.Alibaba.ApiKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.alibabaApiKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
    </>
  );

  const tencentConfigComponent = accessStore.provider ===
    ServiceProvider.Tencent && (
    <>
      <ListItem
        title={Locale.Settings.Access.Tencent.Endpoint.Title}
        subTitle={Locale.Settings.Access.Tencent.Endpoint.SubTitle}
      >
        <input
          aria-label={Locale.Settings.Access.Tencent.Endpoint.Title}
          type="text"
          value={accessStore.tencentUrl}
          placeholder={Tencent.ExampleEndpoint}
          onChange={(e) =>
            accessStore.update(
              (access) => (access.tencentUrl = e.currentTarget.value),
            )
          }
        ></input>
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.Tencent.ApiKey.Title}
        subTitle={Locale.Settings.Access.Tencent.ApiKey.SubTitle}
      >
        <PasswordInput
          aria-label={Locale.Settings.Access.Tencent.ApiKey.Title}
          value={accessStore.tencentSecretId}
          type="text"
          placeholder={Locale.Settings.Access.Tencent.ApiKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.tencentSecretId = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.Tencent.SecretKey.Title}
        subTitle={Locale.Settings.Access.Tencent.SecretKey.SubTitle}
      >
        <PasswordInput
          aria-label={Locale.Settings.Access.Tencent.SecretKey.Title}
          value={accessStore.tencentSecretKey}
          type="text"
          placeholder={Locale.Settings.Access.Tencent.SecretKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.tencentSecretKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
    </>
  );

  const moonshotConfigComponent = accessStore.provider ===
    ServiceProvider.Moonshot && (
    <>
      <ListItem
        title={Locale.Settings.Access.Moonshot.ApiKey.Title}
        subTitle={Locale.Settings.Access.Moonshot.ApiKey.SubTitle}
      >
        <PasswordInput
          value={accessStore.moonshotApiKey}
          type="text"
          placeholder={Locale.Settings.Access.Moonshot.ApiKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.moonshotApiKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
    </>
  );

  const lflytekConfigComponent = accessStore.provider ===
    ServiceProvider.Iflytek && (
    <>
      <ListItem
        title={Locale.Settings.Access.Iflytek.Endpoint.Title}
        subTitle={
          Locale.Settings.Access.Iflytek.Endpoint.SubTitle +
          Iflytek.ExampleEndpoint
        }
      >
        <input
          aria-label={Locale.Settings.Access.Iflytek.Endpoint.Title}
          type="text"
          value={accessStore.iflytekUrl}
          placeholder={Iflytek.ExampleEndpoint}
          onChange={(e) =>
            accessStore.update(
              (access) => (access.iflytekUrl = e.currentTarget.value),
            )
          }
        ></input>
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.Iflytek.ApiKey.Title}
        subTitle={Locale.Settings.Access.Iflytek.ApiKey.SubTitle}
      >
        <PasswordInput
          aria-label={Locale.Settings.Access.Iflytek.ApiKey.Title}
          value={accessStore.iflytekApiKey}
          type="text"
          placeholder={Locale.Settings.Access.Iflytek.ApiKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.iflytekApiKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>

      <ListItem
        title={Locale.Settings.Access.Iflytek.ApiSecret.Title}
        subTitle={Locale.Settings.Access.Iflytek.ApiSecret.SubTitle}
      >
        <PasswordInput
          aria-label={Locale.Settings.Access.Iflytek.ApiSecret.Title}
          value={accessStore.iflytekApiSecret}
          type="text"
          placeholder={Locale.Settings.Access.Iflytek.ApiSecret.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.iflytekApiSecret = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
    </>
  );

  const stabilityConfigComponent = accessStore.provider ===
    ServiceProvider.Stability && (
    <>
      <ListItem
        title={Locale.Settings.Access.Stability.ApiKey.Title}
        subTitle={Locale.Settings.Access.Stability.ApiKey.SubTitle}
      >
        <PasswordInput
          value={accessStore.stabilityApiKey}
          type="text"
          placeholder={Locale.Settings.Access.Stability.ApiKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.stabilityApiKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
    </>
  );

  const chatglmConfigComponent = accessStore.provider ===
    ServiceProvider.ChatGLM && (
    <>
      <ListItem
        title={Locale.Settings.Access.ChatGLM.Endpoint.Title}
        subTitle={
          Locale.Settings.Access.ChatGLM.Endpoint.SubTitle +
          ChatGLM.ExampleEndpoint
        }
      >
        <input
          aria-label={Locale.Settings.Access.ChatGLM.Endpoint.Title}
          type="text"
          value={accessStore.chatglmUrl}
          placeholder={ChatGLM.ExampleEndpoint}
          onChange={(e) =>
            accessStore.update(
              (access) => (access.chatglmUrl = e.currentTarget.value),
            )
          }
        ></input>
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.ChatGLM.ApiKey.Title}
        subTitle={Locale.Settings.Access.ChatGLM.ApiKey.SubTitle}
      >
        <PasswordInput
          aria-label={Locale.Settings.Access.ChatGLM.ApiKey.Title}
          value={accessStore.chatglmApiKey}
          type="text"
          placeholder={Locale.Settings.Access.ChatGLM.ApiKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.chatglmApiKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
    </>
  );

  const perplexityConfigComponent = accessStore.provider ===
    ServiceProvider.Perplexity && (
    <>
      <ListItem
        title={Locale.Settings.Access.Perplexity.ApiKey.Title}
        subTitle={Locale.Settings.Access.Perplexity.ApiKey.SubTitle}
      >
        <PasswordInput
          value={accessStore.perplexityApiKey}
          type="text"
          placeholder={Locale.Settings.Access.Perplexity.ApiKey.Placeholder}
          onChange={(e) =>
            accessStore.update(
              (access) => (access.perplexityApiKey = e.currentTarget.value),
            )
          }
        />
      </ListItem>
    </>
  );

  const xaiConfigComponent = accessStore.provider === ServiceProvider.XAI && (
    <>
      <ListItem
        title={Locale.Settings.Access.XAI.ApiKey.Title}
        subTitle={Locale.Settings.Access.XAI.ApiKey.SubTitle}
      >
        <PasswordInput
          value={accessStore.xaiApiKey}
          type="text"
          placeholder={Locale.Settings.Access.XAI.ApiKey.Placeholder}
          onChange={(e) =>
            accessStore.update(
              (access) => (access.xaiApiKey = e.currentTarget.value),
            )
          }
        />
      </ListItem>
    </>
  );

  const saasStartComponent = (
    <ListItem
      className={styles["subtitle-button"]}
      title={
        Locale.Settings.Access.SaasStart.Title +
        `${Locale.Settings.Access.SaasStart.Label}`
      }
      subTitle={Locale.Settings.Access.SaasStart.SubTitle}
    >
      <IconButton
        aria={
          Locale.Settings.Access.SaasStart.Title +
          Locale.Settings.Access.SaasStart.ChatNow
        }
        icon={<FireIcon />}
        type={"primary"}
        text={Locale.Settings.Access.SaasStart.ChatNow}
        onClick={() => {
          trackSettingsPageGuideToCPaymentClick();
          window.location.href = SAAS_CHAT_URL;
        }}
      />
    </ListItem>
  );

  return (
    <List id={SlotID.CustomModel}>
      {saasStartComponent}
      {accessCodeComponent}

      {!accessStore.hideUserApiKey && (
        <>
          {accessStore.useCustomConfig && (
            <>
              <ListItem
                title={Locale.Settings.Access.Provider.Title}
                subTitle={Locale.Settings.Access.Provider.SubTitle}
              >
                <Select
                  value={accessStore.provider}
                  onChange={(e) => {
                    accessStore.update(
                      (access) =>
                        (access.provider = e.target.value as ServiceProvider),
                    );
                  }}
                >
                  {Object.entries(ServiceProvider).map(([k, v]) => (
                    <option value={v} key={k}>
                      {k}
                    </option>
                  ))}
                </Select>
              </ListItem>

              {openAIConfigComponent}
              {azureConfigComponent}
              {googleConfigComponent}
              {anthropicConfigComponent}
              {baiduConfigComponent}
              {byteDanceConfigComponent}
              {alibabaConfigComponent}
              {moonshotConfigComponent}
              {tencentConfigComponent}
              {chatglmConfigComponent}
              {lflytekConfigComponent}
              {stabilityConfigComponent}
              {perplexityConfigComponent}
              {xaiConfigComponent}
            </>
          )}
        </>
      )}

      {!shouldHideBalanceQuery && !clientConfig?.isApp ? (
        <ListItem
          title={Locale.Settings.Usage.Title}
          subTitle={
            showUsage
              ? loadingUsage
                ? Locale.Settings.Usage.IsChecking
                : Locale.Settings.Usage.SubTitle(
                    usage?.used ?? "[?]",
                    usage?.subscription ?? "[?]",
                  )
              : Locale.Settings.Usage.NoAccess
          }
        >
          {!showUsage || loadingUsage ? (
            <div />
          ) : (
            <IconButton
              icon={<ResetIcon></ResetIcon>}
              text={Locale.Settings.Usage.Check}
              onClick={() => checkUsage(true)}
            />
          )}
        </ListItem>
      ) : null}
    </List>
  );
}
function ModelSettings() {
  const config = useAppConfig();

  return (
    <List>
      <List>
        <ModelConfigList
          modelConfig={config.modelConfig}
          updateConfig={(updater) => {
            const modelConfig = { ...config.modelConfig };
            updater(modelConfig);
            config.update((config) => (config.modelConfig = modelConfig));
          }}
        />
      </List>
    </List>
  );
}

function MaskSettings() {
  const config = useAppConfig();
  const updateConfig = config.update;
  return (
    <List>
      <ListItem
        title={Locale.Settings.Mask.Splash.Title}
        subTitle={Locale.Settings.Mask.Splash.SubTitle}
      >
        <input
          aria-label={Locale.Settings.Mask.Splash.Title}
          type="checkbox"
          checked={!config.dontShowMaskSplashScreen}
          onChange={(e) =>
            updateConfig(
              (config) =>
                (config.dontShowMaskSplashScreen = !e.currentTarget.checked),
            )
          }
        ></input>
      </ListItem>

      <ListItem
        title={Locale.Settings.Mask.Builtin.Title}
        subTitle={Locale.Settings.Mask.Builtin.SubTitle}
      >
        <input
          aria-label={Locale.Settings.Mask.Builtin.Title}
          type="checkbox"
          checked={config.hideBuiltinMasks}
          onChange={(e) =>
            updateConfig(
              (config) => (config.hideBuiltinMasks = e.currentTarget.checked),
            )
          }
        ></input>
      </ListItem>

      <ListItem
        title={Locale.Mask.Config.Artifacts.Title}
        subTitle={Locale.Mask.Config.Artifacts.SubTitle}
      >
        <input
          aria-label={Locale.Mask.Config.Artifacts.Title}
          type="checkbox"
          checked={config.enableArtifacts}
          onChange={(e) =>
            updateConfig(
              (config) => (config.enableArtifacts = e.currentTarget.checked),
            )
          }
        ></input>
      </ListItem>
      <ListItem
        title={Locale.Mask.Config.CodeFold.Title}
        subTitle={Locale.Mask.Config.CodeFold.SubTitle}
      >
        <input
          aria-label={Locale.Mask.Config.CodeFold.Title}
          type="checkbox"
          checked={config.enableCodeFold}
          data-testid="enable-code-fold-checkbox"
          onChange={(e) =>
            updateConfig(
              (config) => (config.enableCodeFold = e.currentTarget.checked),
            )
          }
        ></input>
      </ListItem>
    </List>
  );
}

function PromptSettings() {
  const config = useAppConfig();
  const updateConfig = config.update;
  const promptStore = usePromptStore();
  const builtinCount = SearchService.count.builtin;
  const customCount = promptStore.getUserPrompts().length ?? 0;
  const [shouldShowPromptModal, setShowPromptModal] = useState(false);

  return (
    <List>
      <List>
        <ListItem
          title={Locale.Settings.Prompt.Disable.Title}
          subTitle={Locale.Settings.Prompt.Disable.SubTitle}
        >
          <input
            aria-label={Locale.Settings.Prompt.Disable.Title}
            type="checkbox"
            checked={config.disablePromptHint}
            onChange={(e) =>
              updateConfig(
                (config) =>
                  (config.disablePromptHint = e.currentTarget.checked),
              )
            }
          ></input>
        </ListItem>

        <ListItem
          title={Locale.Settings.Prompt.List}
          subTitle={Locale.Settings.Prompt.ListCount(builtinCount, customCount)}
        >
          <IconButton
            aria={Locale.Settings.Prompt.List + Locale.Settings.Prompt.Edit}
            icon={<EditIcon />}
            text={Locale.Settings.Prompt.Edit}
            onClick={() => setShowPromptModal(true)}
          />
        </ListItem>
      </List>

      {shouldShowPromptModal && (
        <UserPromptModal onClose={() => setShowPromptModal(false)} />
      )}
    </List>
  );
}

function SyncSettings() {
  const navigate = useNavigate();
  const updateStore = useUpdateStore();
  const updateUrl = getClientConfig()?.isApp ? RELEASE_URL : UPDATE_URL;
  const [checkingUpdate, setCheckingUpdate] = useState(false);

  const currentVersion = updateStore.formatVersion(updateStore.version);
  const remoteId = updateStore.formatVersion(updateStore.remoteVersion);
  const hasNewVersion = currentVersion !== remoteId;

  function checkUpdate(force = false) {
    setCheckingUpdate(true);
    updateStore.getLatestVersion(force).then(() => {
      setCheckingUpdate(false);
    });

    console.log("[Update] local version ", updateStore.version);
    console.log("[Update] remote version ", updateStore.remoteVersion);
  }

  const accessStore = useAccessStore();

  useEffect(() => {
    const keydownEvent = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate(Path.Home);
      }
    };
    if (clientConfig?.isApp) {
      // Force to set custom endpoint to true if it's app
      accessStore.update((state) => {
        state.useCustomConfig = true;
      });
    }
    document.addEventListener("keydown", keydownEvent);
    return () => {
      document.removeEventListener("keydown", keydownEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clientConfig = useMemo(() => getClientConfig(), []);

  const syncStore = useSyncStore();
  const chatStore = useChatStore();
  const promptStore = usePromptStore();
  const maskStore = useMaskStore();
  const couldSync = useMemo(() => {
    return syncStore.cloudSync();
  }, [syncStore]);

  const [showSyncConfigModal, setShowSyncConfigModal] = useState(false);

  const stateOverview = useMemo(() => {
    const sessions = chatStore.sessions;
    const messageCount = sessions.reduce((p, c) => p + c.messages.length, 0);

    return {
      chat: sessions.length,
      message: messageCount,
      prompt: Object.keys(promptStore.prompts).length,
      mask: Object.keys(maskStore.masks).length,
    };
  }, [chatStore.sessions, maskStore.masks, promptStore.prompts]);

  return (
    <>
      <List>
        <ListItem
          title={Locale.Settings.Update.Version(currentVersion ?? "unknown")}
          subTitle={
            checkingUpdate
              ? Locale.Settings.Update.IsChecking
              : hasNewVersion
                ? Locale.Settings.Update.FoundUpdate(remoteId ?? "ERROR")
                : Locale.Settings.Update.IsLatest
          }
        >
          {checkingUpdate ? (
            <LoadingIcon />
          ) : hasNewVersion ? (
            clientConfig?.isApp ? (
              <IconButton
                icon={<ResetIcon></ResetIcon>}
                text={Locale.Settings.Update.GoToUpdate}
                onClick={() => clientUpdate()}
              />
            ) : (
              <Link href={updateUrl} target="_blank" className="link">
                {Locale.Settings.Update.GoToUpdate}
              </Link>
            )
          ) : (
            <IconButton
              icon={<ResetIcon></ResetIcon>}
              text={Locale.Settings.Update.CheckUpdate}
              onClick={() => checkUpdate(true)}
            />
          )}
        </ListItem>

        <ListItem
          title={Locale.Settings.Sync.CloudState}
          subTitle={
            syncStore.lastProvider
              ? `${new Date(syncStore.lastSyncTime).toLocaleString()} [${
                  syncStore.lastProvider
                }]`
              : Locale.Settings.Sync.NotSyncYet
          }
        >
          <div style={{ display: "flex" }}>
            <IconButton
              aria={Locale.Settings.Sync.CloudState + Locale.UI.Config}
              icon={<ConfigIcon />}
              text={Locale.UI.Config}
              onClick={() => {
                setShowSyncConfigModal(true);
              }}
            />
            {couldSync && (
              <IconButton
                icon={<ResetIcon />}
                text={Locale.UI.Sync}
                onClick={async () => {
                  try {
                    await syncStore.sync();
                    showToast(Locale.Settings.Sync.Success);
                  } catch (e) {
                    showToast(Locale.Settings.Sync.Fail);
                    console.error("[Sync]", e);
                  }
                }}
              />
            )}
          </div>
        </ListItem>

        <ListItem
          title={Locale.Settings.Sync.LocalState}
          subTitle={Locale.Settings.Sync.Overview(stateOverview)}
        >
          <div style={{ display: "flex" }}>
            <IconButton
              aria={Locale.Settings.Sync.LocalState + Locale.UI.Export}
              icon={<UploadIcon />}
              text={Locale.UI.Export}
              onClick={() => {
                syncStore.export();
              }}
            />
            <IconButton
              aria={Locale.Settings.Sync.LocalState + Locale.UI.Import}
              icon={<DownloadIcon />}
              text={Locale.UI.Import}
              onClick={() => {
                syncStore.import();
              }}
            />
          </div>
        </ListItem>
      </List>

      <List>
        <DangerItems />
      </List>

      {showSyncConfigModal && (
        <SyncConfigModal onClose={() => setShowSyncConfigModal(false)} />
      )}
    </>
  );
}

function ProxySettings() {
  const navigate = useNavigate();
  const updateStore = useUpdateStore();
  const [checkingUpdate, setCheckingUpdate] = useState(false);

  const config = useAppConfig();

  function checkUpdate(force = false) {
    setCheckingUpdate(true);
    updateStore.getLatestVersion(force).then(() => {
      setCheckingUpdate(false);
    });

    console.log("[Update] local version ", updateStore.version);
    console.log("[Update] remote version ", updateStore.remoteVersion);
  }

  const accessStore = useAccessStore();
  const usage = {
    used: updateStore.used,
    subscription: updateStore.subscription,
  };
  const [loadingUsage, setLoadingUsage] = useState(false);
  function checkUsage(force = false) {
    if (shouldHideBalanceQuery) {
      return;
    }

    setLoadingUsage(true);
    updateStore.updateUsage(force).finally(() => {
      setLoadingUsage(false);
    });
  }

  const enabledAccessControl = useMemo(
    () => accessStore.enabledAccessControl(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const showUsage = accessStore.isAuthorized();
  useEffect(() => {
    // checks per minutes
    checkUpdate();
    showUsage && checkUsage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const keydownEvent = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate(Path.Home);
      }
    };
    if (clientConfig?.isApp) {
      // Force to set custom endpoint to true if it's app
      accessStore.update((state) => {
        state.useCustomConfig = true;
      });
    }
    document.addEventListener("keydown", keydownEvent);
    return () => {
      document.removeEventListener("keydown", keydownEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clientConfig = useMemo(() => getClientConfig(), []);
  const showAccessCode = enabledAccessControl && !clientConfig?.isApp;

  const shouldHideBalanceQuery = useMemo(() => {
    const isOpenAiUrl = accessStore.openaiUrl.includes(OPENAI_BASE_URL);

    return (
      accessStore.hideBalanceQuery ||
      isOpenAiUrl ||
      accessStore.provider === ServiceProvider.Azure
    );
  }, [
    accessStore.hideBalanceQuery,
    accessStore.openaiUrl,
    accessStore.provider,
  ]);

  const accessCodeComponent = showAccessCode && (
    <ListItem
      title={Locale.Settings.Access.AccessCode.Title}
      subTitle={Locale.Settings.Access.AccessCode.SubTitle}
    >
      <PasswordInput
        value={accessStore.accessCode}
        type="text"
        placeholder={Locale.Settings.Access.AccessCode.Placeholder}
        onChange={(e) => {
          accessStore.update(
            (access) => (access.accessCode = e.currentTarget.value),
          );
        }}
      />
    </ListItem>
  );

  const useCustomConfigComponent = // Conditionally render the following ListItem based on clientConfig.isApp
    !clientConfig?.isApp && ( // only show if isApp is false
      <ListItem
        title={Locale.Settings.Access.CustomEndpoint.Title}
        subTitle={Locale.Settings.Access.CustomEndpoint.SubTitle}
      >
        <input
          aria-label={Locale.Settings.Access.CustomEndpoint.Title}
          type="checkbox"
          checked={accessStore.useCustomConfig}
          onChange={(e) =>
            accessStore.update(
              (access) => (access.useCustomConfig = e.currentTarget.checked),
            )
          }
        ></input>
      </ListItem>
    );

  const openAIConfigComponent = accessStore.provider ===
    ServiceProvider.OpenAI && (
    <>
      <ListItem
        title={Locale.Settings.Access.OpenAI.Endpoint.Title}
        subTitle={Locale.Settings.Access.OpenAI.Endpoint.SubTitle}
      >
        <input
          aria-label={Locale.Settings.Access.OpenAI.Endpoint.Title}
          type="text"
          value={accessStore.openaiUrl}
          placeholder={OPENAI_BASE_URL}
          onChange={(e) =>
            accessStore.update(
              (access) => (access.openaiUrl = e.currentTarget.value),
            )
          }
        ></input>
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.OpenAI.ApiKey.Title}
        subTitle={Locale.Settings.Access.OpenAI.ApiKey.SubTitle}
      >
        <PasswordInput
          aria-label={Locale.Settings.Access.OpenAI.ApiKey.Title}
          value={accessStore.openaiApiKey}
          type="text"
          placeholder={Locale.Settings.Access.OpenAI.ApiKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.openaiApiKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
    </>
  );

  const azureConfigComponent = accessStore.provider ===
    ServiceProvider.Azure && (
    <>
      <ListItem
        title={Locale.Settings.Access.Azure.Endpoint.Title}
        subTitle={
          Locale.Settings.Access.Azure.Endpoint.SubTitle + Azure.ExampleEndpoint
        }
      >
        <input
          aria-label={Locale.Settings.Access.Azure.Endpoint.Title}
          type="text"
          value={accessStore.azureUrl}
          placeholder={Azure.ExampleEndpoint}
          onChange={(e) =>
            accessStore.update(
              (access) => (access.azureUrl = e.currentTarget.value),
            )
          }
        ></input>
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.Azure.ApiKey.Title}
        subTitle={Locale.Settings.Access.Azure.ApiKey.SubTitle}
      >
        <PasswordInput
          aria-label={Locale.Settings.Access.Azure.ApiKey.Title}
          value={accessStore.azureApiKey}
          type="text"
          placeholder={Locale.Settings.Access.Azure.ApiKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.azureApiKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.Azure.ApiVerion.Title}
        subTitle={Locale.Settings.Access.Azure.ApiVerion.SubTitle}
      >
        <input
          aria-label={Locale.Settings.Access.Azure.ApiVerion.Title}
          type="text"
          value={accessStore.azureApiVersion}
          placeholder="2023-08-01-preview"
          onChange={(e) =>
            accessStore.update(
              (access) => (access.azureApiVersion = e.currentTarget.value),
            )
          }
        ></input>
      </ListItem>
    </>
  );

  const googleConfigComponent = accessStore.provider ===
    ServiceProvider.Google && (
    <>
      <ListItem
        title={Locale.Settings.Access.Google.Endpoint.Title}
        subTitle={
          Locale.Settings.Access.Google.Endpoint.SubTitle +
          Google.ExampleEndpoint
        }
      >
        <input
          aria-label={Locale.Settings.Access.Google.Endpoint.Title}
          type="text"
          value={accessStore.googleUrl}
          placeholder={Google.ExampleEndpoint}
          onChange={(e) =>
            accessStore.update(
              (access) => (access.googleUrl = e.currentTarget.value),
            )
          }
        ></input>
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.Google.ApiKey.Title}
        subTitle={Locale.Settings.Access.Google.ApiKey.SubTitle}
      >
        <PasswordInput
          aria-label={Locale.Settings.Access.Google.ApiKey.Title}
          value={accessStore.googleApiKey}
          type="text"
          placeholder={Locale.Settings.Access.Google.ApiKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.googleApiKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.Google.ApiVersion.Title}
        subTitle={Locale.Settings.Access.Google.ApiVersion.SubTitle}
      >
        <input
          aria-label={Locale.Settings.Access.Google.ApiVersion.Title}
          type="text"
          value={accessStore.googleApiVersion}
          placeholder="2023-08-01-preview"
          onChange={(e) =>
            accessStore.update(
              (access) => (access.googleApiVersion = e.currentTarget.value),
            )
          }
        ></input>
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.Google.GoogleSafetySettings.Title}
        subTitle={Locale.Settings.Access.Google.GoogleSafetySettings.SubTitle}
      >
        <Select
          aria-label={Locale.Settings.Access.Google.GoogleSafetySettings.Title}
          value={accessStore.googleSafetySettings}
          onChange={(e) => {
            accessStore.update(
              (access) =>
                (access.googleSafetySettings = e.target
                  .value as GoogleSafetySettingsThreshold),
            );
          }}
        >
          {Object.entries(GoogleSafetySettingsThreshold).map(([k, v]) => (
            <option value={v} key={k}>
              {k}
            </option>
          ))}
        </Select>
      </ListItem>
    </>
  );

  const anthropicConfigComponent = accessStore.provider ===
    ServiceProvider.Anthropic && (
    <>
      <ListItem
        title={Locale.Settings.Access.Anthropic.Endpoint.Title}
        subTitle={
          Locale.Settings.Access.Anthropic.Endpoint.SubTitle +
          Anthropic.ExampleEndpoint
        }
      >
        <input
          aria-label={Locale.Settings.Access.Anthropic.Endpoint.Title}
          type="text"
          value={accessStore.anthropicUrl}
          placeholder={Anthropic.ExampleEndpoint}
          onChange={(e) =>
            accessStore.update(
              (access) => (access.anthropicUrl = e.currentTarget.value),
            )
          }
        ></input>
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.Anthropic.ApiKey.Title}
        subTitle={Locale.Settings.Access.Anthropic.ApiKey.SubTitle}
      >
        <PasswordInput
          aria-label={Locale.Settings.Access.Anthropic.ApiKey.Title}
          value={accessStore.anthropicApiKey}
          type="text"
          placeholder={Locale.Settings.Access.Anthropic.ApiKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.anthropicApiKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.Anthropic.ApiVerion.Title}
        subTitle={Locale.Settings.Access.Anthropic.ApiVerion.SubTitle}
      >
        <input
          aria-label={Locale.Settings.Access.Anthropic.ApiVerion.Title}
          type="text"
          value={accessStore.anthropicApiVersion}
          placeholder={Anthropic.Vision}
          onChange={(e) =>
            accessStore.update(
              (access) => (access.anthropicApiVersion = e.currentTarget.value),
            )
          }
        ></input>
      </ListItem>
    </>
  );

  const baiduConfigComponent = accessStore.provider ===
    ServiceProvider.Baidu && (
    <>
      <ListItem
        title={Locale.Settings.Access.Baidu.Endpoint.Title}
        subTitle={Locale.Settings.Access.Baidu.Endpoint.SubTitle}
      >
        <input
          aria-label={Locale.Settings.Access.Baidu.Endpoint.Title}
          type="text"
          value={accessStore.baiduUrl}
          placeholder={Baidu.ExampleEndpoint}
          onChange={(e) =>
            accessStore.update(
              (access) => (access.baiduUrl = e.currentTarget.value),
            )
          }
        ></input>
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.Baidu.ApiKey.Title}
        subTitle={Locale.Settings.Access.Baidu.ApiKey.SubTitle}
      >
        <PasswordInput
          aria-label={Locale.Settings.Access.Baidu.ApiKey.Title}
          value={accessStore.baiduApiKey}
          type="text"
          placeholder={Locale.Settings.Access.Baidu.ApiKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.baiduApiKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.Baidu.SecretKey.Title}
        subTitle={Locale.Settings.Access.Baidu.SecretKey.SubTitle}
      >
        <PasswordInput
          aria-label={Locale.Settings.Access.Baidu.SecretKey.Title}
          value={accessStore.baiduSecretKey}
          type="text"
          placeholder={Locale.Settings.Access.Baidu.SecretKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.baiduSecretKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
    </>
  );

  const tencentConfigComponent = accessStore.provider ===
    ServiceProvider.Tencent && (
    <>
      <ListItem
        title={Locale.Settings.Access.Tencent.Endpoint.Title}
        subTitle={Locale.Settings.Access.Tencent.Endpoint.SubTitle}
      >
        <input
          aria-label={Locale.Settings.Access.Tencent.Endpoint.Title}
          type="text"
          value={accessStore.tencentUrl}
          placeholder={Tencent.ExampleEndpoint}
          onChange={(e) =>
            accessStore.update(
              (access) => (access.tencentUrl = e.currentTarget.value),
            )
          }
        ></input>
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.Tencent.ApiKey.Title}
        subTitle={Locale.Settings.Access.Tencent.ApiKey.SubTitle}
      >
        <PasswordInput
          aria-label={Locale.Settings.Access.Tencent.ApiKey.Title}
          value={accessStore.tencentSecretId}
          type="text"
          placeholder={Locale.Settings.Access.Tencent.ApiKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.tencentSecretId = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.Tencent.SecretKey.Title}
        subTitle={Locale.Settings.Access.Tencent.SecretKey.SubTitle}
      >
        <PasswordInput
          aria-label={Locale.Settings.Access.Tencent.SecretKey.Title}
          value={accessStore.tencentSecretKey}
          type="text"
          placeholder={Locale.Settings.Access.Tencent.SecretKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.tencentSecretKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
    </>
  );

  const byteDanceConfigComponent = accessStore.provider ===
    ServiceProvider.ByteDance && (
    <>
      <ListItem
        title={Locale.Settings.Access.ByteDance.Endpoint.Title}
        subTitle={
          Locale.Settings.Access.ByteDance.Endpoint.SubTitle +
          ByteDance.ExampleEndpoint
        }
      >
        <input
          aria-label={Locale.Settings.Access.ByteDance.Endpoint.Title}
          type="text"
          value={accessStore.bytedanceUrl}
          placeholder={ByteDance.ExampleEndpoint}
          onChange={(e) =>
            accessStore.update(
              (access) => (access.bytedanceUrl = e.currentTarget.value),
            )
          }
        ></input>
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.ByteDance.ApiKey.Title}
        subTitle={Locale.Settings.Access.ByteDance.ApiKey.SubTitle}
      >
        <PasswordInput
          aria-label={Locale.Settings.Access.ByteDance.ApiKey.Title}
          value={accessStore.bytedanceApiKey}
          type="text"
          placeholder={Locale.Settings.Access.ByteDance.ApiKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.bytedanceApiKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
    </>
  );

  const alibabaConfigComponent = accessStore.provider ===
    ServiceProvider.Alibaba && (
    <>
      <ListItem
        title={Locale.Settings.Access.Alibaba.Endpoint.Title}
        subTitle={
          Locale.Settings.Access.Alibaba.Endpoint.SubTitle +
          Alibaba.ExampleEndpoint
        }
      >
        <input
          aria-label={Locale.Settings.Access.Alibaba.Endpoint.Title}
          type="text"
          value={accessStore.alibabaUrl}
          placeholder={Alibaba.ExampleEndpoint}
          onChange={(e) =>
            accessStore.update(
              (access) => (access.alibabaUrl = e.currentTarget.value),
            )
          }
        ></input>
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.Alibaba.ApiKey.Title}
        subTitle={Locale.Settings.Access.Alibaba.ApiKey.SubTitle}
      >
        <PasswordInput
          aria-label={Locale.Settings.Access.Alibaba.ApiKey.Title}
          value={accessStore.alibabaApiKey}
          type="text"
          placeholder={Locale.Settings.Access.Alibaba.ApiKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.alibabaApiKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
    </>
  );

  const moonshotConfigComponent = accessStore.provider ===
    ServiceProvider.Moonshot && (
    <>
      <ListItem
        title={Locale.Settings.Access.Moonshot.Endpoint.Title}
        subTitle={
          Locale.Settings.Access.Moonshot.Endpoint.SubTitle +
          Moonshot.ExampleEndpoint
        }
      >
        <input
          aria-label={Locale.Settings.Access.Moonshot.Endpoint.Title}
          type="text"
          value={accessStore.moonshotUrl}
          placeholder={Moonshot.ExampleEndpoint}
          onChange={(e) =>
            accessStore.update(
              (access) => (access.moonshotUrl = e.currentTarget.value),
            )
          }
        ></input>
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.Moonshot.ApiKey.Title}
        subTitle={Locale.Settings.Access.Moonshot.ApiKey.SubTitle}
      >
        <PasswordInput
          aria-label={Locale.Settings.Access.Moonshot.ApiKey.Title}
          value={accessStore.moonshotApiKey}
          type="text"
          placeholder={Locale.Settings.Access.Moonshot.ApiKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.moonshotApiKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
    </>
  );

  const chatglmConfigComponent = accessStore.provider ===
    ServiceProvider.ChatGLM && (
    <>
      <ListItem
        title={Locale.Settings.Access.ChatGLM.Endpoint.Title}
        subTitle={
          Locale.Settings.Access.ChatGLM.Endpoint.SubTitle +
          ChatGLM.ExampleEndpoint
        }
      >
        <input
          aria-label={Locale.Settings.Access.ChatGLM.Endpoint.Title}
          type="text"
          value={accessStore.chatglmUrl}
          placeholder={ChatGLM.ExampleEndpoint}
          onChange={(e) =>
            accessStore.update(
              (access) => (access.chatglmUrl = e.currentTarget.value),
            )
          }
        ></input>
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.ChatGLM.ApiKey.Title}
        subTitle={Locale.Settings.Access.ChatGLM.ApiKey.SubTitle}
      >
        <PasswordInput
          aria-label={Locale.Settings.Access.ChatGLM.ApiKey.Title}
          value={accessStore.chatglmApiKey}
          type="text"
          placeholder={Locale.Settings.Access.ChatGLM.ApiKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.chatglmApiKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
    </>
  );

  const stabilityConfigComponent = accessStore.provider ===
    ServiceProvider.Stability && (
    <>
      <ListItem
        title={Locale.Settings.Access.Stability.Endpoint.Title}
        subTitle={
          Locale.Settings.Access.Stability.Endpoint.SubTitle +
          Stability.ExampleEndpoint
        }
      >
        <input
          aria-label={Locale.Settings.Access.Stability.Endpoint.Title}
          type="text"
          value={accessStore.stabilityUrl}
          placeholder={Stability.ExampleEndpoint}
          onChange={(e) =>
            accessStore.update(
              (access) => (access.stabilityUrl = e.currentTarget.value),
            )
          }
        ></input>
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.Stability.ApiKey.Title}
        subTitle={Locale.Settings.Access.Stability.ApiKey.SubTitle}
      >
        <PasswordInput
          aria-label={Locale.Settings.Access.Stability.ApiKey.Title}
          value={accessStore.stabilityApiKey}
          type="text"
          placeholder={Locale.Settings.Access.Stability.ApiKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.stabilityApiKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
    </>
  );
  const lflytekConfigComponent = accessStore.provider ===
    ServiceProvider.Iflytek && (
    <>
      <ListItem
        title={Locale.Settings.Access.Iflytek.Endpoint.Title}
        subTitle={
          Locale.Settings.Access.Iflytek.Endpoint.SubTitle +
          Iflytek.ExampleEndpoint
        }
      >
        <input
          aria-label={Locale.Settings.Access.Iflytek.Endpoint.Title}
          type="text"
          value={accessStore.iflytekUrl}
          placeholder={Iflytek.ExampleEndpoint}
          onChange={(e) =>
            accessStore.update(
              (access) => (access.iflytekUrl = e.currentTarget.value),
            )
          }
        ></input>
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.Iflytek.ApiKey.Title}
        subTitle={Locale.Settings.Access.Iflytek.ApiKey.SubTitle}
      >
        <PasswordInput
          aria-label={Locale.Settings.Access.Iflytek.ApiKey.Title}
          value={accessStore.iflytekApiKey}
          type="text"
          placeholder={Locale.Settings.Access.Iflytek.ApiKey.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.iflytekApiKey = e.currentTarget.value),
            );
          }}
        />
      </ListItem>

      <ListItem
        title={Locale.Settings.Access.Iflytek.ApiSecret.Title}
        subTitle={Locale.Settings.Access.Iflytek.ApiSecret.SubTitle}
      >
        <PasswordInput
          aria-label={Locale.Settings.Access.Iflytek.ApiSecret.Title}
          value={accessStore.iflytekApiSecret}
          type="text"
          placeholder={Locale.Settings.Access.Iflytek.ApiSecret.Placeholder}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.iflytekApiSecret = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
    </>
  );

  const perplexityConfigComponent = accessStore.provider ===
    ServiceProvider.Perplexity && (
    <>
      <ListItem
        title={Locale.Settings.Access.Perplexity.Endpoint.Title}
        subTitle={Locale.Settings.Access.Perplexity.Endpoint.SubTitle}
      >
        <input
          type="text"
          value={accessStore.perplexityUrl}
          placeholder={Perplexity.ExampleEndpoint}
          onChange={(e) =>
            accessStore.update(
              (access) => (access.perplexityUrl = e.currentTarget.value),
            )
          }
        />
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.Perplexity.ApiKey.Title}
        subTitle={Locale.Settings.Access.Perplexity.ApiKey.SubTitle}
      >
        <PasswordInput
          value={accessStore.perplexityApiKey}
          type="text"
          placeholder={Locale.Settings.Access.Perplexity.ApiKey.Placeholder}
          onChange={(e) =>
            accessStore.update(
              (access) => (access.perplexityApiKey = e.currentTarget.value),
            )
          }
        />
      </ListItem>
    </>
  );

  const xaiConfigComponent = accessStore.provider === ServiceProvider.XAI && (
    <>
      <ListItem
        title={Locale.Settings.Access.XAI.Endpoint.Title}
        subTitle={Locale.Settings.Access.XAI.Endpoint.SubTitle}
      >
        <input
          type="text"
          value={accessStore.xaiUrl}
          placeholder={XAI.ExampleEndpoint}
          onChange={(e) =>
            accessStore.update(
              (access) => (access.xaiUrl = e.currentTarget.value),
            )
          }
        />
      </ListItem>
      <ListItem
        title={Locale.Settings.Access.XAI.ApiKey.Title}
        subTitle={Locale.Settings.Access.XAI.ApiKey.SubTitle}
      >
        <PasswordInput
          value={accessStore.xaiApiKey}
          type="text"
          placeholder={Locale.Settings.Access.XAI.ApiKey.Placeholder}
          onChange={(e) =>
            accessStore.update(
              (access) => (access.xaiApiKey = e.currentTarget.value),
            )
          }
        />
      </ListItem>
    </>
  );

  return (
    <List id={SlotID.CustomModel}>
      {!accessStore.hideUserApiKey && (
        <>
          {useCustomConfigComponent}

          {accessStore.useCustomConfig && (
            <>
              <ListItem
                title={Locale.Settings.Access.Provider.Title}
                subTitle={Locale.Settings.Access.Provider.SubTitle}
              >
                <Select
                  value={accessStore.provider}
                  onChange={(e) => {
                    accessStore.update(
                      (access) =>
                        (access.provider = e.target.value as ServiceProvider),
                    );
                  }}
                >
                  {Object.entries(ServiceProvider).map(([k, v]) => (
                    <option value={v} key={k}>
                      {k}
                    </option>
                  ))}
                </Select>
              </ListItem>

              {openAIConfigComponent}
              {azureConfigComponent}
              {googleConfigComponent}
              {anthropicConfigComponent}
              {baiduConfigComponent}
              {byteDanceConfigComponent}
              {alibabaConfigComponent}
              {moonshotConfigComponent}
              {lflytekConfigComponent}
              {tencentConfigComponent}
              {moonshotConfigComponent}
              {stabilityConfigComponent}
              {chatglmConfigComponent}
              {perplexityConfigComponent}
              {xaiConfigComponent}
            </>
          )}
        </>
      )}

      {!shouldHideBalanceQuery && !clientConfig?.isApp ? (
        <ListItem
          title={Locale.Settings.Usage.Title}
          subTitle={
            showUsage
              ? loadingUsage
                ? Locale.Settings.Usage.IsChecking
                : Locale.Settings.Usage.SubTitle(
                    usage?.used ?? "[?]",
                    usage?.subscription ?? "[?]",
                  )
              : Locale.Settings.Usage.NoAccess
          }
        >
          {!showUsage || loadingUsage ? (
            <div />
          ) : (
            <IconButton
              icon={<ResetIcon></ResetIcon>}
              text={Locale.Settings.Usage.Check}
              onClick={() => checkUsage(true)}
            />
          )}
        </ListItem>
      ) : null}

      <ListItem
        title={Locale.Settings.Access.CustomModel.Title}
        subTitle={Locale.Settings.Access.CustomModel.SubTitle}
      >
        <input
          type="text"
          value={config.customModels}
          placeholder="model1,model2,model3"
          onChange={(e) =>
            config.update(
              (config) => (config.customModels = e.currentTarget.value),
            )
          }
        ></input>
      </ListItem>
    </List>
  );
}

function VoiceSettings() {
  const config = useAppConfig();
  return (
    <>
      <List>
        <RealtimeConfigList
          realtimeConfig={config.realtimeConfig}
          updateConfig={(updater) => {
            const realtimeConfig = { ...config.realtimeConfig };
            updater(realtimeConfig);
            config.update((config) => (config.realtimeConfig = realtimeConfig));
          }}
        />
      </List>
      <List>
        <TTSConfigList
          ttsConfig={config.ttsConfig}
          updateConfig={(updater) => {
            const ttsConfig = { ...config.ttsConfig };
            updater(ttsConfig);
            config.update((config) => (config.ttsConfig = ttsConfig));
          }}
        />
      </List>
    </>
  );
}
export function Settings() {
  const [selectedSetting, setSelectedSetting] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const toggleSetting = (setting: string) => {
    setSelectedSetting((prevSetting) =>
      prevSetting === setting ? null : setting,
    );
  };
  /**
   * Get user's role and allowed models
   * Used for controlling model access in settings
   */
  const { user } = useUser();

  const userRole =
    (getHighestUserRole(user) as keyof typeof ROLE_ALLOWED_MODEL_NAMES) ||
    "guest";

  return (
    <ErrorBoundary>
      <div className="window-header" data-tauri-drag-region>
        <div className="window-header-title">
          <div className="window-header-main-title">
            {Locale.Settings.Title}
          </div>
          <div className="window-header-sub-title">
            {Locale.Settings.SubTitle}
          </div>
        </div>
        <div className="window-actions">
          <div className="window-action-button"></div>
          <div className="window-action-button"></div>
          {/* Role-based organization management
              Only teacher role can access organization switcher */}
          {userRole != "guest" && userRole != "student" && (
            <OrganizationSwitcher hidePersonal={true} />
          )}

          <div className="window-action-button">
            <IconButton
              aria={Locale.UI.Close}
              icon={<CloseIcon />}
              onClick={() => navigate(Path.Home)}
              bordered
            />
          </div>
        </div>
      </div>

      <div className={styles["settings"]}>
        {selectedSetting === null && (
          <>
            {
              <List>
                <ListItem
                  icon={<GeneralIcon />}
                  title={Locale.Settings.GeneralSettings}
                  onClick={() => toggleSetting("general")}
                >
                  <DownIcon />
                </ListItem>
              </List>
            }

            {/* delete access code */}
            {/* <List>
              <ListItem
                icon={<PasswordIcon />}
                title={Locale.Settings.PasswordSettings}
                onClick={() => toggleSetting("password")}
              >
                <DownIcon />
              </ListItem>
            </List> */}

            {/**
             * Settings access control
             * Certain settings only visible to logged in users:
             * - Model settings
             * - Mask settings
             * - Prompt settings
             */}

            {isSignedIn && (
              <List>
                <ListItem
                  icon={<ModelIcon />}
                  title={Locale.Settings.ModelSettings}
                  onClick={() => toggleSetting("model")}
                >
                  <DownIcon />
                </ListItem>
              </List>
            )}
            <List>
              <ListItem
                icon={<HeadphoneIcon />}
                title={Locale.Settings.VoiceSettings}
                onClick={() => toggleSetting("voice")}
              >
                <DownIcon />
              </ListItem>
            </List>

            {isSignedIn && (
              <List>
                <ListItem
                  icon={<MaskIcon />}
                  title={Locale.Settings.MaskSettings}
                  onClick={() => toggleSetting("mask")}
                >
                  <DownIcon />
                </ListItem>
              </List>
            )}

            {isSignedIn && (
              <List>
                <ListItem
                  icon={<PromptIcon />}
                  title={Locale.Settings.PromptSettings}
                  onClick={() => toggleSetting("prompt")}
                >
                  <DownIcon />
                </ListItem>
              </List>
            )}
            <List>
              <ListItem
                icon={<DataIcon />}
                title={Locale.Settings.DataSettings}
                onClick={() => toggleSetting("sync")}
              >
                <DownIcon />
              </ListItem>
            </List>
            <List>
              <ListItem
                icon={<ProxyIcon />}
                title={Locale.Settings.ProxySettings}
                onClick={() => toggleSetting("proxy")}
              >
                <DownIcon />
              </ListItem>
            </List>
          </>
        )}

        {selectedSetting === "general" && (
          <List>
            <ListItem
              icon={<GeneralIcon />}
              title={Locale.Settings.GeneralSettings}
              onClick={() => toggleSetting("general")}
            >
              <UpIcon />
            </ListItem>
          </List>
        )}
        {selectedSetting === "general" && <GeneralSettings />}

        {selectedSetting === "voice" && (
          <List>
            <ListItem
              icon={<HeadphoneIcon />}
              title={Locale.Settings.VoiceSettings}
              onClick={() => toggleSetting("voice")}
            >
              <UpIcon />
            </ListItem>
          </List>
        )}
        {selectedSetting === "voice" && <VoiceSettings />}

        {selectedSetting === "password" && (
          <List>
            <ListItem
              icon={<PasswordIcon />}
              title={Locale.Settings.PasswordSettings}
              onClick={() => toggleSetting("password")}
            >
              <UpIcon />
            </ListItem>
          </List>
        )}
        {selectedSetting === "password" && <PasswordSettings />}

        {selectedSetting === "model" && (
          <List>
            <ListItem
              icon={<ModelIcon />}
              title={Locale.Settings.ModelSettings}
              onClick={() => toggleSetting("model")}
            >
              <UpIcon />
            </ListItem>
          </List>
        )}
        {selectedSetting === "model" && <ModelSettings />}

        {selectedSetting === "prompt" && (
          <List>
            <ListItem
              icon={<PromptIcon />}
              title={Locale.Settings.PromptSettings}
              onClick={() => toggleSetting("prompt")}
            >
              <UpIcon />
            </ListItem>
          </List>
        )}
        {selectedSetting === "prompt" && <PromptSettings />}

        {selectedSetting === "mask" && (
          <List>
            <ListItem
              icon={<MaskIcon />}
              title={Locale.Settings.MaskSettings}
              onClick={() => toggleSetting("mask")}
            >
              <UpIcon />
            </ListItem>
          </List>
        )}
        {selectedSetting === "mask" && <MaskSettings />}

        {selectedSetting === "sync" && (
          <List>
            <ListItem
              icon={<DataIcon />}
              title={Locale.Settings.DataSettings}
              onClick={() => toggleSetting("sync")}
            >
              <UpIcon />
            </ListItem>
          </List>
        )}
        {selectedSetting === "sync" && <SyncSettings />}

        {selectedSetting === "proxy" && (
          <List>
            <ListItem
              icon={<ProxyIcon />}
              title={Locale.Settings.ProxySettings}
              onClick={() => toggleSetting("proxy")}
            >
              <UpIcon />
            </ListItem>
          </List>
        )}
        {selectedSetting === "proxy" && <ProxySettings />}
      </div>
    </ErrorBoundary>
  );
}
