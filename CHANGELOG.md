# GroveChat 更新日誌
[English](./CHANGELOG.en.md) 
## 新增功能及改動說明
### 模型支援擴充
- 新增 Perplexity API 支援 `app/client/platforms` `app/api`
  - 官方1/19後僅支援 llama-3.1-sonar-huge 128k chat 模型 small 及 large 版本將停用或暫停更新

- 強化現有模型功能
  - Moonshot 模型添加圖片識別功能 `app/client/platforms/moonshot.ts`
  - XAI 模型添加圖片識別功能 `app/client/platforms/xai.ts`

### 用戶認證系統
- 導入 Clerk 用戶認證系統 `app/middleware.ts` `app/components/home.tsx`
  - 實作路由驗證中間件
  - 定義需要驗證的路徑規則
  - 排除靜態資源路徑

- 實作角色權限管理 `app/components/chat.tsx` `app/constant.ts`
  - 定義角色優先級順序 (teacher > assistant > student > guest)
  - 根據用戶最高權限過濾可用模型
  - 限制訪客和學生創建組織功能

- 客製化權限控制 `app/components/settings.tsx`
  - 根據角色控制設定頁面訪問權限
  - 僅教師角色可管理組織成員
  - 登入用戶才可存取模型設定

### 預設參數設定
- 智能預設配置 `app/store/config.ts` `app/constant.ts`
  - 新增情境模式快速切換
    - RealTime: 使用 Perplexity 即時回應模式
    - Creative: 使用 OpenAI 創意寫作模式
    - Programming: 使用 Anthropic 程式開發模式

- 自動開啟預設插件功能 `app/constant.ts` `public\plugins`
  - 預設啟用 DuckDuckGo Lite 搜尋
  - 預設啟用 ArXiv 學術搜尋
  - 預設啟用 DALL-E 3 圖像生成

### 分析與監控
- 整合 LogRocket 分析平台 `app/components/home.tsx`
  - 追蹤用戶使用習慣
    - 設定隱私保護機制
    - 排除聊天內容追蹤
    - 關閉網路請求記錄
  - 監控網站流量數據
    - 識別登入用戶行為
    - 追蹤用戶 session
    - 收集使用者郵件資訊

### 自動化工作流程
- 添加 GitHub Actions 工作流 `readme.yml`
  - 自動翻譯 README.md 至多語言版本
    - 支援簡體中文 (zh-CN)
    - 支援英文 (en)
    - 支援阿拉伯文 (ar)
    - 支援法文 (fr)
    - 支援日文 (ja)
  - 當推送到主分支時自動觸發翻譯
  - 使用 Google Cloud Translate API

### UI微調
- Search Chat、Stable Diffusion、Custom Plugins功能與原項目同步

  - 目前因介面簡潔未將按鈕呈現

  - 若有需要可自行添加按鈕或更改url

線上體驗

[ Search Chat ](https://grove-chat.vercel.app/#/search-chat)

[ Stable Diffusion ](https://grove-chat.vercel.app/#/sd)

[ Custom Plugins ](https://grove-chat.vercel.app/#/plugins)


