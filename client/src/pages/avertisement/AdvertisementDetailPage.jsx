// AdvertisementDetailPage.jsx
import React from 'react';
import MainLayout from '../../layouts/main';
import { PageWrapper } from './AdvertisementDetailPage.style';
import AdvertisementInfoComponent from '../../components/AdvertisementInfoComponent/AdvertisementInfoComponent';
import { useParams } from 'react-router-dom';


const AdvertisementDetailPage = () => {
  const { id } = useParams();

  return (
    <MainLayout isSidebar={false}>
      <PageWrapper>
        <AdvertisementInfoComponent ad_id={id}/>
      </PageWrapper>
    </MainLayout>
  );
};

export default AdvertisementDetailPage;

