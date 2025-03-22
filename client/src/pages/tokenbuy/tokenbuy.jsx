import React from 'react';
import InputComponent from '../../components/input/input';
import MainLayout from "../../layouts/main";

const TokenBuyPage = () => {
  return (
    <MainLayout>
        <InputComponent
        inputTitle="토큰 구매하기"
        inputs={[
            {
            inputLabel: "구매할 토큰량 설정 (XRPT)",
            placeholder: "구매할 토큰량 입력",
            inputId: "token_amount"
            }
        ]}
        buttonLabel="구매하기"
        />
    </MainLayout>
  );
};

export default TokenBuyPage;
