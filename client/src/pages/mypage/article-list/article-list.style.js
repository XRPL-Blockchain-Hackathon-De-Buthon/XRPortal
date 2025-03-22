import styled from '@emotion/styled';

export const MyArticlesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`

export const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  column-gap: 20px;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  font-size: 14px;
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