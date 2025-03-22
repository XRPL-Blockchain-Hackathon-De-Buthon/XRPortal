import React, { useEffect, useState } from "react";
import MainLayout from "../../../layouts/main";
import {
  HeaderContent,
  HeaderWrapper,
  ListContainer,
  Wrapper,
} from "./advertisement.style";
import AdvertisementItemComponent from "../../../components/advertisement-item/advertisement-item";
import { Link } from "react-router-dom";
import useUserStore from "../../../store/auth";
import { $api } from "../../../utils/axios";

const ADVERTISEMENT_TYPE = ["ALL", "ACTIVE", "DEACTIVE"];

const MyAdvertisementPage = () => {
  // ACTIVE, DEACTIVE, ALL
  const [advertisementType, setAdvertisementType] = useState("ALL");
  const [advertisementList, setAdvertisementList] = useState([]);
  const { user } = useUserStore();

  useEffect(() => {
    if (!user || !user.id) return;

    fetchAds(user.id);
  }, [user, advertisementType]);

  const fetchAds = async (userId) => {
    try {
      const response = await $api.get(`/ads/user/${userId}`);

      if (response.data) {
        setAdvertisementList(
          response.data.filter((v) =>
            advertisementType === "ALL" ? true : v.status === advertisementType
          )
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <MainLayout isSidebar={true} width={1024}>
      <Wrapper>
        <HeaderWrapper>
          {ADVERTISEMENT_TYPE.map((v, i) => (
            <HeaderContent
              onClick={() => setAdvertisementType(v)}
              isFocus={advertisementType === v}
            >
              {v}
            </HeaderContent>
          ))}
        </HeaderWrapper>
        <ListContainer>
          {advertisementList.map((advertisement) => (
            <Link to={`/advertise/${advertisement.id}`}>
              <AdvertisementItemComponent
                key={advertisement.id}
                advertisement={advertisement}
              />
            </Link>
          ))}
        </ListContainer>
      </Wrapper>
    </MainLayout>
  );
};

export default MyAdvertisementPage;
