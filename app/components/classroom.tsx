"use client";
import { ErrorBoundary } from "./error";
import Locale from "../locales";
import { IconButton } from "./button";
import CloseIcon from "../icons/close.svg";
import { useNavigate } from "react-router-dom";

import {
  CreateOrganization,
  useUser,
  SignedIn,
  SignedOut,
  OrganizationSwitcher,
  OrganizationList,
} from "@clerk/nextjs";
import { Path } from "../constant";
import styles from "./classroom.module.scss";

export function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();

  console.log(isLoaded, isSignedIn, user);
  const userRole = (user?.publicMetadata.role as string) || "Not set";
  const birthday = (user?.publicMetadata.birthday as string) || "Not set";

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.fullName}</h1>
      <p>Your email: {user.primaryEmailAddress?.emailAddress}</p>
      <p>Your user ID: {user.id}</p>
      <p>Your role: {userRole}</p>
      <p>Your birthday: {birthday}</p>
    </div>
  );
}

export function Classroom() {
  const navigate = useNavigate();

  return (
    <ErrorBoundary>
      <div className="window-header" data-tauri-drag-region>
        <div className="window-header-title">
          <div className="window-header-main-title">{Locale.Auth.Confirm}</div>
        </div>
        <div className="window-actions">
          <div className="window-action-button"></div>
          <div className="window-action-button"></div>
          <div className="window-action-button">
            <IconButton
              icon={<CloseIcon />}
              onClick={() => navigate(Path.Home)}
              bordered
            />
          </div>
        </div>
      </div>

      <div className={styles["classroom"]}>
        {
          <>
            <OrganizationSwitcher hidePersonal={true} />
            <OrganizationSwitcher.OrganizationProfilePage label="members" />

            {/* <List>
              <IconButton userButton={true} />
              <UserButton>
               
                <UserButton.UserProfilePage
                  label="Custom Page"
                  url="custom"
                  labelIcon={<CloseIcon />}
                >
                  <Settings />
                  <OrganizationList  />
                </UserButton.UserProfilePage>

              
                <UserButton.UserProfilePage
                  label="Terms"
                  labelIcon={<CloseIcon />}
                  url="terms"
                >
                  <div>
                    <h1>Custom Terms Page</h1>
                    <p>This is the custom terms page</p>
                  </div>
                </UserButton.UserProfilePage>
              </UserButton>
            </List>

            <List>
              <ListItem title={Locale.Classroom.Name}>
                <div style={{ display: "flex" }}>
                  <IconButton
                    icon={<EditIcon />}
                    text={Locale.Classroom.Action.Edit}
                    onClick={() => setShowPromptModal(true)}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    text={Locale.Classroom.Action.Delete}
                    onClick={() => setShowPromptModal(true)}
                  />
                </div>
              </ListItem>
            </List>
            <List>
              <ListItem title={Locale.Classroom.Name}>
                <div style={{ display: "flex" }}>
                  <IconButton
                    icon={<EditIcon />}
                    text={Locale.Classroom.Action.Edit}
                    onClick={() => setShowPromptModal(true)}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    text={Locale.Classroom.Action.Delete}
                    onClick={() => setShowPromptModal(true)}
                  />
                </div>
              </ListItem>
            </List> */}
          </>
        }
      </div>
    </ErrorBoundary>
  );
}
