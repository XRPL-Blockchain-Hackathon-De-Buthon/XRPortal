// AdvertiseInputPreview.jsx
import React, { useState } from 'react';
import { 
  Title, 
  InputBox, 
  InputPlaceholder, 
  FileInputBox,
  FileInput,
  ButtonWrapper, 
  ButtonText,
  PreviewBox,
  PreviewText
} from './advertiseRegisterScreen.style';

const AdvertiseInputPreview = ({ step, onRegister, adTitle, adContent, setAdTitle, setAdContent }) => {
  
  const [adfile, setAdFile] = useState('');

  if (step === 'input') {
    return (
      <>
        <Title>광고 등록</Title>
        <InputBox>
          <InputPlaceholder 
            placeholder="광고 제목"
            value={adTitle}
            onChange={(e) => setAdTitle(e.target.value)}
          />
        </InputBox>
        <FileInputBox>
          <FileInput 
            type="file" 
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setAdContent(file);
                  setAdFile(reader.result);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </FileInputBox>
        <ButtonWrapper onClick={onRegister}>
          <ButtonText>광고 등록</ButtonText>
        </ButtonWrapper>
      </>
    );
  } else if (step === 'fee') {
    return (
      <>
        <Title>광고 등록</Title>
        <PreviewBox>
          <PreviewText>
            <h2>{adTitle}</h2>
            <br/>
            {adfile && (
              <img 
                src={adfile} 
                alt="광고 미리보기" 
                style={{ maxWidth: '100%', maxHeight: '300px' }} 
              />
            )}
          </PreviewText>
        </PreviewBox>
      </>
    );
  }
  return null;
};

export default AdvertiseInputPreview;
