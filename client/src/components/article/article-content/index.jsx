import React from "react";
import {
  ArticleBtnContainer,
  ArticleContent,
  LikeBtn,
  MintBtn,
} from "../../article.style";
import MarkdownPreview from "../../../markdown-preview/markdown-preview";

const ArticleContentComponent = ({
  setIsMintModalOpen,
  article,
  onClickLike,
}) => {
  return (
    <div>
      <ArticleContent>
        <MarkdownPreview
          height={null}
          isBackground={false}
          markdown={article.post_content}
        />
        <ArticleBtnContainer>
          <LikeBtn onClick={() => onClickLike(article.id)}>Like</LikeBtn>
          {!!article.sale_status && (
            <MintBtn onClick={() => setIsMintModalOpen(true)}>Mint</MintBtn>
          )}
        </ArticleBtnContainer>
      </ArticleContent>
    </div>
  );
};

export default ArticleContentComponent;
