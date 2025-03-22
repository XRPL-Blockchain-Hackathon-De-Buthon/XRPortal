import React from "react";
import {
  Container,
  ProfileImgContainer,
  ProfileInfoContainer,
} from "./profile.style";
import useUserStore from "../../store/auth";
import { LoginText } from "../sidebar/sidebar.style";
import { Link } from "react-router-dom";

const ProfileComponent = () => {
  const { user } = useUserStore();

  return (
    <Container>
      {user ? (
        <>
          <ProfileImgContainer
            src="https://avatars.githubusercontent.com/u/66717787?v=4"
            alt="profile"
          />
          <ProfileInfoContainer>
            <span style={{ fontSize: "14px", color: "white" }}>Kim jimin</span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "4px",
              }}
            >
              <span style={{ fontSize: "14px", color: "#8000FF" }}>
                120 DBT
              </span>
              <span style={{ fontSize: "14px", color: "#8000FF" }}>
                1000 XRP
              </span>
            </div>
          </ProfileInfoContainer>
        </>
      ) : (
        <Link style={{ textDecoration: false }} to="/login">
          <LoginText>로그인</LoginText>
        </Link>
      )}
    </Container>
  );
};

export default ProfileComponent;
