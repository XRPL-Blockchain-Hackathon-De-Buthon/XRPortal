// AdvertiseRegisterPage.jsx
import React from 'react';
import MainLayout from "../../layouts/main";
import AdvertiseRegisterContainer from '../../components/advertiseregistercontainer/AdvertiseRegisterContainer';

const AdvertiseRegisterPage = () => {
  return (
    <MainLayout isSidebar={false}>
      <AdvertiseRegisterContainer />
    </MainLayout>
  );
};

export default AdvertiseRegisterPage;
