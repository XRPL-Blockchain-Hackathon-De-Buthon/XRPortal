// AdvertiseFee.jsx
import React from 'react';
import { 
  SectionTitle, 
  InputRow, 
  Label, 
  InputBox, 
  DateInput, 
  EstimatedBox, 
  EstimatedText, 
  TokenUnit, 
  ButtonWrapper, 
  ButtonText 
} from './advertiseRegisterScreen.style';

const AdvertiseFee = ({ 
  startDate, 
  endDate, 
  estimatedTokens, 
  onStartDateChange, 
  onEndDateChange,
  handleSubmit
}) => {
  return (
    <>
      <SectionTitle>광고비 지불</SectionTitle>
      <InputRow>
        <div style={{ flex: 1 }}>
          <Label>시작일</Label>
          <InputBox>
            <DateInput 
              type="date" 
              value={startDate}
              onChange={onStartDateChange}
            />
          </InputBox>
        </div>
        <div style={{ flex: 1 }}>
          <Label>종료일</Label>
          <InputBox>
            <DateInput 
              type="date" 
              value={endDate}
              onChange={onEndDateChange}
            />
          </InputBox>
        </div>
      </InputRow>
      <div>
        <Label>예상 지불 토큰량</Label>
        <EstimatedBox>
          <EstimatedText>{estimatedTokens}</EstimatedText>
          <TokenUnit>XRPT</TokenUnit>
        </EstimatedBox>
      </div>
      <ButtonWrapper onClick={handleSubmit}>
        <ButtonText>광고 등록</ButtonText>
      </ButtonWrapper>
    </>
  );
};

export default AdvertiseFee;
