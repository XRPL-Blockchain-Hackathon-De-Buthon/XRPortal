import styled from '@emotion/styled'

export const ProfileCardContainer = styled.div`
  width: 49%;
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  h2 {
    font-size: 20px;
    font-weight: bold;
    color: #DDDDDD;
  }
`


export const ProfileCardContent = styled.div`
  padding: 24px;
  border: 1px solid rgba(255,255,255,0.1);
  background-color: rgba(255,255,255,0.05);
  border-radius: 8px;

  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 16px;

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: white;
  }

  .profileInfo {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
   
    .name {
      color: #ffffff;
      font-weight: bold;
    font-size: 16px;
    }

    .id {
      color: #AAAAAA;
      font-size: 14px;
    }
  }
`