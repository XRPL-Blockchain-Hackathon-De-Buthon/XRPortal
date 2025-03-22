import React from 'react';
import InputComponent from '../../components/input/input';
import MainLayout from "../../layouts/main";

const WalletGenPage = () => {
  return (
    <MainLayout>
        <InputComponent
        inputTitle="지갑 등록하기"
        inputs={[
            {
            inputLabel: "지갑 주소",
            placeholder: "지갑 주소 입력",
            inputId: "wallet"
            }
        ]}
        buttonLabel="지갑 생성하기"
        />
    </MainLayout>
  );
};

export default WalletGenPage;
