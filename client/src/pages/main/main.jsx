import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/main";
import {
  HeaderContent,
  HeaderWrapper,
  MainContainer,
  ArticleListContainer,
} from "./main.style";
import ArticleItemComponent from "../../components/article-item/article-item";
import { $api } from "../../utils/axios";
import { Link } from "react-router-dom";

const ARTICLE_TYPE = [
  { key: "Recent", value: "latest" },
  { key: "Like", value: "likes" },
  { key: "Hot", value: "views" },
  { key: "Sale", value: "sale" },
];

const MainPage = () => {
  const [articleType, setArticlType] = useState("Recent");
  const [articleList, setArticleList] = useState([]);

  const fetchrticleList = async () => {
    try {
      const response = await $api.get(
        `/posts/all?sort=${
          ARTICLE_TYPE.find((v) => v.key === articleType).value
        }`
      );
      if (response.data) {
        setArticleList(response.data);
      } else {
        setArticleList([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchrticleList();
  }, [articleType]);

  return (
    <>
      <MainLayout isSidebar={true}>
        <MainContainer>
          <HeaderWrapper>
            {ARTICLE_TYPE.map((v, i) => (
              <HeaderContent
                isFocus={v.key === articleType}
                key={i}
                onClick={() => setArticlType(v.key)}
              >
                {v.key}
              </HeaderContent>
            ))}
          </HeaderWrapper>
          <ArticleListContainer>
            {articleList.map((article) => (
              <Link to={`/article/${article.id}`}>
                <ArticleItemComponent key={article.id} article={article} />
              </Link>
            ))}
          </ArticleListContainer>
        </MainContainer>
      </MainLayout>
    </>
  );
};

export default MainPage;
