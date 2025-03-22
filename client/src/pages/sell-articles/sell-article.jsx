import React from "react";
import MainLayout from "../../layouts/main";
import {
  BackBtn,
  CreateArticlePageContainer,
  Header,
  MintingInputContainer,
  WriteBtn,
} from "./sell-article.style";
import { Link, useParams } from "react-router-dom";

const SellArticlePage = () => {
  const { id } = useParams();

  return (
    <MainLayout isSidebar={false} width={800}>
      <CreateArticlePageContainer>
        <div>
          <Header>게시물 판매</Header>
          <MintingInputContainer>
            <h2>판매 금액</h2>
            <input placeholder="Price (XRP)" />
          </MintingInputContainer>
          <div>
            <Link to={`/article/${id}`}>
              <BackBtn>Back</BackBtn>
            </Link>
            <WriteBtn>Sell</WriteBtn>
          </div>
        </div>
      </CreateArticlePageContainer>
    </MainLayout>
  );
};

export default SellArticlePage;
