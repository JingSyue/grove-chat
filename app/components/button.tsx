import { UserButton } from "@clerk/nextjs"; // Import UserButton from Clerk
import styles from "./button.module.scss";
import { CSSProperties } from "react";

export type ButtonType = "primary" | "danger" | null;

export function IconButton(props: {
  onClick?: () => void;
  icon?: JSX.Element;
  type?: ButtonType;
  text?: string;
  bordered?: boolean;
  shadow?: boolean;
  className?: string;
  title?: string;
  disabled?: boolean;
  tabIndex?: number;
  autoFocus?: boolean;
  style?: CSSProperties;
  userButton?: boolean; // Add a prop to check if it's for UserButton
}) {
  return (
    <button
      className={
        styles["icon-button"] +
        ` ${props.bordered && styles.border} ${props.shadow && styles.shadow} ${
          props.className ?? ""
        } clickable ${styles[props.type ?? ""]}`
      }
      onClick={props.onClick}
      title={props.title}
      disabled={props.disabled}
      role="button"
      tabIndex={props.tabIndex}
      autoFocus={props.autoFocus}
      style={props.style}
    >
      {/* Render UserButton if the userButton prop is true */}
      {props.userButton ? (
        <UserButton />
      ) : (
        <>
          {props.icon && (
            <div
              className={
                styles["icon-button-icon"] +
                ` ${props.type === "primary" && "no-dark"}`
              }
            >
              {props.icon}
            </div>
          )}

          {props.text && (
            <div className={styles["icon-button-text"]}>{props.text}</div>
          )}
        </>
      )}
    </button>
  );
}
