import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import {
  editPassword,
  editUserId,
  selectAuthen,
  toggleMode,
} from './loginSlice';
import styles from './Login.module.css';
import { Button } from '@material-ui/core';
import { useLogin } from '../hooks/useLogin';

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const authen = useSelector(selectAuthen);
  const btnDisabled: boolean = authen.userId === '' || authen.password === '';
  //ログイン処理
  const { login } = useLogin();

  //パスワード入力時にエンターキークリックでログイン処理
  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!btnDisabled) {
        login();
      }
    }
  };

  return (
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
          pattern="^[a-zA-Z0-9]+$"
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
          pattern="^[a-zA-Z0-9]+$"
        />
        <div className={styles.switch}>
          <Button
            variant="contained"
            disabled={btnDisabled}
            color="primary"
            onClick={login}
            // onClick={login}
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
  );
};

export default Login;
