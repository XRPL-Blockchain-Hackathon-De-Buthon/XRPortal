import styled from '@emotion/styled';

export const CreateArticlePageContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  background-color: #222222;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 24px;

  display: flex;
  flex-direction: column;
  row-gap: 24px;

  & > div {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    align-items: center;
    justify-content: center;
  }
`;

export const Header = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 2px solid rgba(255,255,255,0.1);
  font-size: 28px;
  font-weight: bold;
  padding-bottom: 16px;
  color: #DDDDDD;
`

export const TextInput = styled.textarea`
  resize: none;
  width: 100%;
  height: 200px;
  padding: 12px; 
  background-color: #333333;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  outline: none;
  color: #DDDDDD;

  &::placeholder {
    color: #888888;
  }
`

export const BackBtn = styled.button`
  padding: 12px 16px;
  border-radius: 8px;
  color: #DDDDDD;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  background-color: rgba(255,255,255,0.05);
  border: none;
  outline: none;
  margin-right: 12px;
`

export const WriteBtn = styled.button`
  padding: 12px 16px;
  border-radius: 8px;
  color: #DDDDDD;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  background-image: linear-gradient(to right, #7B43E6, #AE5DFD);
  border: none;
  outline: none;
`

export const MintingDescription = styled.div`
  font-size: 16px;
  color: #DDDDDD;
  width: 500px;
  text-align: start;
`

export const MintingInputContainer = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  color: #DDDDDD;
  font-size: 20px;
  font-weight: bold;

  h2 {
    font-size: 20px;
    font-weight: bold;
  }

  span {
    padding: 14px;
    border-radius: 8px;
    border: 1px solid #555555;
    background-color: #333333;
    color: #DDDDDD;
    outline: none;

    &::placeholder {
      color: #888888;
    }
  }
`