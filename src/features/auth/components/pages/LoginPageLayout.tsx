import React from 'react';
import { useSelector } from 'react-redux';
import Login from '../templates/Login';
import { selectIsLoginView } from '../../slice/loginSlice';
import Register from '../templates/Register';

const LoginPageLayout: React.FC = () => {
  //ログインモードかユーザー登録モードのフラグ
  const isLoginView = useSelector(selectIsLoginView);

  return <>{isLoginView ? <Login /> : <Register />}</>;
};

export default LoginPageLayout;
