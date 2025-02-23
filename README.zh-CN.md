<div align="center">

[英语](./README.en.md)\|[简体中文](./README.zh-CN.md)\|[阿拉伯](./README.ar.md)\|[法语](./README.fr.md)\|[日本人](./README.ja.md)

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

## 目录

-   [企业版](#企業版)
-   [功能特点](#功能特點)
-   [开始使用](#開始使用)
-   [配置页面访问密码](#配置頁面訪問密碼)
-   [环境变量](#環境變量)
-   [用户模型设置](#用戶模型設置)
-   [本地开发](#開發)
-   [截图](#截圖)
-   [相关项目](#相關項目)
-   [开源协议](#開源協議)
-   [变更说明](./CHANGELOG.md)

## 企业版

满足您公司私有化部署和定制需求

-   **品牌定制**：企业量身定制 VI/UI，与企业品牌形象无缝契合
-   **资源集成**：由企业管理人员统一配置和管理数十种 AI 资源，团队成员开箱即用
-   **权限管理**：成员权限、资源权限、知识库权限层级分明，企业级 Admin Panel 统一控制
-   **知识接入**：企业内部知识库与 AI 能力相结合，比通用 AI 更贴近企业自身业务需求
-   **安全审计**：自动拦截敏感提问，支持追溯全部历史对话记录，让 AI 也能遵循企业信息安全规范
-   **私有部署**：企业级私有部署，支持各类主流私有云部署，确保数据安全和隐私保护
-   **持续更新**：提供多模态、智能体等前沿能力持续更新升级服务，常用常新、持续先进

企业版咨询:**空的**

<img width="300" src="">

## 功能特点

-   在 Vercel 上一键免费部署，仅需不到 1 分钟
-   精简的客户端（约 5MB），适用于 Linux/Windows/MacOS，立即下载
-   完全兼容自部署的 LLM，建议搭配 RWKV-Runner 或 LocalAI 使用
-   隐私优先，所有数据均存储在本地浏览器中
-   支持 Markdown：LaTex、mermaid、代码高亮等
-   响应式设计，支持深色模式和 PWA
-   首屏加载速度快（约 100kb），支持流式响应
-   v2 新功能：使用提示模板（mask）创建、分享和调试你的聊天工具
-   自动压缩聊天记录，以支持长对话，同时节省你的 token
-   多语言支持：英语、简体中文、繁体中文、日语、法语、西班牙语、意大利语、土耳其语、德语、越南语、俄语、捷克语、韩语、印尼语

## 开始使用

1.  准备好你的[OpenAI API键](https://platform.openai.com/account/api-keys);
2.  使用Clerk作为用户权限管理[Clerk官网](https://clerk.com/)[配置文件](#配置頁面訪問密碼)
3.  点击右侧按钮开始部署：[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/robbiedood/grove-chat&env=OPENAI_API_KEY&env=CLERK_SECRET_KEY&env=CLERK_WEBHOOK_SECRET&env=NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY&project-name=grove-chat&repository-name=grove-chat)，直接使用 GitHub 账号登录即可，记得在环境变量页填入 API Key 和[用户权限管理](#配置訪問權限Clerk)店员；
4.  部署完毕后，即可开始使用；
5.  （可选）[绑定自定义域名](https://vercel.com/docs/concepts/projects/domains/add-a-domain)：Vercel 分配的域名 DNS 在某些区域被污染了，绑定自定义域名即可直连。

<div align="center">
   
![主界面](./docs/images/mask.png)

</div>

## 配置页面访问密码

> 本项目已弃用原专案NextChat的CODE环境变数，并使用Clerk管理页面访问密码。
>
> ### 步骤 1：注册 Clerk 帐号
>
> 前往[Clerk 官网](https://clerk.com/)，注册帐号并登入。登入后，点击**创建应用程序**（建立应用程式）。

<img src="./docs/images/clerk/clerk1.png" alt="create application" style="max-width: 100%; height: auto; margin: 20px 0;"/>

### 步骤 2：选择登入选项

启用**电子邮件**（必要）和**谷歌**（选用）选项，如下图所示。

<img src="./docs/images/clerk/clerk2.png" alt="options" style="max-width: 100%; height: auto; margin: 20px 0;"/>

### 步骤 3：取得 API 金钥

找到你的`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`和`CLERK_SECRET_KEY`。将它们添加到`.env`档案中，如下所示：

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=你的公開金鑰
CLERK_SECRET_KEY=你的密鑰
```

<img src="./docs/images/clerk/clerk3.png" alt="key" style="max-width: 100%; height: auto; margin: 20px 0;"/>

### 步骤 4：配置电子邮件和密码

前往**配置>电子邮件，电话，用户名**（配置 > 电子邮件、电话、使用者名称），确保启用了**电子邮件**（电子邮件）、**密码**（密码）和**电子邮件验证代码**（电子邮件验证码）。

<img src="./docs/images/clerk/clerk4.png" alt="options" style="max-width: 100%; height: auto; margin: 20px 0;"/>

### 步骤 5：配置角色和权限

按照下图所示设置角色和权限：

<img src="./docs/images/clerk/clerk5.png" alt="roles" style="max-width: 100%; height: auto; margin: 20px 0;"/>

### 步骤 6：一般设定

前往**配置>设置**（配置 > 设定），并按照下图所示设置选项：

<img src="./docs/images/clerk/clerk6.png" alt="settings" style="max-width: 100%; height: auto; margin: 20px 0;"/>

### 步骤 7：配置 Webhook

将 webhook 端点设置为你的监听 URL。点击**签名秘密**（签名密钥）查看你的`CLERK_WEBHOOK_SECRET`，并将其添加到`.env`档案中：

```env
CLERK_WEBHOOK_SECRET=你的webhook密鑰
```

<img src="./docs/images/clerk/clerk7.png" alt="settings" style="max-width: 100%; height: auto; margin: 20px 0;"/>

### 步骤 8：建立使用者

根据需要建立使用者帐号。

<img src="./docs/images/clerk/clerk8.png" alt="settings" style="max-width: 100%; height: auto; margin: 20px 0;"/>

### 步骤 9：建立组织

建立组织并添加开发人员的电子邮件地址。将他们的角色设置为**老师**（教师）。<img src="./docs/images/clerk/clerk9.png" alt="settings" style="max-width: 100%; height: auto; margin: 20px 0;"/>

## 管理多管理员的 Grove 应用程式

### 步骤 1：建立组织

点击左上角的**创建组织**（建立组织）。<img src="./docs/images/clerk/clerk10.png" alt="settings" style="max-width: 100%; height: auto; margin: 20px 0;"/>

### 步骤 2：转移所有权

前往**配置>设置**（配置 > 设定），点击**转移所有权**（转移所有权）。将新拥有者设置为你刚刚建立的组织。

<img src="./docs/images/clerk/clerk11.png" alt="settings" style="max-width: 100%; height: auto; margin: 20px 0;"/>

### 步骤 3：新增其他使用者

点击左上角的**管理**（管理）来新增其他使用者并授予他们管理存取权限。<img src="./docs/images/clerk/clerk12.png" alt="settings" style="max-width: 100%; height: auto; margin: 20px 0;"/><img src="./docs/images/clerk/clerk13.png" alt="settings" style="max-width: 100%; height: auto; margin: 20px 0;"/>

<img src="./docs/images/login.png" alt="用戶登入" style="width: 800px;"/>

<img src="./docs/images/clerkorg.png" alt="權限管理" style="width: 800px;"/>

## 环境变量

> 本项目大多数配置项都通过环境变量来设置，教程：[如何修改 Vercel 环境变量](./docs/vercel-cn.md)。

### `OPENAI_API_KEY`（必填项）

OpenAI 密钥，你在 openai 账户页面申请的 api key，使用英文逗号隔开多个 key，这样可以随机轮询这些 key。

### `CLERK_SECRET_KEY`（必填项）

Clerk 用户管理

### `CLERK_WEBHOOK_SECRET`（必填项）

Clerk 用户管理

### `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`（必填项）

Clerk 用户管理

### `BASE_URL`（可选）

> 默认:`https://api.openai.com`

> 示例:`http://your-openai-proxy.com`

OpenAI 接口代理 URL，如果你手动配置了 openai 接口代理，请填写此选项。

> 如果遇到 ssl 证书问题，请将`BASE_URL`的协议设置为 http。

### `OPENAI_ORG_ID`（可选）

指定 OpenAI 中的组织 ID。

### `AZURE_URL`（可选）

> 形如：https&#x3A;//{azure-resource-url}/openai

Azure 部署地址。

### `AZURE_API_KEY`（可选）

Azure 密钥。

### `AZURE_API_VERSION`（可选）

Azure Api 版本，你可以在这里找到：[Azure 文档](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#chat-completions)。

### `GOOGLE_API_KEY`(可选)

Google Gemini Pro 密钥。

### `GOOGLE_URL`(可选)

Google Gemini Pro API url。

### `ANTHROPIC_API_KEY`(可选)

人类Claude API键。

### `ANTHROPIC_API_VERSION`(可选)

Anthropic Claude Api 版本。

### `ANTHROPIC_URL`(可选)

人类的克劳德API url。

### `BAIDU_API_KEY`(可选)

百度API键。

### `BAIDU_SECRET_KEY`(可选)

百度秘密钥匙。

### `BAIDU_URL`(可选)

bedu api url。

### `BYTEDANCE_API_KEY`(可选)

布伦奇向南露出。

### `BYTEDANCE_URL`(可选)

bytedance api url。

### `ALIBABA_API_KEY`(可选)

阿里云（千问）Api Key。

### `ALIBABA_URL`(可选)

阿里云（千问）Api Url。

### `IFLYTEK_URL`(可选)

讯飞星火 Api Url。

### `IFLYTEK_API_KEY`(可选)

讯飞星火 Api Key。

### `IFLYTEK_API_SECRET`(可选)

讯飞星火 Api Secret。

### `CHATGLM_API_KEY`(可选)

chatglm api键。

### `CHATGLM_URL`(可选)

chatglm api url。

### `XAI_API_KEY`(可选)

XAI API键。

### `XAI_URL`(可选)

和

### `PERPLEXITY_API_KEY`(可选)

困惑API键。

### `PERPLEXITY_URL`(可选)

困惑API url。

### `MOONSHOT_API_KEY`(可选)

Moonshot API键。

### `MOONSHOT_URL`(可选)

Moonshot API URL

### `HIDE_USER_API_KEY`（可选）

如果你不想让用户自行填入 API Key，将此环境变量设置为 1 即可。

### `DISABLE_GPT4`（可选）

如果你不想让用户使用 GPT-4，将此环境变量设置为 1 即可。

### `ENABLE_BALANCE_QUERY`（可选）

如果你想启用余额查询功能，将此环境变量设置为 1 即可。

### `DISABLE_FAST_LINK`（可选）

如果你想禁用从链接解析预制设置，将此环境变量设置为 1 即可。

### `WHITE_WEBDAV_ENDPOINTS`(可选)

如果你想增加允许访问的 WebDAV 服务地址，可以使用该选项，格式要求：

-   每一个地址必须是一个完整的 endpoint
    > `https://xxxx/xxx`
-   多个地址以`,`相连

### `CUSTOM_MODELS`（可选）

> 示例：`+qwen-7b-chat,+glm-6b,-gpt-3.5-turbo,gpt-4-1106-preview=gpt-4-turbo`表示增加`qwen-7b-chat`和`glm-6b`到模型列表，而从列表中删除`gpt-3.5-turbo`，并将`gpt-4-1106-preview`模型名字展示为`gpt-4-turbo`。  
> 如果你想先禁用所有模型，再启用指定模型，可以使用`-all,+gpt-3.5-turbo`，则表示仅启用`gpt-3.5-turbo`。

用来控制模型列表，使用`+`增加一个模型，使用`-`来隐藏一个模型，使用`模型名=展示名`来自定义模型的展示名，用英文逗号隔开。

在 Azure 的模式下，支持使用`modelName@Azure=deploymentName`的方式配置模型名称和部署名称（deploy-name）。

> 示例：`+gpt-3.5-turbo@Azure=gpt35`这个配置会在模型列表显示一个`gpt35(Azure)`的选项。  
> 如果你只能使用 Azure 模式，那么设置`-all,+gpt-3.5-turbo@Azure=gpt35`则可以让对话的默认使用`gpt35(Azure)`。

在 ByteDance 的模式下，支持使用`modelName@bytedance=deploymentName`的方式配置模型名称和部署名称（deploy-name）。

> 示例:`+Doubao-lite-4k@bytedance=ep-xxxxx-xxx`这个配置会在模型列表显示一个`Doubao-lite-4k(ByteDance)`的选项。

### `DEFAULT_MODEL`（可选）

更改默认模型。

### `DEFAULT_INPUT_TEMPLATE`（可选）

自定义默认的 template，用于初始化『设置』中的『用户输入预处理』配置项。

### `STABILITY_API_KEY`(可选)

Stability API 密钥。

### `STABILITY_URL`(可选)

自定义的 Stability API 请求地址。

## 用户模型设置

登入

> 可根据用户最高权限使用系统设置的API Key。

未登入

> 如果未登入可在代理设定中填入自己的API Key使用guest模型。

登入后用户角色

> 客人

可在Clerk dashboard中更改角色权限

> [Clerk配置教学](#配置頁面訪問密碼)

配置Clerk后，teacher权限者可在Grove Chat中 settings页面可直接管理组织并邀请成员进一步管控可存取的模型

### 新增模型

[程式码文件](./app/constant.ts)

找到模型供应商添加新模型

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

管理存取权限(须在模型供应商的模型列表中)

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

## 开发

中国大陆用户，可以使用本项目自带的代理进行开发，你也可以自由选择其他代理地址
BASE_URL=<https://b.nextweb.fun/api/proxy>

### 本地开发

1.  在项目根目录新建一个`.env.local`文件，里面填入环境变量：


    OPENAI_API_KEY=<your key here>
    CLERK_SECRET_KEY=<your key here>
    CLERK_WEBHOOK_SECRET=<your key here>
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your key here>

2.  安装 Node.js 18 和 Yarn，具体细节请询问 ChatGPT；
3.  执行`yarn install && yarn dev`即可。 ⚠️ 注意：此命令仅用于本地开发，不要用于部署！
4.  如果你想本地部署，请使用`yarn install && yarn build && yarn start`命令，你可以配合 pm2 来守护进程，防止被杀死，详情询问 ChatGPT。

### 容器部署

> Docker 版本需要在 20 及其以上，否则会提示找不到镜像。

> ⚠️ 注意：Docker 版本在大多数时间都会落后最新的版本 1 到 2 天，所以部署后会持续出现“存在更新”的提示，属于正常现象。

```shell
docker pull robbiedood/grove-chat

docker run -d -p 3000:3000 \
   -e OPENAI_API_KEY=sk-xxxx \
   -e CLERK_SECRET_KEY=<your key here> \
   -e CLERK_WEBHOOK_SECRET=<your key here> \
   -e NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your key here> \
   robbiedood/grove-chat
```

你也可以指定 proxy：

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

如果你的本地代理需要帐号密码，可以使用：

```shell
-e PROXY_URL="http://127.0.0.1:7890 user password"
```

如果你需要指定其他环境变量，请自行在上述命令中增加`-e 環境變量=環境變量值`来指定。

### 本地部署

在控制台运行下方命令：

```shell
bash <(curl -s https://raw.githubusercontent.com/robbiedood/grove-chat/main/scripts/setup.sh)
```

⚠️ 注意：如果你安装过程中遇到了问题，请使用 Docker 部署。

## 截图

<div style="display: flex; gap: 20px;">
  <img src="./docs/images/settings.png" alt="設定" style="width: 800px;"/>
</div>

### 相关项目

-   [chatgpt-next-web](https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web):
    一站式大模型平台，支持市面上所有主流大语言模型。

-   [一个api](https://github.com/songquanpeng/one-api): 一站式大模型额度管理平台，支持市面上所有主流大语言模型。

-   [Mr.-Ranedeer-AI-Tutor](https://github.com/JushBJJ/Mr.-Ranedeer-AI-Tutor)：ai tutor

## 开源协议

[和](https://opensource.org/license/mit/)
