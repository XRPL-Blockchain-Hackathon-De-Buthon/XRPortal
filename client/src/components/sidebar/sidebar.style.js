import styled from '@emotion/styled';

export const SidebarWrapper = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;

export const SidebarContainer = styled.ul`
  background-color: #181818;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  list-style: none;
`;

export const SidebarItem = styled.li`
  width: 100%;
  color: ${props => props.isFocus ? '#7B43E6' : '#DDD'};
  font-size: 14px;
  border-radius: 6px;
  padding: 12px;
  cursor: pointer;

  &:hover {
    background-color: #222222;
  }
`

export const LoginText = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #8000FF;
  text-decoration: none;
`