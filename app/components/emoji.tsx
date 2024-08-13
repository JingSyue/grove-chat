import EmojiPicker, {
  Emoji,
  EmojiStyle,
  Theme as EmojiTheme,
} from "emoji-picker-react";
import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";

import { ModelType } from "../store";
import BotIcon from "../icons/bot.svg";
import BlackBotIcon from "../icons/black-bot.svg";
import ImageIcon from "../icons/pic.svg";
import ConfirmIcon from "../icons/check.svg";

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
  const [image, setImage] = useState<string>("");
  const [showImageEditor, setShowImageEditor] = useState(false);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setShowImageEditor(true);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const editorRef = React.useRef<AvatarEditor>(null);

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const dataUrl = canvas.toDataURL("image/jpeg");
      localStorage.setItem("userAvatar", dataUrl);
      props.onImageUpload(dataUrl);
      setShowImageEditor(false);
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
      <label htmlFor="avatar-upload" className="custom-file-upload">
        <ImageIcon className="image-icon" />
      </label>

      {showImageEditor && (
        <div className="image-editor-wrapper">
          <AvatarEditor
            ref={editorRef}
            image={image}
            width={250}
            height={250}
            border={50}
            borderRadius={50}
            scale={1.2}
          />
          <div onClick={handleSave} className="confirm-icon-wrapper">
            <ConfirmIcon />
          </div>
        </div>
      )}
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
        {props.model?.startsWith("gpt-4") ? (
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
          <img
            src={props.avatar}
            alt="User avatar"
            className="user-avatar img"
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
