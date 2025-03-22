// pages/signup/SingUpPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputComponent from '../../components/input/input';
import MainLayout from "../../layouts/main";
import axios from 'axios';
import { $api } from '../../utils/axios';

const SingUpPage = () => {
  const navigate = useNavigate();
  
  // 회원가입 입력 필드 상태 관리
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSignUp = async () => {
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 회원가입 요청
    const res = await $api.post('/users/signup', {
      user_name: name,
      user_email: email,
      user_pw: password,
      user_wallet_address : '0x1234567890123456789012345678901234567890',
      user_token_balance : 0
    })

    if (res.status === 200 || res.status === 201) {
      alert('회원가입 성공');
      navigate('/login'); // 회원가입 후 로그인 페이지로 이동
    } else {
      console.log(res);
      alert('회원가입 실패');
    }
  
  };

  return (
    <MainLayout>
      <InputComponent
        inputTitle="회원가입 하기"
        inputs={[
          {
            inputLabel: "이름",
            placeholder: "이름 입력",
            inputId: "name",
            value: name,
            onChange: (e) => setName(e.target.value),
          },
          {
            inputLabel: "이메일",
            placeholder: "이메일 입력",
            inputId: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
          },
          {
            inputLabel: "비밀번호",
            placeholder: "비밀번호 입력",
            inputId: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
          },
          {
            inputLabel: "비밀번호 확인",
            placeholder: "비밀번호 확인",
            inputId: "passwordConfirm",
            value: passwordConfirm,
            onChange: (e) => setPasswordConfirm(e.target.value),
          }
        ]}
        buttonLabel="Sign up"
        onSubmit={handleSignUp}  // InputComponent 내 버튼 클릭 시 호출됨
      />
    </MainLayout>
  );
};

export default SingUpPage;
