import styled from '@emotion/styled';

export const CommentWrapper = styled.div`
  width: 100%;
`

export const CommentInputForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 12px;

  h2 {
    font-size: 16px;
    color: #DDDDDD;
    font-weight: bold;
  }

  form {
    width: 100%;
  }

  textarea {
    width: 100%;
    font-size: 14px;
    height: 60px;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #444444;
    background-color: #333333;
    outline: none;
    resize: none;
    color: #DDDDDD;

    &::placeholder {
      color: #757575;
    }
  }
`

export const RespondBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  button {
    width: auto;
    cursor: pointer;
    padding: 10px;
    border-radius: 8px;
    background-image: linear-gradient(to right, #2ED573, #55EFC4);
    color: #FFFFFF;
    border: none;
  }
`

export const CommentList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 12px; 
`

export const CommentItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  column-gap: 12px;
  padding: 8px 0;
`

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 4px;

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: white;
  }

  .profileInfo {
    width: 80px;
    display: flex;
    flex-direction: column;
    font-size: 12px;

    span {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
`

export const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  .commentHeader {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    column-gap: 8px;
    font-size: 14px;

    .createdAt {
      color: #AAAAAA;
      text-decoration: underline;
    }

    .like {
      color: #CCCCCC;
      text-decoration: underline;
    }
  }

  .content {
    padding: 12px;
    border: 1px solid rgba(255,255,255,0.1);
    background-color: #181818;
    font-size: 16px;
    color: #DDDDDD;
    border-radius: 8px;
  }
`