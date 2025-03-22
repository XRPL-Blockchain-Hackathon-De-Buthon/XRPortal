// advertiseRegisterScreen.style.js
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  padding: 32px;
  background: #222222;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 4px 12px rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Title = styled.div`
  color: #ffffff;
  
  font-size: 24px;
  font-weight: 700;
  line-height: 29px;
  text-align: center;
`;

export const InputBox = styled.div`
  width: 100%;
  height: 44px;
  border-radius: 8px;
  background: #333333;
  border: 1px solid #555555;
  display: flex;
  align-items: center;
  padding: 0 13px;
`;

export const InputPlaceholder = styled.input`
  color: #dddddd;
  
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  background: transparent;
  border: none;
  width: 100%;
  outline: none;

  &::placeholder {
    color: #888888;
  }
`;

export const TextareaBox = styled.div`
  width: 100%;
  height: 168px;
  border-radius: 8px;
  background: #333333;
  border: 1px solid #555555;
  padding: 14px 13px;
  display: flex;
  align-items: flex-start;
`;

/* 기존 텍스트 입력 textarea 대신 이미지 파일 입력용 스타일 */
export const FileInputBox = styled.div`
  width: 100%;
  height: 168px;
  border-radius: 8px;
  background: #333333;
  border: 1px solid #555555;
  padding: 14px 13px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FileInput = styled.input`
  color: #dddddd;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  background: transparent;
  border: none;
  width: 100%;
  height: 100%;
  outline: none;
`;

export const TextareaPlaceholder = styled.textarea`
  color: #dddddd;
  
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  background: transparent;
  border: none;
  width: 100%;
  height: 100%;
  resize: none;
  outline: none;

  &::placeholder {
    color: #888888;
  }
`;


export const ButtonWrapper = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  background: linear-gradient(90deg, rgba(123, 67, 230, 1) 0%, rgba(174, 93, 253, 1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
`;

export const ButtonText = styled.div`
  color: #ffffff;
  
  font-size: 18px;
  line-height: 22px;
  font-weight: 700;
  text-align: center;
`;

export const SectionTitle = styled.div`
  color: #ffffff;
  
  font-size: 24px;
  font-weight: 700;
  line-height: 29px;
  text-align: center;
  margin-top: 32px;
`;

export const InputRow = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
`;

export const Label = styled.div`
  color: #dddddd;
  
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  margin-bottom: 4px;
`;

export const EstimatedBox = styled.div`
  width: 100%;
  height: 45px;
  border-radius: 8px;
  border: 1px solid #555555;
  background: rgba(51, 51, 51, 0);
  padding: 0 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const EstimatedText = styled.div`
  color: #888888;
  
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
`;

export const TokenUnit = styled.div`
  color: #7B43E6;
  
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  text-align: center;
`;

export const PreviewBox = styled.div`
  width: 100%;
  min-height: 150px;
  padding: 16px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const PreviewText = styled.div`
  width: 100%;
  color: #dddddd;
  
  font-size: 15.63px;
  line-height: 19px;
  font-weight: 400;

  span:nth-of-type(2) {
    color: transparent;
  }
`;

// 날짜 입력 전용 컴포넌트 (InputPlaceholder와 스타일 동일하게 사용 가능)
export const DateInput = styled.input`
  color: #888888;
  
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  background: transparent;
  border: none;
  width: 100%;
  &::placeholder {
    color: #888888;
  }
`;