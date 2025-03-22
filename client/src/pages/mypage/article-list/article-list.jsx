import React, { useEffect, useState } from "react";
import MainLayout from "../../../layouts/main";
import {
  ArticleListContainer,
  HeaderContent,
  HeaderWrapper,
  Wrapper,
} from "./article-list.style";
import ArticleItemComponent from "../../../components/article-item/article-item";
import useUserStore from "../../../store/auth";
import { Link } from "react-router-dom";
import { $api } from "../../../utils/axios";

const MyArticleListPage = () => {
  const [articleType, setArticleType] = useState("OWNED");
  const [articleList, setArticleList] = useState([]);
  const { user } = useUserStore();

  useEffect(() => {
    if (!user) return;

    fetchMyArticleList();
  }, [articleType, user]);

  const fetchMyArticleList = async () => {
    try {
      const response = await $api.get(`/posts/user/${user.id}`);
      if (response.data) {
        if (articleType === "OWNED") {
          setArticleList(response.data.filter(v => v.owner_id === user.id));
        } else if (articleType === "CREATED") {
          setArticleList(response.data.filter(v => v.writer_id === user.id));
        }
      } else {
        setArticleList([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <MainLayout isSidebar={true} width={1024}>
      <Wrapper>
        <HeaderWrapper>
          <HeaderContent
            onClick={() => setArticleType("OWNED")}
            isFocus={articleType === "OWNED"}
          >
            Owned
          </HeaderContent>
          <HeaderContent
            onClick={() => setArticleType("CREATED")}
            isFocus={articleType === "CREATED"}
          >
            Created
          </HeaderContent>
        </HeaderWrapper>
        <ArticleListContainer>
          {articleList.map((article) => (
            <Link to={`/article/${article.id}`}>
              <ArticleItemComponent key={article.id} article={article} />
            </Link>
          ))}
        </ArticleListContainer>
      </Wrapper>
    </MainLayout>
  );
};

export default MyArticleListPage;
