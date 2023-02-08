import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import {
  editPassword,
  editUserId,
  fetchAsyncLogin,
  selectAuthen,
  toggleMode,
} from './loginSlice';
import styles from './Login.module.css';
import { Button } from '@material-ui/core';
import { editBanner } from '../banner/bannerSlice';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const authen = useSelector(selectAuthen);
  const btnDisabled: boolean = authen.userId === '' || authen.password === '';
  const navigate = useNavigate();

  //ログインボタンクリック時の処理
  const login = async () => {
    //ユーザーログイン処理
    const res = await dispatch(fetchAsyncLogin(authen));
    //ログイン結果
    const loginResult: number = res.payload.request.status;

    //①ログイン正常時
    if (loginResult === 200) {
      //tasks画面に遷移
      navigate('tasks');
      //UserIdとPasswordの初期化
      dispatch(editUserId(''));
      dispatch(editPassword(''));
    } else if (loginResult === 401) {
      //②ログイン情報が存在しない場合
      dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: 'UserIdとPasswordに一致するユーザーが見つかりません',
        })
      );
      //UserIdとPasswordの初期化
      dispatch(editUserId(''));
      dispatch(editPassword(''));
    } else {
      //③その他エラー時
      dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: 'エラーが発生しました。管理者に連絡してください。',
        })
      );
      //UserIdとPasswordの初期化
      dispatch(editUserId(''));
      dispatch(editPassword(''));
    }
  };

  //パスワード入力時にエンターキークリックでログイン処理
  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!btnDisabled) {
        login();
      }
    }
  };

  return (
    <>
      <div className={styles.containerLogin}>
        <div className={styles.appLogin}>
          <h1>{true ? 'Login' : 'Register'}</h1>
          <span>UserId</span>
          <input
            type="text"
            className={styles.inputLog}
            name="username"
            placeholder=""
            required
            onChange={(e) => dispatch(editUserId(e.target.value))}
            value={authen.userId}
          />
          <span>Password</span>
          <input
            type="password"
            className={styles.inputLog}
            name="username"
            placeholder=""
            required
            onChange={(e) => dispatch(editPassword(e.target.value))}
            onKeyPress={pressEnter}
            value={authen.password}
          />
          <div className={styles.switch}>
            <Button
              variant="contained"
              disabled={btnDisabled}
              color="primary"
              onClick={login}
            >
              Login
            </Button>
          </div>
          <span
            className={styles.switchText}
            onClick={() => dispatch(toggleMode())}
          >
            Create Account?
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
