import React, { useEffect, useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { BsExclamationCircle } from 'react-icons/bs';

//バリデーション用
type Inputs = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const authen = useSelector(selectAuthen);
  const [isValid, setIsValid] = useState<boolean>(false);
  const btnDisabled: boolean =
    isValid || authen.userId === '' || authen.password === '';
  //ログイン処理
  const { login } = useLogin();

  //バリデーション用
  const {
    register,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
    criteriaMode: 'all',
  });

  //バリデーション結果制御
  useEffect(() => {
    if (errors.username?.message || errors.password?.message) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [errors.username?.message, errors.password?.message]);

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
          value={authen.userId}
          // バリデーション用
          {...register('username', {
            onChange: (e) => dispatch(editUserId(e.target.value)),
            required: { value: true, message: '入力が必須の項目です' },
            pattern: {
              value: /^[0-9a-zA-Z]*$/,
              message: '半角英数のみで入力してください',
            },
          })}
        />
        {errors.username?.message && (
          <p className={styles.validMessage}>
            <BsExclamationCircle />
            {errors.username.message}
          </p>
        )}
        <span>Password</span>
        <input
          type="password"
          className={styles.inputLog}
          onKeyPress={pressEnter}
          value={authen.password}
          // バリデーション用
          {...register('password', {
            onChange: (e) => dispatch(editPassword(e.target.value)),
            required: {
              value: true,
              message: '入力が必須の項目です',
            },
            pattern: {
              value: /^[0-9a-zA-Z]*$/,
              message: '半角英数のみで入力してください',
            },
          })}
        />
        {errors.password?.message && (
          <div className={styles.validMessage}>
            <BsExclamationCircle />
            {errors.password.message}
          </div>
        )}
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
  );
};

export default Login;
