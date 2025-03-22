import React from "react";
import ProfileComponent from "../profile/profile";
import { SidebarContainer, SidebarItem, SidebarWrapper } from "./sidebar.style";
import useUserStore from "../../store/auth";
import { Link, useLocation } from "react-router-dom";

const SidebarComponent = () => {
  const { user } = useUserStore();
  const location = useLocation();

  return (
    <SidebarWrapper>
      <ProfileComponent />
      {user && (
        <SidebarContainer>
          <Link to="/my/articles">
            <SidebarItem isFocus={location.pathname === "/my/articles"}>
              📄 Entries
            </SidebarItem>
          </Link>
          <Link to="/my/advertisements">
            <SidebarItem isFocus={location.pathname === "/my/advertisements"}>
              📢 advertisements
            </SidebarItem>
          </Link>
          <Link to="/my/history">
            <SidebarItem isFocus={location.pathname === "/my/history"}>
              🕜 History
            </SidebarItem>
          </Link>
        </SidebarContainer>
      )}
    </SidebarWrapper>
  );
};

export default SidebarComponent;
