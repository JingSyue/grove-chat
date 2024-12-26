<div align="center">

<a href='#企業版'>
  <img src="./docs/images/ent.svg" alt="icon"/>
</a>

<h1 align="center">NextChat</h1>

一鍵免費部署你的私人 ChatGPT 網頁應用，支持 GPT3、GPT4 和 Gemini Pro 模型。

[GroveChat](https://nextchat.dev/chat?utm_source=readme) / [企業版](#%E4%BC%81%E4%B8%9A%E7%89%88) / [演示 Demo](https://chat-gpt-next-web.vercel.app/) / [反饋 Issues](https://github.com/Yidadaa/ChatGPT-Next-Web/issues) / [加入 Discord](https://discord.gg/zrhvHCr79N)

[<img src="https://vercel.com/button" alt="Deploy on Zeabur" height="30">](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FChatGPTNextWeb%2FChatGPT-Next-Web&env=OPENAI_API_KEY&env=CODE&project-name=nextchat&repository-name=NextChat) [<img src="https://zeabur.com/button.svg" alt="Deploy on Zeabur" height="30">](https://zeabur.com/templates/ZBUEFA) [<img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" height="30">](https://gitpod.io/#https://github.com/Yidadaa/ChatGPT-Next-Web)

</div>

## 企業版

滿足您公司私有化部署和定制需求

- **品牌定制**：企業量身定制 VI/UI，與企業品牌形象無縫契合
- **資源集成**：由企業管理人員統一配置和管理數十種 AI 資源，團隊成員開箱即用
- **權限管理**：成員權限、資源權限、知識庫權限層級分明，企業級 Admin Panel 統一控制
- **知識接入**：企業內部知識庫與 AI 能力相結合，比通用 AI 更貼近企業自身業務需求
- **安全審計**：自動攔截敏感提問，支持追溯全部歷史對話記錄，讓 AI 也能遵循企業信息安全規範
- **私有部署**：企業級私有部署，支持各類主流私有雲部署，確保數據安全和隱私保護
- **持續更新**：提供多模態、智能體等前沿能力持續更新升級服務，常用常新、持續先進

企業版諮詢: **business@nextchat.dev**

<img width="300" src="https://github.com/user-attachments/assets/3daeb7b6-ab63-4542-9141-2e4a12c80601">

## 開始使用

1. 準備好你的 [OpenAI API Key](https://platform.openai.com/account/api-keys);
2. 點擊右側按鈕開始部署：
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FYidadaa%2FChatGPT-Next-Web&env=OPENAI_API_KEY&env=CODE&env=GOOGLE_API_KEY&project-name=chatgpt-next-web&repository-name=ChatGPT-Next-Web)，直接使用 GitHub 賬號登錄即可，記得在環境變量頁填入 API Key 和[頁面訪問密碼](#配置頁面訪問密碼) CODE；
3. 部署完畢後，即可開始使用；
4. （可選）[綁定自定義域名](https://vercel.com/docs/concepts/projects/domains/add-a-domain)：Vercel 分配的域名 DNS 在某些區域被污染了，綁定自定義域名即可直連。

<div align="center">
   
![主界面](./docs/images/cover.png)

</div>

## 保持更新

如果你按照上述步驟一鍵部署了自己的項目，可能會發現總是提示“存在更新”的問題，這是由於 Vercel 會默認為你創建一個新項目而不是 fork 本項目，這會導致無法正確地檢測更新。  
推薦你按照下列步驟重新部署：

- 刪掉原先的倉庫；
- 使用頁面右上角的 fork 按鈕，fork 本項目；
- 在 Vercel 重新選擇並部署，[請查看詳細教程](./docs/vercel-cn.md#如何新建項目)。

### 打開自動更新

> 如果你遇到了 Upstream Sync 執行錯誤，請[手動 Sync Fork 一次](./README_CN.md#手動更新代碼)！

當你 fork 項目之後，由於 GitHub 的限制，需要手動去你 fork 後的項目的 Actions 頁面啟用 Workflows，並啟用 Upstream Sync Action，啟用之後即可開啟每小時定時自動更新：

![自動更新](./docs/images/enable-actions.jpg)

![啟用自動更新](./docs/images/enable-actions-sync.jpg)

### 手動更新代碼

如果你想讓手動立即更新，可以查看 [GitHub 的文檔](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) 了解如何讓 fork 的項目與上游代碼同步。

你可以 star/watch 本項目或者 follow 作者來及時獲得新功能更新通知。

## 配置頁面訪問密碼

> 配置密碼後，用戶需要在設置頁手動填寫訪問碼才可以正常聊天，否則會通過消息提示未授權狀態。

> **警告**：請務必將密碼的位數設置得足夠長，最好 7 位以上，否則[會被爆破](https://github.com/Yidadaa/ChatGPT-Next-Web/issues/518)。

本項目提供有限的權限控制功能，請在 Vercel 項目控制面板的環境變量頁增加名為 `CODE` 的環境變量，值為用英文逗號分隔的自定義密碼：

```
code1,code2,code3
```

增加或修改該環境變量後，請**重新部署**項目使改動生效。

## 環境變量

> 本項目大多數配置項都通過環境變量來設置，教程：[如何修改 Vercel 環境變量](./docs/vercel-cn.md)。

### `OPENAI_API_KEY` （必填項）

OpenAI 密鑰，你在 openai 賬戶頁面申請的 api key，使用英文逗號隔開多個 key，這樣可以隨機輪詢這些 key。

### `CODE` （可選）

訪問密碼，可選，可以使用逗號隔開多個密碼。

**警告**：如果不填寫此項，則任何人都可以直接使用你部署後的網站，可能會導致你的 token 被急速消耗完畢，建議填寫此選項。

### `BASE_URL` （可選）

> 默認: `https://api.openai.com`

> 示例: `http://your-openai-proxy.com`

OpenAI 接口代理 URL，如果你手動配置了 openai 接口代理，請填寫此選項。

> 如果遇到 ssl 證書問題，請將 `BASE_URL` 的協議設置為 http。

### `OPENAI_ORG_ID` （可選）

指定 OpenAI 中的組織 ID。

### `AZURE_URL` （可選）

> 形如：https://{azure-resource-url}/openai

Azure 部署地址。

### `AZURE_API_KEY` （可選）

Azure 密鑰。

### `AZURE_API_VERSION` （可選）

Azure Api 版本，你可以在這裡找到：[Azure 文檔](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#chat-completions)。

### `GOOGLE_API_KEY` (可選)

Google Gemini Pro 密鑰。

### `GOOGLE_URL` (可選)

Google Gemini Pro Api Url。

### `ANTHROPIC_API_KEY` (可選)

Anthropic Claude Api Key。

### `ANTHROPIC_API_VERSION` (可選)

Anthropic Claude Api 版本。

### `ANTHROPIC_URL` (可選)

Anthropic Claude Api Url。

### `BAIDU_API_KEY` (可選)

Baidu Api Key。

### `BAIDU_SECRET_KEY` (可選)

Baidu Secret Key。

### `BAIDU_URL` (可選)

Baidu Api Url。

### `BYTEDANCE_API_KEY` (可選)

ByteDance Api Key。

### `BYTEDANCE_URL` (可選)

ByteDance Api Url。

### `ALIBABA_API_KEY` (可選)

阿里雲（千問）Api Key。

### `ALIBABA_URL` (可選)

阿里雲（千問）Api Url。

### `IFLYTEK_URL` (可選)

訊飛星火 Api Url。

### `IFLYTEK_API_KEY` (可選)

訊飛星火 Api Key。

### `IFLYTEK_API_SECRET` (可選)

訊飛星火 Api Secret。

### `CHATGLM_API_KEY` (可選)

ChatGLM Api Key。

### `CHATGLM_URL` (可選)

ChatGLM Api Url。

### `HIDE_USER_API_KEY` （可選）

如果你不想讓用戶自行填入 API Key，將此環境變量設置為 1 即可。

### `DISABLE_GPT4` （可選）

如果你不想讓用戶使用 GPT-4，將此環境變量設置為 1 即可。

### `ENABLE_BALANCE_QUERY` （可選）

如果你想啟用餘額查詢功能，將此環境變量設置為 1 即可。

### `DISABLE_FAST_LINK` （可選）

如果你想禁用從鏈接解析預製設置，將此環境變量設置為 1 即可。

### `WHITE_WEBDAV_ENDPOINTS` (可選)

如果你想增加允許訪問的 WebDAV 服務地址，可以使用該選項，格式要求：

- 每一個地址必須是一個完整的 endpoint
  > `https://xxxx/xxx`
- 多個地址以`,`相連

### `CUSTOM_MODELS` （可選）

> 示例：`+qwen-7b-chat,+glm-6b,-gpt-3.5-turbo,gpt-4-1106-preview=gpt-4-turbo` 表示增加 `qwen-7b-chat` 和 `glm-6b` 到模型列表，而從列表中刪除 `gpt-3.5-turbo`，並將 `gpt-4-1106-preview` 模型名字展示為 `gpt-4-turbo`。  
> 如果你想先禁用所有模型，再啟用指定模型，可以使用 `-all,+gpt-3.5-turbo`，則表示僅啟用 `gpt-3.5-turbo`。

用來控制模型列表，使用 `+` 增加一個模型，使用 `-` 來隱藏一個模型，使用 `模型名=展示名` 來自定義模型的展示名，用英文逗號隔開。

在 Azure 的模式下，支持使用 `modelName@Azure=deploymentName` 的方式配置模型名稱和部署名稱（deploy-name）。

> 示例：`+gpt-3.5-turbo@Azure=gpt35` 這個配置會在模型列表顯示一個 `gpt35(Azure)` 的選項。  
> 如果你只能使用 Azure 模式，那麼設置 `-all,+gpt-3.5-turbo@Azure=gpt35` 則可以讓對話的默認使用 `gpt35(Azure)`。

在 ByteDance 的模式下，支持使用 `modelName@bytedance=deploymentName` 的方式配置模型名稱和部署名稱（deploy-name）。

> 示例: `+Doubao-lite-4k@bytedance=ep-xxxxx-xxx` 這個配置會在模型列表顯示一個 `Doubao-lite-4k(ByteDance)` 的選項。

### `DEFAULT_MODEL` （可選）

更改默認模型。

### `DEFAULT_INPUT_TEMPLATE` （可選）

自定義默認的 template，用於初始化『設置』中的『用戶輸入預處理』配置項。

### `STABILITY_API_KEY` (可選)

Stability API 密鑰。

### `STABILITY_URL` (可選)

自定義的 Stability API 請求地址。

## 開發

點擊下方按鈕，開始二次開發：

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Yidadaa/ChatGPT-Next-Web)

在開始寫代碼之前，需要在項目根目錄新建一個 `.env.local` 文件，裡面填入環境變量：

```
OPENAI_API_KEY=<your api key here>

# 中國大陸用戶，可以使用本項目自帶的代理進行開發，你也可以自由選擇其他代理地址
BASE_URL=https://b.nextweb.fun/api/proxy
```

### 本地開發

1. 安裝 Node.js 18 和 Yarn，具體細節請詢問 ChatGPT；
2. 執行 `yarn install && yarn dev` 即可。⚠️ 注意：此命令僅用於本地開發，不要用於部署！
3. 如果你想本地部署，請使用 `yarn install && yarn build && yarn start` 命令，你可以配合 pm2 來守護進程，防止被殺死，詳情詢問 ChatGPT。

## 部署

### 寶塔面板部署

> [簡體中文 > 如何通過寶塔一鍵部署](./docs/bt-cn.md)

### 容器部署 （推薦）

> Docker 版本需要在 20 及其以上，否則會提示找不到鏡像。

> ⚠️ 注意：Docker 版本在大多數時間都會落後最新的版本 1 到 2 天，所以部署後會持續出現“存在更新”的提示，屬於正常現象。

```shell
docker pull yidadaa/chatgpt-next-web

docker run -d -p 3000:3000 \
   -e OPENAI_API_KEY=sk-xxxx \
   -e CODE=頁面訪問密碼 \
   yidadaa/chatgpt-next-web
```

你也可以指定 proxy：

```shell
docker run -d -p 3000:3000 \
   -e OPENAI_API_KEY=sk-xxxx \
   -e CODE=頁面訪問密碼 \
   --net=host \
   -e PROXY_URL=http://127.0.0.1:7890 \
   yidadaa/chatgpt-next-web
```

如果你的本地代理需要帳號密碼，可以使用：

```shell
-e PROXY_URL="http://127.0.0.1:7890 user password"
```

如果你需要指定其他環境變量，請自行在上述命令中增加 `-e 環境變量=環境變量值` 來指定。

### 本地部署

在控制台運行下方命令：

```shell
bash <(curl -s https://raw.githubusercontent.com/Yidadaa/ChatGPT-Next-Web/main/scripts/setup.sh)
```

⚠️ 注意：如果你安裝過程中遇到了問題，請使用 Docker 部署。

## 鳴謝

### 捐贈者

### 貢獻者

[見項目貢獻者列表](https://github.com/Yidadaa/ChatGPT-Next-Web/graphs/contributors)

### 相關項目

- [one-api](https://github.com/songquanpeng/one-api): 一站式大模型額度管理平台，支持市面上所有主流大語言模型。


## 開源協議

[MIT](https://opensource.org/license/mit/)

--- 

如果需要進一步的修改或其他內容，請告訴我！