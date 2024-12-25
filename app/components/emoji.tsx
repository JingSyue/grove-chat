import EmojiPicker, {
  Emoji,
  EmojiStyle,
  Theme as EmojiTheme,
} from "emoji-picker-react";
import React from "react";
import Image from "next/image";

import { ModelType } from "../store";
import BotIcon from "../icons/bot.svg";
import BlackBotIcon from "../icons/black-bot.svg";

export function getEmojiUrl(unified: string, style: EmojiStyle) {
  // Whoever owns this Content Delivery Network (CDN), I am using your CDN to serve emojis
  // Old CDN broken, so I had to switch to this one
  // Author: https://github.com/H0llyW00dzZ
  return `https://fastly.jsdelivr.net/npm/emoji-datasource-apple/img/${style}/64/${unified}.png`;
}
export function AvatarPicker(props: {
  onEmojiClick: (emojiId: string) => void;
  onImageUpload: (imageUrl: string) => void;
}) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        localStorage.setItem("userAvatar", imageUrl);
        props.onImageUpload(imageUrl);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleImageUpload}
        accept="image/*"
        style={{ display: "none" }}
        id="avatar-upload"
      />
      <label
        htmlFor="avatar-upload"
        className="custom-file-upload"
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "8px 16px",
          borderRadius: "8px",
          backgroundColor: "var(--primary)",
          color: "white",
          cursor: "pointer",
          transition: "all 0.2s",
          marginBottom: "10px",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ marginRight: "8px" }}
        >
          <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        upload image
      </label>

      <EmojiPicker
        width={"100%"}
        lazyLoadEmojis
        theme={EmojiTheme.AUTO}
        getEmojiUrl={getEmojiUrl}
        onEmojiClick={(e) => {
          props.onEmojiClick(e.unified);
        }}
      />
    </div>
  );
}

export function Avatar(props: { model?: ModelType; avatar?: string }) {
  if (props.model) {
    return (
      <div className="no-dark">
        {props.model?.startsWith("gpt-4") ||
        props.model?.startsWith("chatgpt-4o") ||
        props.model?.startsWith("o1") ? (
          <BlackBotIcon className="user-avatar" />
        ) : (
          <BotIcon className="user-avatar" />
        )}
      </div>
    );
  }

  const isLocalImage = (url: string) => {
    // Check if it's a base64 encoded image
    if (url.startsWith("data:image")) {
      return true;
    }
  };

  return (
    <div className="user-avatar">
      {props.avatar &&
        (isLocalImage(props.avatar) ? (
          <Image
            src={props.avatar}
            alt="User avatar"
            className="user-avatar"
            width={30}
            height={30}
          />
        ) : (
          // Renders image if URL ends with image extensions
          <EmojiAvatar avatar={props.avatar} />
        ))}
    </div>
  );
}

export function EmojiAvatar(props: { avatar: string; size?: number }) {
  return (
    <Emoji
      unified={props.avatar}
      size={props.size ?? 30}
      getEmojiUrl={getEmojiUrl}
    />
  );
}
