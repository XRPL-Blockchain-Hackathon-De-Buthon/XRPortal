// AdvertisementInfoComponent.style.js
import styled from '@emotion/styled';

export const BackgroundContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  background: #222222;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const XRPLTitle = styled.div`
  color: #ffffff;
  font-size: 28px;
  line-height: 34px;
  font-weight: 700;
`;

export const OverlayBorder = styled.div`
  width: 100%;
  height: 154px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const XRPLOverlayText = styled.div`
  color: #dddddd;
  
  font-size: 15.63px;
  line-height: 19px;
  font-weight: 400;
  text-align: center;
  
  & > div {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  
  & > div > span:nth-of-type(2) {
    color: transparent;
  }
`;

/* 공통 정보 레이아웃 */
export const InfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const InfoBlock = styled.div`
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.div`
  color: #dddddd;
  
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  margin-bottom: 5px;
`;

export const InfoContainer = styled.div`
  background: #333333;
  border: 1px solid #555555;
  border-radius: 8px;
  padding: 10px 13px;
`;

export const InfoText = styled.div`
  color: #888888;
  
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
`;

/* 클릭수 표시 */
export const ClickedContainer = styled.div`
  background: #333333;
  border: 1px solid #555555;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
`;

export const ClickedText = styled.div`
  color: #cccccc;
  text-decoration: underline;
  
  font-size: 30px;
  line-height: 36px;
  font-weight: 700;
`;

/* Deployed 표시 */
export const DeployedContainer = styled.div`
  background: #333333;
  border: 1px solid #555555;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
`;

export const DeployedText = styled.div`
  color: #2ed573;
  
  font-size: 30px;
  line-height: 36px;
  font-weight: 700;
`;

/* 구분선 */
export const Divider = styled.div`
  width: 100%;
  border-top: 1px solid rgba(221, 221, 221, 0.05);
`;
