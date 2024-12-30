# GroveChat Changelog

## New Features and Changes

### Model Support Expansion
- Added Perplexity API Support `app/client/platforms` `app/api`
  - As of January 19th, only llama-3.1-sonar-huge 128k chat model is supported, small and large versions will be discontinued or suspended

- Enhanced Existing Models
  - Added image recognition capability to Moonshot model `app/client/platforms/moonshot.ts`
  - Added image recognition capability to XAI model `app/client/platforms/xai.ts`

### Authentication System
- Implemented Clerk Authentication System `app/middleware.ts` `app/components/home.tsx`
  - Implemented route validation middleware
  - Defined authentication path rules
  - Excluded static resource paths

- Role-based Access Control `app/components/chat.tsx` `app/constant.ts`
  - Defined role priority order (teacher > assistant > student > guest)
  - Filtered available models based on user's highest permission
  - Restricted organization creation for guests and students

- Custom Permission Control `app/components/settings.tsx`
  - Role-based settings page access control
  - Organization management limited to teacher role
  - Model settings accessible only to logged-in users

### Default Parameter Settings
- Smart Default Configuration `app/store/config.ts` `app/constant.ts`
  - Added quick scenario mode switching
    - RealTime: Using Perplexity for instant response
    - Creative: Using OpenAI for creative writing
    - Programming: Using Anthropic for code development

- Automatic Default Plugin Activation `app/constant.ts` `public\plugins`
  - DuckDuckGo Lite search enabled by default
  - ArXiv academic search enabled by default
  - DALL-E 3 image generation enabled by default

### Analytics and Monitoring
- Integrated LogRocket Analytics Platform `app/components/home.tsx`
  - User Behavior Tracking
    - Privacy protection mechanism
    - Chat content tracking excluded
    - Network request logging disabled
  - Website Traffic Monitoring
    - Logged-in user behavior identification
    - User session tracking
    - User email information collection

### Automation Workflow
- Added GitHub Actions Workflow `readme.yml`
  - Automatic README.md translation to multiple languages
    - Simplified Chinese (zh-CN) support
    - English (en) support
    - Arabic (ar) support
    - French (fr) support
    - Japanese (ja) support
  - Translation triggered on main branch push
  - Using Google Cloud Translate API

### UI Adjustments
- Search Chat, Stable Diffusion, Custom Plugins functionality synced with original project
  - Buttons currently hidden for interface simplicity
  - Buttons can be added or URLs modified as needed

Online Experience

[ Search Chat ](https://grove-chat.vercel.app/#/search-chat)

[ Stable Diffusion ](https://grove-chat.vercel.app/#/sd)

[ Custom Plugins ](https://grove-chat.vercel.app/#/plugins)
