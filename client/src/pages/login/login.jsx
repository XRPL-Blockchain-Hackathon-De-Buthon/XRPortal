// pages/login/login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputComponent from '../../components/input/input';
import MainLayout from "../../layouts/main";
import useUserStore from '../../store/auth';
import { $api } from '../../utils/axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useUserStore();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert('이메일과 비밀번호를 입력해주세요');
        return;
      }

      const res = await $api.post('users/login', {
        user_email: email,
        user_pw: password
      });

      if (res.status === 200 || res.status === 201) {
        setUser(res.data.user);
        localStorage.setItem('userId', res.data.user.id);
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>
      <InputComponent
        inputTitle="로그인 하기"
        inputs={[
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
          }
        ]}
        buttonLabel="로그인 하기"
        onSubmit={handleLogin}  // InputComponent 내에서 버튼 클릭 시 onSubmit 호출한다고 가정
      />
    </MainLayout>
  );
};

export default LoginPage;
