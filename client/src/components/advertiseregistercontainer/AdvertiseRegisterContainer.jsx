// AdvertiseRegisterContainer.jsx
import React, { useState } from 'react';
import { Wrapper } from './advertiseRegisterScreen.style';
import AdvertiseInputPreview from './AdvertiseInputPreview';
import AdvertiseFee from './AdvertiseFee';
import { useNavigate } from 'react-router-dom';


import useUserStore from '../../store/auth';
import { $api } from '../../utils/axios';


const AdvertiseRegisterContainer = () => {
  const [step, setStep] = useState('input'); // 'input' 또는 'fee'
  const [adTitle, setAdTitle] = useState('');
  const [adContent, setAdContent] = useState('');

  // 날짜 관련 상태
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [estimatedTokens, setEstimatedTokens] = useState(0);

  // 사용자 아이디
  const { user, setUser } = useUserStore();

    const navigate = useNavigate();
  

  // 날짜 차이를 계산하여 토큰 수(1일 당 100토큰)를 반환하는 함수
  const calculateTokens = (start, end) => {
    if (start && end) {
      const startDt = new Date(start);
      const endDt = new Date(end);
      const diffTime = endDt.getTime() - startDt.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays * 100 : 0;
    }
    return 0;
  };

  const handleStartDateChange = (e) => {
    const value = e.target.value;
    setStartDate(value);
    setEstimatedTokens(calculateTokens(value, endDate));
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value;
    setEndDate(value);
    setEstimatedTokens(calculateTokens(startDate, value));
  };

  const handleRegister = () => {
    // 광고 등록 버튼 클릭 시 미리보기 단계로 전환
    setStep('fee');
  };

  // const handleSubmit = () => {
  //   axios.post('http://localhost:3000/ads/create', {
  //     ad_title: adTitle,
  //     start_date: startDate,
  //     end_date: endDate,
  //     user_id: user ,
  //     ad_price: estimatedTokens,
  //     ad_image: adContent,
  //   })
  //   .then((res) => {
  //     alert('광고 등록 성공');
  //   })
  //   .catch((err) => {
  //     alert('광고 등록 실패');
  //   })
  // }
  const handleSubmit = () => {

  const formData = new FormData();
    formData.append('ad_title', adTitle);
    formData.append('start_date', startDate);
    formData.append('end_date', endDate);
    formData.append('user_id', 1);
    formData.append('ad_price', estimatedTokens);
    formData.append('ad_image', adContent);
  
    $api.post('/ads/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      alert('광고 등록 성공');
      navigate('/');
    })
    .catch((err) => {
      alert('광고 등록 실패');
    });
  };

  return (
    <Wrapper>
      <AdvertiseInputPreview
        step={step}
        onRegister={handleRegister}
        adTitle={adTitle}
        adContent={adContent}
        setAdTitle={setAdTitle}
        setAdContent={setAdContent}
      />
      {step === 'fee' && (
        <AdvertiseFee
          startDate={startDate}
          endDate={endDate}
          estimatedTokens={estimatedTokens}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
          handleSubmit={handleSubmit}
        />
      )}
    </Wrapper>
  );
};

export default AdvertiseRegisterContainer;
