<div align="center">

[English](./README.en.md)\|[Simplified Chinese](./README.zh-CN.md)\|[Arabic](./README.ar.md)\|[French](./README.fr.md)\|[Japanese](./README.ja.md)

</div>
<div align="center">
  <h1>GroveChat</h1>
  <a href='#企業版'>
    <img src="./docs/images/ent.svg" alt="icon" style="margin: 20px 0;"/>
  </a>

  <p>一鍵免費部署你的私人 ChatGPT 網頁應用，支持 GPT3、GPT4 和 Gemini Pro 模型。</p>

  <p>
    <a href="https://grove-chat.vercel.app">GroveChat</a> / 
    <a href="https://grove-chat.vercel.app">企業版</a> / 
    <a href="https://grove-chat.vercel.app">演示 Demo</a> / 
    <a href="https://github.com/robbiedood/grove-chat/issues">反饋 Issues</a>
  </p>

  <a href="https://vercel.com/new/clone?repository-url=https://github.com/robbiedood/grove-chat&env=OPENAI_API_KEY&env=CLERK_SECRET_KEY&env=CLERK_WEBHOOK_SECRET&env=NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY&project-name=grove-chat&repository-name=grove-chat">
    <img src="https://vercel.com/button" alt="Deploy on vercel" height="30" style="margin: 20px 0;"/>
  </a>
</div>

## Table of contents

