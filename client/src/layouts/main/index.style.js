import styled from '@emotion/styled';

export const MainLayoutWrapper = styled.section`
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #111111;

  row-gap: 70px;
`;

export const MainContentWrapper = styled.div`
  display: flex;
  justify-content: ${props => props.isSidebar ? 'space-between' : 'center'};
  align-items: flex-start;
  width: ${props => props.width}px;
  column-gap: 40px;
  padding-bottom: 64px;
`;

export const ContentWrapper = styled.div`
  width: ${props => props.width}px;
`;