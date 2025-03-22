import React, { useEffect, useState } from "react";
import {
  CommentContainer,
  CommentInputForm,
  CommentItemContainer,
  CommentList,
  CommentWrapper,
  ProfileContainer,
  RespondBtnContainer,
} from "./comment-list.style";
import { $api } from "../../../utils/axios";
import useUserStore from "../../../store/auth";

const CommentItem = ({ comment }) => {
  return (
    <CommentItemContainer>
      <ProfileContainer>
        <img
          src="https://avatars.githubusercontent.com/u/102665117?v=4"
          alt="profile"
        />
        <div className="profileInfo">
          {/* TODO: wallet info 로 수정 */}
          <span style={{ color: "#FFFFFF" }}>asdsadasd</span>
          <span style={{ color: "#AAAAAA" }}>{comment.user_id}</span>
        </div>
      </ProfileContainer>
      <CommentContainer>
        <div className="commentHeader">
          <span className="createdAt">{comment.createdAt}</span>
          <span className="like">👍🏼 {comment.likeCount}</span>
        </div>
        <div className="content">{comment.comment_content}</div>
      </CommentContainer>
    </CommentItemContainer>
  );
};

const CommentListComponent = ({ articleId }) => {
  const { user } = useUserStore();
  const [comments, setComments] = useState([]);
  const [commentInputValue, setCommentInputValue] = useState("");

  useEffect(() => {
    if (!articleId) return;

    fetchComments(articleId);
  }, [articleId]);

  const fetchComments = async (id) => {
    try {
      const response = await $api.get(`/comments/${id}/read`);
      if (response.data) {
        setComments(response.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmitComment = async (e) => {
    e.preventDefault();

    if (!commentInputValue && !user && !articleId) return;

    try {
      const _ = await $api.post("/comments/create", {
        post_id: articleId,
        user_id: user.id,
        comment_content: commentInputValue,
      });
      setCommentInputValue("");
      fetchComments(articleId);
    } catch (e) {
      console.error("failed to comment submit");
    }
  };

  return (
    <CommentWrapper>
      <CommentInputForm onSubmit={onSubmitComment}>
        <h2>Comments</h2>
        <textarea
          resize={false}
          multiline={true}
          placeholder="댓글을 입력하세요."
          value={commentInputValue}
          onChange={(e) => setCommentInputValue(e.target.value)}
        ></textarea>
        <RespondBtnContainer>
          <button>Respond</button>
        </RespondBtnContainer>
      </CommentInputForm>
      <CommentList>
        {comments.map((v, i) => (
          <CommentItem comment={v} key={i} />
        ))}
      </CommentList>
    </CommentWrapper>
  );
};

export default CommentListComponent;
