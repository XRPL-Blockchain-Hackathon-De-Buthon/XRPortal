import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import MainPage from './pages/main/main';
import MyArticlesPage from './pages/mypage/article-list/article-list';
import ArticlePage from './pages/article/article';
import HistoryPage from './pages/mypage/history/history';
import CreateArticlePage from './pages/create-article/create-article';

import LoginPage from './pages/login/login';
import SingUpPage from './pages/signup/signup';
import TokenBuyPage from './pages/tokenbuy/tokenbuy';
import WalletGenPage from './pages/walletgen/walletgen';

import AdvertisementDetailPage from './pages/avertisement/AdvertisementDetailPage';

import AdvertiseRegisterPage from './pages/advertiseregister/AdvertiseRegisterPage';
import SellArticlePage from './pages/sell-articles/sell-article';
import MyAdvertisementPage from './pages/mypage/advertisement/advertisement';
import { useEffect } from 'react';
import useUserStore from './store/auth';
import { $api } from './utils/axios';



const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('userId');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const { setUser } = useUserStore();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      $api.get(`/users/me/?user_id=${userId}`).then(res => {
        if (res.data)
          setUser(res.data);
      }).catch(err => {
        console.log(err);
      });
    }
  }, [userId, setUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/my/articles" element={
          <ProtectedRoute>
            <MyArticlesPage />
          </ProtectedRoute>
        } />
        <Route path="/my/history" element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        } />
        <Route path="/article/sell/:id" element={
          <ProtectedRoute>
            <SellArticlePage />
          </ProtectedRoute>
        } />
        <Route path="/my/advertisements" element={
          <ProtectedRoute>
            <MyAdvertisementPage />
          </ProtectedRoute>
        } />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/create/article" element={
          <ProtectedRoute>
            <CreateArticlePage />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SingUpPage />} />
        <Route path="/advertise/:id" element={<AdvertisementDetailPage />} />
        <Route path="/advertise/create" element={
          <ProtectedRoute>
            <AdvertiseRegisterPage />
          </ProtectedRoute>
        } />
        <Route path="/token/buy" element={
          <ProtectedRoute>
            <TokenBuyPage />
          </ProtectedRoute>
        } />
        <Route path="/wallet/create" element={
          <ProtectedRoute>
            <WalletGenPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;