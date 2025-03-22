import React from "react";
import HeaderComponenet from "../../components/header/header";
import SidebarComponent from "../../components/sidebar/sidebar";
import { ContentWrapper, MainContentWrapper, MainLayoutWrapper } from "./index.style";

const MainLayout = ({ children, isSidebar, width = 1024 }) => {
  return (
    <MainLayoutWrapper>
      <HeaderComponenet />
      <MainContentWrapper isSidebar={isSidebar} width={width}>
        {isSidebar && <SidebarComponent />}
        <ContentWrapper width={isSidebar ? width - 260 : 800 }>{children}</ContentWrapper>
      </MainContentWrapper>
    </MainLayoutWrapper>
  );
};

export default MainLayout;
