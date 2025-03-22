
export const isLogin = () => {
  const token = localStorage.getItem('userId');
  return !!token;
};