import React, { useEffect } from "react";
import {
  HeaderBtn,
  HeaderContainer,
  HeaderContentContainer,
  HeaderText,
  HeaderWrapper,
  Logo,
} from "./header.style";
import { Link } from "react-router-dom";
import LogoImg from "../../assets/logo.png";
import useUserStore from "../../store/auth";

const HeaderComponenet = () => {
  const { user } = useUserStore();

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <HeaderContentContainer>
          <Link to="/">
            <Logo>
              <img src={LogoImg} width={80} alt="logo" />
            </Logo>
          </Link>
          <Link to="/">
            <HeaderText>홈</HeaderText>
          </Link>
        </HeaderContentContainer>

        {user ? (
          <HeaderContentContainer>
            <Link to="/my/articles">
              <HeaderText>MyPage</HeaderText>
            </Link>
            <Link to="/create/article">
              <HeaderBtn>게시글 작성</HeaderBtn>
            </Link>
            <Link to="/advertise/create">
              <HeaderBtn>광고 게시</HeaderBtn>
            </Link>
          </HeaderContentContainer>
        ) : (
          <HeaderContentContainer>
            <Link to="/signup">
              <HeaderBtn>회원가입</HeaderBtn>
            </Link>
            <Link to="/login">
              <HeaderBtn>로그인</HeaderBtn>
            </Link>
          </HeaderContentContainer>
        )}
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default HeaderComponenet;
