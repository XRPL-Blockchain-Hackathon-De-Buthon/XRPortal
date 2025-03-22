import React from "react";
import { ArticleProfileContainer } from "./article-profile.style";
import ProfileCard from "./profile-card/profile-card";

const ArticleProfile = ({ article }) => {
  const writerInfo = {
    type: "WRITER",
    name: article.writer_name,
    userId: article.writer_id,
  };

  const ownerInfo = {
    type: "OWNER",
    name: article.owner_name,
    userId: article.owner_id,
  };

  return (
    <>
      <ArticleProfileContainer>
        <ProfileCard info={writerInfo} />
        <ProfileCard info={ownerInfo} />
      </ArticleProfileContainer>
    </>
  );
};

export default ArticleProfile;
