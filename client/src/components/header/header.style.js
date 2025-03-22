import styled from '@emotion/styled';

export const HeaderWrapper = styled.header`
  width: 100vw;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 3px solid #8000FF;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1024px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderContentContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  flex-direction: row;
  column-gap: 8px;
`;

export const Logo = styled.div`
  font-size: 24px;
  color: #8000FF;
  text-align: center;
  text-decoration: italic;
  margin-right: 8px;
`;

export const HeaderText = styled.div`
  font-size: 14px;
  color: #DDD;
  text-align: center;
  cursor: pointer;
`;

export const HeaderBtn = styled.button`
  padding: 8px 12px;
  font-size: 14px;
  background-color: #8000FF;
  color: #DDD;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`