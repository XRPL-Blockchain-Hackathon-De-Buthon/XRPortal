// InputComponent.jsx
import React from 'react';
import {
  Wrapper,
  Title,
  Label,
  InputBox,
  InputField,
  ButtonWrapper,
  ButtonText
} from './input.style';

const InputComponent = ({ inputTitle, inputs, buttonLabel, onSubmit  }) => {
    const handleClick = (e) => {
        e.preventDefault();
        onSubmit && onSubmit();
      };
    

  return (
    <Wrapper>
      <Title>{inputTitle}</Title>

      {inputs.map(({ inputLabel, placeholder, inputId, value, onChange }) => (
        <div className="inputContainer" key={inputId}>
          <Label htmlFor={inputId}>{inputLabel}</Label>
          <InputBox>
            <InputField
              id={inputId}
              placeholder={placeholder}
              name={inputId}
              type={inputId === "password" ? "password" : "text"}
              value={value}
              onChange={onChange}
            />
          </InputBox>
        </div>
      ))}
      <ButtonWrapper type="submit" onClick={handleClick}>
        <ButtonText>{buttonLabel}</ButtonText>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default InputComponent;
