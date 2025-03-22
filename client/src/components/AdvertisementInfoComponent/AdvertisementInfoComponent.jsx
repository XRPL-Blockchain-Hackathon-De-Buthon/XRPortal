// AdvertisementInfoComponent.jsx
import React, { useEffect, useState } from 'react';
import {
  BackgroundContainer,
  XRPLTitle,
  OverlayBorder,
  XRPLOverlayText,
  InfoRow,
  InfoBlock,
  Label,
  InfoContainer,
  InfoText,
  ClickedContainer,
  ClickedText,
  DeployedContainer,
  DeployedText,
  Divider,
} from './AdvertisementInfoComponent.style';

import { $api } from '../../utils/axios';

const AdvertisementInfoComponent = ({ ad_id }) => {
  // 서버에서 받아오는 광고 데이터를 저장할 상태
  const [advertisementData, setAdvertisementData] = useState(null);

  useEffect(() => {
    getAdvertisement();
  }, []);

  // 광고 정보를 서버에서 GET 요청으로 받아온다
  const getAdvertisement = async () => {
    try {
      // 예: /ads/:id/views 경로가 실제 API라면
      const res = await $api.get(`/ads/${ad_id}/views`);
      setAdvertisementData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 아직 데이터를 받아오지 못했을 때 null guard
  if (!advertisementData) {
    return <div>Loading...</div>;
  }

  return (
    <BackgroundContainer>
      {/* 광고 제목(있다면) */}
      <XRPLTitle>{advertisementData.ad_title}</XRPLTitle>

      {/* 광고 이미지 표시 (ad_content = 이미지 URL) */}
      <OverlayBorder>
        <XRPLOverlayText>
          <div>
            {advertisementData.ad_content && (
              <img 
                src={advertisementData.ad_content} 
                alt="광고 이미지" 
                style={{ maxWidth: '100%', maxHeight: '150px' }}
              />
            )}
          </div>
        </XRPLOverlayText>
      </OverlayBorder>

      {/* 시작일, 종료일 */}
      <InfoRow>
        <InfoBlock>
          <Label>시작일</Label>
          <InfoContainer>
            <InfoText>{advertisementData.start_date}</InfoText>
          </InfoContainer>
        </InfoBlock>
        <InfoBlock>
          <Label>종료일</Label>
          <InfoContainer>
            <InfoText>{advertisementData.end_date}</InfoText>
          </InfoContainer>
        </InfoBlock>
      </InfoRow>

      <Divider />

      {/* 클릭수, 상태 */}
      <InfoRow>
        <InfoBlock>
          <Label>클릭수</Label>
          <ClickedContainer>
            <ClickedText>{advertisementData.click_count}</ClickedText>
          </ClickedContainer>
        </InfoBlock>
        <InfoBlock>
          <Label>상태</Label>
          <DeployedContainer>
            <DeployedText>{advertisementData.status}</DeployedText>
          </DeployedContainer>
        </InfoBlock>
      </InfoRow>

      <Divider />
    </BackgroundContainer>
  );
};

export default AdvertisementInfoComponent;

