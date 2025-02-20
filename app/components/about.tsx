import styles from "./about.module.scss";
import { IconButton } from "./button";
import { useNavigate } from "react-router-dom";
import { Path } from "../constant";
import { useUser } from "@clerk/nextjs";
import { Bot, Shield, Zap, MessageSquare, PenTool, Search } from "lucide-react";
import { FeatureCard, Badge } from "./ui-lib";
import { SignUpButton } from "@clerk/nextjs";
import OpenAIIcon from "../icons/openai.svg";
import AnthropicIcon from "../icons/anthropic.svg";
import PerplexityIcon from "../icons/perplexity.svg";
import XAIIcon from "../icons/xai.svg";
import BaiduIcon from "../icons/baidu.svg";
import ByteDanceIcon from "../icons/bytedance.svg";
import AlibabaIcon from "../icons/alibaba.svg";
import GoogleIcon from "../icons/gemini.svg";
import MoonshotIcon from "../icons/moonshot.svg";
import { useEffect } from "react";
import clsx from "clsx";

export function About() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn === true && window.location.hash !== "#/chat") {
      navigate("/chat");
    }
  }, [isSignedIn, navigate]);

  const features = [
    {
      icon: <Bot className={styles.icon} />,
      title: "多模型整合",
      description: "集成GPT-4、Claude、Gemini等前沿大語言模型,智能場景切換",
    },
    {
      icon: <Shield className={styles.icon} />,
      title: "企業級權限",
      description: "靈活的用戶權限配置,自定義Agent存取權限",
    },
    {
      icon: <Zap className={styles.icon} />,
      title: "高效對話",
      description: "精准上下文理解,流暢對話體驗",
    },
  ];

  const applications = [
    {
      icon: <PenTool className={styles.icon} />,
      title: "AI雅思作文教室",
      description: "精選IELTS高分作文庫,專業寫作建議",
    },
    {
      icon: <MessageSquare className={styles.icon} />,
      title: "AI社群文案写手",
      description: "精准把握品牌調性,互動話題規劃",
    },
    {
      icon: <Search className={styles.icon} />,
      title: "研究助手",
      description: "arXiv論文搜尋,智能摘要生成",
    },
  ];

  return (
    <div className={clsx(styles.container, "no-dark")}>
      <section className={clsx(styles.hero, "no-dark")}>
        <div className={clsx(styles.heroContent, "no-dark")}>
          <Badge variant="secondary" className={clsx(styles.badge, "no-dark")}>
            ✨ 全新升级
          </Badge>
          <h1>
            讓AI對話更智能
            <br />
            <span>簡單而強大</span>
          </h1>
          <p>整合頂尖AI技術,打造專業級對話平台</p>

          <div className={styles.actions}>
            <IconButton
              text="探索更多"
              onClick={() => {
                document.getElementById("features")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            />
            <SignUpButton mode="modal">
              <IconButton text="立即體驗" type="primary" />
            </SignUpButton>
          </div>

          <div className={styles.demoWrapper}>
            <div className={styles.demoContent}>
              <h2>強大的AI，無限可能</h2>
              <p className={styles.subText}>
                支援數十種主流AI模型，包含GPT、Gemini、Claude、Perplexity等，
                具備文生圖、即時搜尋等全方位能力
              </p>

              <div className={styles.modelIcons}>
                <div className={clsx(styles.sliderContainer, "no-dark")}>
                  <div className={clsx(styles.iconSlider, "no-dark")}>
                    <OpenAIIcon className={clsx(styles.modelIcon, "no-dark")} />
                    <AnthropicIcon
                      className={clsx(styles.modelIcon, "no-dark")}
                    />
                    <XAIIcon className={clsx(styles.modelIcon, "no-dark")} />
                    <PerplexityIcon
                      className={clsx(styles.modelIcon, "no-dark")}
                    />
                    <MoonshotIcon
                      className={clsx(styles.modelIcon, "no-dark")}
                    />
                    <BaiduIcon className={clsx(styles.modelIcon, "no-dark")} />
                    <ByteDanceIcon
                      className={clsx(styles.modelIcon, "no-dark")}
                    />
                    <AlibabaIcon
                      className={clsx(styles.modelIcon, "no-dark")}
                    />
                    <GoogleIcon className={clsx(styles.modelIcon, "no-dark")} />
                  </div>
                  <div className={clsx(styles.iconSlider, "no-dark")}>
                    <OpenAIIcon className={clsx(styles.modelIcon, "no-dark")} />
                    <AnthropicIcon
                      className={clsx(styles.modelIcon, "no-dark")}
                    />
                    <XAIIcon className={clsx(styles.modelIcon, "no-dark")} />
                    <PerplexityIcon
                      className={clsx(styles.modelIcon, "no-dark")}
                    />
                    <MoonshotIcon
                      className={clsx(styles.modelIcon, "no-dark")}
                    />
                    <BaiduIcon className={clsx(styles.modelIcon, "no-dark")} />
                    <ByteDanceIcon
                      className={clsx(styles.modelIcon, "no-dark")}
                    />
                    <AlibabaIcon
                      className={clsx(styles.modelIcon, "no-dark")}
                    />
                    <GoogleIcon className={clsx(styles.modelIcon, "no-dark")} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className={clsx(styles.features, "no-dark")}>
        <div className={clsx(styles.featuresContent, "no-dark")}>
          <Badge variant="outline" className="no-dark">
            核心功能
          </Badge>
          <h2>專業AI對話解決方案</h2>
          <p>整合頂級AI技術</p>

          <div className={styles.featureGrid}>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                image={`/images/feature-${index + 1}.jpg`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.featuresContent}>
          <Badge variant="outline">應用場景</Badge>
          <h2>多場景智能對話</h2>
          <p>為不同場景提供解決方案</p>

          <div className={styles.featureGrid}>
            {applications.map((app, index) => (
              <FeatureCard
                key={index}
                icon={app.icon}
                title={app.title}
                description={app.description}
                image={`/images/app-${index + 1}.jpg`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={clsx(styles.cta, "no-dark")}>
        <div className={clsx(styles.ctaContent, "no-dark")}>
          <Badge variant="secondary" className="no-dark">
            加入Grove
          </Badge>
          <h2>與我們探索AI無限可能</h2>
          <p>加入Grove,獲取最新模型</p>
          <SignUpButton mode="modal">
            <IconButton text="立即體驗" type="primary" />
          </SignUpButton>
        </div>
      </section>
    </div>
  );
}