-   [Enterprise Edition](#企業版)
-   [Functional Features](#功能特點)
-   [Get started](#開始使用)
-   [Configure page access password](#配置頁面訪問密碼)
-   [Environment variables](#環境變量)
-   [User model settings](#用戶模型設置)
-   [Local development](#開發)
-   [screenshot](#截圖)
-   [Related projects](#相關項目)
-   [Open Source Protocol](#開源協議)
-   [Change description](./CHANGELOG.md)

## Enterprise Edition

Meet your company's privatization deployment and customization needs

-   **Brand customization**: Customized VI/UI for enterprises, seamlessly fits the corporate brand image
-   **Resource integration**: Enterprise managers uniformly configure and manage dozens of AI resources, and team members can use it out of the box
-   **Permission Management**: Member permissions, resource permissions, and knowledge base permissions are clearly defined, and enterprise-level Admin Panel unified control
-   **Knowledge access**: The internal knowledge base of the enterprise is combined with AI capabilities, which is closer to the enterprise's own business needs than general AI
-   **Security Audit**: Automatically intercept sensitive questions, support tracing all historical dialogue records, so that AI can also follow enterprise information security specifications
-   **Private deployment**: Enterprise-level private deployment, supporting various mainstream private cloud deployments, ensuring data security and privacy protection
-   **Continuous update**: Provide services for continuous update and upgrade of cutting-edge capabilities such as multimodal and agents, and are always new and continuously advanced.

Enterprise Edition Consultation:**empty**

<img width="300" src="">

## Functional Features

-   Deployment on Vercel for free in less than 1 minute
-   Lite client (approximately 5MB) for Linux/Windows/MacOS, download now
-   Fully compatible with self-deployed LLM, it is recommended to use it with RWKV-Runner or LocalAI
-   Privacy is preferred, all data is stored in a local browser
-   Support Markdown: LaTex, mermaid, code highlighting, etc.
-   Responsive design, support for dark mode and PWA
-   The first screen loads fast (approximately 100kb), supports streaming response
-   v2 new features: Create, share and debug your chat tools using prompt templates (masks)
-   Automatically compress chat history to support long conversations while saving your tokens
-   Multilingual support: English, Simplified Chinese, Traditional Chinese, Japanese, French, Spanish, Italian, Turkish, German, Vietnamese, Russian, Czech, Korean, Indonesian

## Get started

1.  Get yours ready[Openai API Key](https://platform.openai.com/account/api-keys);
2.  Use Clerk as user permission management[Clerk official website](https://clerk.com/)[Configuration File](#配置頁面訪問密碼)
3.  Click the button on the right to start deployment:[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/robbiedood/grove-chat&env=OPENAI_API_KEY&env=CLERK_SECRET_KEY&env=CLERK_WEBHOOK_SECRET&env=NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY&project-name=grove-chat&repository-name=grove-chat), just use the GitHub account to log in, remember to fill in the API Key and[User permission management](#配置訪問權限Clerk)Clerk；
4.  After the deployment is completed, you can start using it;
5.  (Optional)[Bind custom domain name](https://vercel.com/docs/concepts/projects/domains/add-a-domain): Vercel-assigned domain name DNS is polluted in some areas, so you can directly connect to the custom domain name by binding it.

<div align="center">
   
![主界面](./docs/images/mask.png)

</div>

## Configure page access password

> This project has deprecated the CODE environment variables of the original project NextChat and used the Clerk management page to access the password.
>
> ### Step 1: Register a Clerk account
>
> Go[Clerk official website](https://clerk.com/), register an account and log in. After logging in, click**Create Application**(Build an application).

<img src="./docs/images/clerk/clerk1.png" alt="create application" style="max-width: 100%; height: auto; margin: 20px 0;"/>

### Step 2: Select the login option

Enable**Email**(necessary) and**Google**(Select) option, as shown in the figure below.

<img src="./docs/images/clerk/clerk2.png" alt="options" style="max-width: 100%; height: auto; margin: 20px 0;"/>

### Step 3: Obtain the API Key

Find yours`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`and`CLERK_SECRET_KEY`. Add them to`.env`In the archive, as shown below:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=你的公開金鑰
CLERK_SECRET_KEY=你的密鑰
```

<img src="./docs/images/clerk/clerk3.png" alt="key" style="max-width: 100%; height: auto; margin: 20px 0;"/>

### Step 4: Configure email and password

Go**Configure > Email, phone, username**(Configuration > Email, Phone, User Name), make sure to enable**Email**(e-mail),**Password**（密碼）和 **Email verification code**(Email verification code).

<img src="./docs/images/clerk/clerk4.png" alt="options" style="max-width: 100%; height: auto; margin: 20px 0;"/>

### Step 5: Configure Roles and Permissions

Set roles and permissions as shown in the figure below:

<img src="./docs/images/clerk/clerk5.png" alt="roles" style="max-width: 100%; height: auto; margin: 20px 0;"/>

### Step 6: General Settings

Go**Configure > Settings**(Configuration > Settings), and set the options as shown in the figure below:

<img src="./docs/images/clerk/clerk6.png" alt="settings" style="max-width: 100%; height: auto; margin: 20px 0;"/>

### Step 7: Configure Webhook

Set the webhook endpoint to your listening URL. Click**Signing Secret**(Signature Key) View your`CLERK_WEBHOOK_SECRET`and add it to`.env`In the file:

```env
CLERK_WEBHOOK_SECRET=你的webhook密鑰
```

<img src="./docs/images/clerk/clerk7.png" alt="settings" style="max-width: 100%; height: auto; margin: 20px 0;"/>

### Step 8: Create a user

Create a user account as needed.

<img src="./docs/images/clerk/clerk8.png" alt="settings" style="max-width: 100%; height: auto; margin: 20px 0;"/>

### Step 9: Build an Organization

Create an organization and add a developer's email address. Set their roles to**Teacher**(teacher).<img src="./docs/images/clerk/clerk9.png" alt="settings" style="max-width: 100%; height: auto; margin: 20px 0;"/>

## Manage multi-administrator Grove applications

### Step 1: Build an organization

Click on the upper left corner**Create Organization**(Build an organization).<img src="./docs/images/clerk/clerk10.png" alt="settings" style="max-width: 100%; height: auto; margin: 20px 0;"/>

### Step 2: Transfer ownership

Go**Configure > Settings**(Configuration > Settings), click**Transfer Ownership**(Transfer of ownership). Set the new owner to the organization you just built.

<img src="./docs/images/clerk/clerk11.png" alt="settings" style="max-width: 100%; height: auto; margin: 20px 0;"/>

### Step 3: Add other users

Click on the upper left corner**Manage**(Management) to add other users and grant them administrative access rights.<img src="./docs/images/clerk/clerk12.png" alt="settings" style="max-width: 100%; height: auto; margin: 20px 0;"/><img src="./docs/images/clerk/clerk13.png" alt="settings" style="max-width: 100%; height: auto; margin: 20px 0;"/>

<img src="./docs/images/login.png" alt="用戶登入" style="width: 800px;"/>

<img src="./docs/images/clerkorg.png" alt="權限管理" style="width: 800px;"/>

## Environment variables

> Most configuration items in this project are set through environment variables. Tutorial:[How to modify Vercel environment variables](./docs/vercel-cn.md)。

### `OPENAI_API_KEY`(Required)

OpenAI 密鑰，你在 openai 賬戶頁面申請的 api key，使用英文逗號隔開多個 key，這樣可以隨機輪詢這些 key。

### `CLERK_SECRET_KEY`(Required)

Clerk User Management

### `CLERK_WEBHOOK_SECRET`(Required)

Clerk User Management

### `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`(Required)

Clerk User Management

### `BASE_URL`(Optional)

> default:`https://api.openai.com`

> Example:`http://your-openai-proxy.com`

OpenAI interface proxy URL, if you manually configure the openai interface proxy, please fill in this option.

> If you encounter ssl certificate problems, please turn`BASE_URL`The protocol is set to http.

### `OPENAI_ORG_ID`(Optional)

Specifies the organization ID in OpenAI.

### `AZURE_URL`(Optional)

> For example: https&#x3A;//{azure-resource-url}/openai

Azure deployment address.

### `AZURE_API_KEY`(Optional)

Azure key.

### `AZURE_API_VERSION`(Optional)

Azure Api version, you can find it here:[Azure Documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#chat-completions)。

### `GOOGLE_API_KEY`(Optional)

Google Gemini Pro Key.

### `GOOGLE_URL`(Optional)

Google Gemini Pro Api Url。

### `ANTHROPIC_API_KEY`(Optional)

Anthropic Claude Api Key。

### `ANTHROPIC_API_VERSION`(Optional)

Anthropic Claude Api version.

### `ANTHROPIC_URL`(Optional)

Anthropic Claude Api Url。

### `BAIDU_API_KEY`(Optional)

Baidu API Key。

### `BAIDU_SECRET_KEY`(Optional)

Baidu Secret Key。

### `BAIDU_URL`(Optional)

Baidu API URL。

### `BYTEDANCE_API_KEY`(Optional)

ByteDance Api Key。

### `BYTEDANCE_URL`(Optional)

ByteDance Api Url。

### `ALIBABA_API_KEY`(Optional)

Alibaba Cloud (Qianwen) Api Key.

### `ALIBABA_URL`(Optional)

Alibaba Cloud (Qianqu) Api Url.

### `IFLYTEK_URL`(Optional)

iFLYTEK Api Url.

### `IFLYTEK_API_KEY`(Optional)

iFLYTEK Api Key.

### `IFLYTEK_API_SECRET`(Optional)

iFLYTEK Api Secret.

### `CHATGLM_API_KEY`(Optional)

ChatGLM Api Key。

### `CHATGLM_URL`(Optional)

ChatGLM Api Url。

### `XAI_API_KEY`(Optional)

XAI Api Key。

### `XAI_URL`(Optional)

XAI Api Url。

### `PERPLEXITY_API_KEY`(Optional)

PERPLEXITY Api Key。

### `PERPLEXITY_URL`(Optional)

PERPLEXITY Api Url。

### `MOONSHOT_API_KEY`(Optional)

MOONSHOT Api Key。

### `MOONSHOT_URL`(Optional)

MOONSHOT Api Url

### `HIDE_USER_API_KEY`(Optional)

If you don't want the user to fill in the API Key, set this environment variable to 1.

### `DISABLE_GPT4`(Optional)

If you don't want users to use GPT-4, just set this environment variable to 1.

### `ENABLE_BALANCE_QUERY`(Optional)

If you want to enable balance query, set this environment variable to 1.

### `DISABLE_FAST_LINK`(Optional)

If you want to disable parsing prefabricated settings from links, set this environment variable to 1.

### `WHITE_WEBDAV_ENDPOINTS`(Optional)

If you want to add the WebDAV service address that is allowed to access, you can use this option, format requirements:

-   Each address must be a complete endpoint
    > `https://xxxx/xxx`
-   Multiple addresses to`,`Connected

### `CUSTOM_MODELS`(Optional)

> Example:`+qwen-7b-chat,+glm-6b,-gpt-3.5-turbo,gpt-4-1106-preview=gpt-4-turbo`Indicates an increase`qwen-7b-chat`and`glm-6b`to the model list and delete from the list`gpt-3.5-turbo`and will`gpt-4-1106-preview`The model name is displayed as`gpt-4-turbo`。  
> If you want to disable all models first and then enable the specified model, you can use`-all,+gpt-3.5-turbo`, it means only enabled`gpt-3.5-turbo`。

Used to control the model list, use`+`Add a model to use`-`To hide a model, use`模型名=展示名`Customize the presentation name of the model, separated by English commas.

In Azure mode, it is supported`modelName@Azure=deploymentName`configurable model name and deployment name (deploy-name) in the way.

> Example:`+gpt-3.5-turbo@Azure=gpt35`This configuration will display a`gpt35(Azure)`option.  
> If you can only use Azure mode, then set it`-all,+gpt-3.5-turbo@Azure=gpt35`This allows the default usage of the conversation`gpt35(Azure)`。

In ByteDance mode, it is supported to use it`modelName@bytedance=deploymentName`configurable model name and deployment name (deploy-name) in the way.

> Example:`+Doubao-lite-4k@bytedance=ep-xxxxx-xxx`This configuration will display a`Doubao-lite-4k(ByteDance)`option.

### `DEFAULT_MODEL`(Optional)

Change the default model.

### `DEFAULT_INPUT_TEMPLATE`(Optional)

Customize the default template to initialize the "User Input Preprocessing" configuration item in "Settings".

### `STABILITY_API_KEY`(Optional)

Stability API key.

### `STABILITY_URL`(Optional)

Custom Stability API request address.

## User model settings

login

> The API Key set by the system can be used according to the highest user permissions.

Not logged in

> If you are not logged in, you can fill in your own API key in the proxy settings and use the guest model.

User role after login

> guest

Role permissions can be changed in Clerk dashboard

> [Clerk configuration teaching](#配置頁面訪問密碼)

After configuring Clerk, the teacher permissions can directly manage the organization and invite members to further control the accessible models in Grove Chat settings page.

### Added model

[Program code file](./app/constant.ts)

Find the model vendor to add a new model

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
      "gpt-4o-2024-11-20",
      "chatgpt-4o-latest",
      "gpt-4o-mini",
      "gpt-4o-mini-2024-07-18",
      "gpt-4-vision-preview",
      "gpt-4-turbo-2024-04-09",
      "gpt-4-1106-preview",
      "dall-e-3",
      "o1-mini",
      "o1-preview",
    ];

Manage access permissions (must be in the model list of model suppliers)

      teacher: [
        "o1-mini",
        "o1-preview",
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
        "grok-2-1212",
        "grok-2-vision-1212",
      ],

## Development

Mainland Chinese users can use the agents that come with this project for development, and you can also freely choose other agent addresses.
BASE_URL=<https://b.nextweb.fun/api/proxy>

### Local development

1.  Create a new one in the project root directory`.env.local`File, fill in environment variables:


    OPENAI_API_KEY=<your key here>
    CLERK_SECRET_KEY=<your key here>
    CLERK_WEBHOOK_SECRET=<your key here>
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your key here>

2.  Install Node.js 18 and Yarn. For details, please ask ChatGPT;
3.  implement`yarn install && yarn dev`Just do it. ⚠️ Note: This command is only used for local development and not for deployment!
4.  If you want to deploy locally, please use`yarn install && yarn build && yarn start`Command, you can cooperate with pm2 to daemon to prevent being killed, ask ChatGPT for details.

### Container deployment

> Docker version needs to be 20 or above, otherwise the image will not be found.

> ⚠️ Note: Docker version will lag behind the latest version by 1 to 2 days most of the time, so the prompt "existence update" will continue to appear after deployment, which is normal.

```shell
docker pull robbiedood/grove-chat

docker run -d -p 3000:3000 \
   -e OPENAI_API_KEY=sk-xxxx \
   -e CLERK_SECRET_KEY=<your key here> \
   -e CLERK_WEBHOOK_SECRET=<your key here> \
   -e NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your key here> \
   robbiedood/grove-chat
```

You can also specify proxy:

```shell
docker run -d -p 3000:3000 \
   -e OPENAI_API_KEY=sk-xxxx \
   -e CLERK_SECRET_KEY=<your key here> \
   -e CLERK_WEBHOOK_SECRET=<your key here> \
   -e NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your key here> \
   --net=host \
   -e PROXY_URL=http://127.0.0.1:7890 \
   robbiedood/grove-chat
```

If your local agent needs an account password, you can use:

```shell
-e PROXY_URL="http://127.0.0.1:7890 user password"
```

If you need to specify other environment variables, please add them to the above command`-e 環境變量=環境變量值`To specify.

### Local deployment

Run the following command in the console:

```shell
bash <(curl -s https://raw.githubusercontent.com/robbiedood/grove-chat/main/scripts/setup.sh)
```

⚠️ Note: If you encounter problems during the installation process, please use Docker to deploy.

## screenshot

<div style="display: flex; gap: 20px;">
  <img src="./docs/images/settings.png" alt="設定" style="width: 800px;"/>
</div>

### Related projects

-   [ChatGPT-Next-Web](https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web):
    One-stop big model platform, supporting all mainstream big language models on the market.

-   [one-api](https://github.com/songquanpeng/one-api): One-stop large-model quota management platform, supporting all mainstream large-language models on the market.

-   [Mr.-Ranedeer-AI-Tutor](https://github.com/JushBJJ/Mr.-Ranedeer-AI-Tutor): Ai-tutor

## Open Source Protocol

[WITH](https://opensource.org/license/mit/)
