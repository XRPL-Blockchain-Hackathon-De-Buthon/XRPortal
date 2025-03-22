import React from "react";
import {
  ArticleItemContainer,
  ArticleLeftContent,
  ArticleRightContent,
  CountText,
  ProfileInfoContainer,
} from "./article-item.style";

const ArticleItemComponent = ({ article }) => {
  return (
    <ArticleItemContainer>
      <ArticleLeftContent>
        <span>{article.post_title}</span>
        <ProfileInfoContainer>
          <img src="" alt="profile"></img>
          <span>{article.writer_name}</span>
          <span>{article.createdAt}</span>
        </ProfileInfoContainer>
      </ArticleLeftContent>
      <ArticleRightContent>
        <CountText>👁 {article.view_count}</CountText>
        <CountText>👍🏼 {article.likeCount}</CountText>
        <CountText isAmount={true}>{article.price} XRP</CountText>
      </ArticleRightContent>
    </ArticleItemContainer>
  );
};

export default ArticleItemComponent;
