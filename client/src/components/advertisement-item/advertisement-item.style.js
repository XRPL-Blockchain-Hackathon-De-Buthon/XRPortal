import styled from '@emotion/styled';

export const AdvertisementItemContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(0, 0, 0, 0.05);
  cursor: pointer;

  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
`;

export const AdvertisementLeftContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  font-size: 18px;
  color: #DDD;
`;

export const StatusContainer = styled.div`
  color: ${props => props.isActive ? '#28A745' : '#FFCC00'};
  font-size: 14px;
  font-weight: bold;
`

export const AdvertisementInfo = styled.div`
  font-size: 12px;
  color: #AAAAAA;
`;

export const AdvertisementRightContent = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
`

export const CountText = styled.div`
  cursor: pointer;
  font-size: 14px;
  color: ${props => props.isAmount ? '#28A745' : '#CCCCCC'};
`

export const IconBtn = styled.div`
  cursor: pointer;
  font-size: 14px;
  
`