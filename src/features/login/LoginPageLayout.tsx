import React from 'react';
import { useSelector } from 'react-redux';
import Banner from '../banner/Banner';
import Login from './Login';
import { selectIsLoginView } from './loginSlice';
import Register from './Register';

const LoginPageLayout: React.FC = () => {
  //ログインモードかユーザー登録モードのフラグ
  const isLoginView = useSelector(selectIsLoginView);

  return (
    <>
      {isLoginView ? <Login /> : <Register />}
      {/* バナー */}
      <Banner />
    </>
  );
};

export default LoginPageLayout;
