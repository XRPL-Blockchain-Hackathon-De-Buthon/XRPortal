import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  AdWrapper,
  ArticleContainer,
  ArticleHeader,
  ArticleInfoContainer,
  MintBtn,
  Profile,
} from "./article.style";
import ArticleContentComponent from "./content/article-content";
import CommentListComponent from "./comment-list/comment-list";
import useUserStore from '../../store/auth';

import { Link } from "react-router-dom";
import { $api } from '../../utils/axios';


const ArticleComponent = ({ articleId,setIsMintModalOpen, article, onClickLike }) => {
  const [ad, setAd] = useState(null);
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  console.log('ArticleComponent', articleId);
  

  useEffect(() => {
    if (!articleId) return;

    fetchAd(articleId);
  }, [articleId]);

  const fetchAd = async (id) => {
    try {
      const response = await $api.get(`/ads/${id}/read`);
      if (response.data) {
        setAd(response.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleClickAdvertise = async (id) => {
    console.log( id);
    console.log( articleId);
    console.log( user);
    try {
          const res = await $api.post(`/ads/${id}/click`, {
            post_id: articleId,
            user_id: user
          });
          navigate(`/advertise/${id}`);
        }
        catch (err) {   console.error(err);}
    if (!ad) return;
    
  }

  return (
    <ArticleContainer>
      <ArticleHeader>
        <h1>{article.post_title}</h1>
        <ArticleInfoContainer>
          <Profile>
            <img
              src="https://avatars.githubusercontent.com/u/66717787?v=4"
              alt="profile"
            />
            <span>{article.writer_id}</span>
          </Profile>
          <span>0x1ac95039</span>
          <span>{article.createdAt}</span>
          <span style={{ color: "#CCC", textDecoration: "underline" }}>
            👁 {article.view_count}
          </span>
          <span style={{ color: "#CCC", textDecoration: "underline" }}>
            👍🏼 {article.likeCount}
          </span>
          {!!article.sale_status && (
            <span style={{ color: "#28A745", textDecoration: "underline" }}>
              {article.price} DBT
            </span>
          )}
        </ArticleInfoContainer>
        {!article.sale_status && (
          <Link to={`/article/sell/${article.id}`}>
            <MintBtn style={{ position: "absolute", top: "0", right: "0" }}>
              Sell
            </MintBtn>
          </Link>
        )}
      </ArticleHeader>
      <ArticleContentComponent
        setIsMintModalOpen={setIsMintModalOpen}
        article={article}
        onClickLike={onClickLike}
      />
      <CommentListComponent articleId={articleId} />
      {ad ? (
        <a href='https://www.google.com' onClick={() => handleClickAdvertise(ad.id)}><AdWrapper isBorder={!ad}>
          <img src={ad.ad_content} alt="ad" />
        </AdWrapper></a>
      ) : (
        <AdWrapper isBorder={!!ad}>
          🚀 XRPL 기반 광고 | 빠르고 저렴한 트랜잭션
        </AdWrapper>
      )}
    </ArticleContainer>
  );
};

export default ArticleComponent;
