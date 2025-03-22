import React from 'react';
import { ArticleBtnContainer, ArticleContent, LikeBtn, MintBtn } from '../../article.style';

const ArticleContentComponent = () => {
  return (
    <div>
      <ArticleContent>
        <div>
          XRPL을 활용한 블로그는 빠른 트랜잭션과 낮은 비용으로 운영될 수
          있습니다. 또한, 콘텐츠 제작자에게 직 접 보상을 지급하는 것이
          가능합니다.
        </div>
        <ArticleBtnContainer>
          <LikeBtn>Like</LikeBtn>
          <MintBtn>Mint</MintBtn>
        </ArticleBtnContainer>
      </ArticleContent>
    </div>
  );
};

export default ArticleContentComponent;