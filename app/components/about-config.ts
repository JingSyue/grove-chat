import { Bot, Shield, Zap, PenTool, MessageSquare, Search } from "lucide-react";

interface FeatureItem {
  Icon: typeof Bot;
  title: string;
  description: string;
}

// 只保留純數據配置
export const features: FeatureItem[] = [
  {
    Icon: Bot,
    title: "多模型整合",
    description: "集成GPT-4、Claude、Gemini等前沿大語言模型，智能場景切換",
  },
  {
    Icon: Shield,
    title: "企業級權限",
    description: "靈活的用戶權限配置，自定義Agent存取權限",
  },
  {
    Icon: Zap,
    title: "高效對話",
    description: "精准上下文理解，流暢對話體驗",
  },
];

export const applications: FeatureItem[] = [
  {
    Icon: PenTool,
    title: "AI雅思作文教室",
    description: "精選IELTS高分作文庫，專業寫作建議",
  },
  {
    Icon: MessageSquare,
    title: "AI社群文案写手",
    description: "精准把握品牌調性，互動話題規劃",
  },
  {
    Icon: Search,
    title: "研究助手",
    description: "arXiv論文搜尋，智能摘要生成",
  },
];
