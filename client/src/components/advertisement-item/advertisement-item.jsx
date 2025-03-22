import React from "react";
import {
  AdvertisementInfo,
  AdvertisementItemContainer,
  AdvertisementLeftContent,
  AdvertisementRightContent,
  StatusContainer,
} from "./advertisement-item.style";

const AdvertisementItemComponent = ({ advertisement }) => {
  return (
    <AdvertisementItemContainer>
      <AdvertisementLeftContent>
        <span>{advertisement.title}</span>
        <AdvertisementInfo>
          {advertisement.startDate} ~ {advertisement.endDate} | 클릭수:{" "}
          {advertisement.clickCount}
        </AdvertisementInfo>
      </AdvertisementLeftContent>
      <AdvertisementRightContent>
        <StatusContainer isActive={advertisement.status === "ACTIVE"}>
          {advertisement.status === "ACTIVE" ? "✅ 활성화됨" : "️일시 중지됨"}
        </StatusContainer>
      </AdvertisementRightContent>
    </AdvertisementItemContainer>
  );
};

export default AdvertisementItemComponent;
