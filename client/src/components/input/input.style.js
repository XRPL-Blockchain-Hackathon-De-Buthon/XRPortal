// InputComponent.style.js
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 800px;
  padding: 40px 32px;
  background: #222222;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 4px 12px rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 24px;


  .inputContainer {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
  }
`;

export const Title = styled.div`
  color: #ffffff;
  
  font-size: 24px;
  line-height: 29px;
  font-weight: 700;
  text-align: center;
`;

export const Label = styled.label`
  color: #dddddd;
  
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  margin-bottom: 4px;
`;

export const InputBox = styled.div`
  width: 100%;
  height: 44px;
  padding: 50PX;
  border-radius: 8px;
  background: #333333;
  border: 1px solid #555555;
  display: flex;
  align-items: center;
  padding: 0 13px;
`;

export const InputField = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  color: #dddddd;
  
  font-size: 16px;
  line-height: 19px;

  &::placeholder {
    color: #888888;
  }

  &:focus {
    outline: none;
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
  cursor: pointer;
  border: none;
`;

export const ButtonText = styled.div`
  color: #ffffff;
  
  font-size: 18px;
  line-height: 22px;
  font-weight: 700;
  text-align: center;
`;
