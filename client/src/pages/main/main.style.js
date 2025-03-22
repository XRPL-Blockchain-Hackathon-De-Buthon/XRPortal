import styled from '@emotion/styled';

export const MainContainer = styled.div`
  width: 100%;
`;

export const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  column-gap: 20px;
  margin-bottom: 24px;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  font-size: 16px;
  box-sizing: content-box;
  color: ${props => props.isFocus ? '#7B43E6' : '#DDD'};
  cursor: pointer;

  border-bottom: ${props => props.isFocus ? '2px solid #7B43E6' : ''};

  &:hover {
    color: #7B43E6;
  }
`;

export const ArticleListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;