import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import {
  editmailAddress,
  editPassword,
  selectAuthen,
  toggleMode,
} from './loginSlice';
import styles from './Login.module.css';
import { Button } from '@material-ui/core';
import { useLogin } from '../hooks/useLogin';
import { useForm } from 'react-hook-form';
import { BsExclamationCircle } from 'react-icons/bs';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

//バリデーション用タイプ
type Inputs = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const authen = useSelector(selectAuthen);
  const [isValid, setIsValid] = useState<boolean>(false);
  const btnDisabled: boolean =
    isValid || authen.mailAddress === '' || authen.password === '';
  const { login } = useLogin();
  const [isRevealPassword, setIsRevealPassword] = useState<boolean>(false);

  //バリデーション用
  const {
    register,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'all',
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
        login(0);
      }
    }
  };

  //パスワード表示切り替え用
  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  };

  return (
    <div className={styles.containerLogin}>
      <div className={styles.appLogin}>
        <h1>Login</h1>

        {/* メールアドレスエリア */}
        <p className={styles.subjectTitle}>Mail Address</p>
        <input
          type="text"
          className={styles.inputLog}
          value={authen.mailAddress}
          // ユーザーIDバリデーション
          {...register('username', {
            onChange: (e) => dispatch(editmailAddress(e.target.value)),
            required: { value: true, message: '入力が必須の項目です' },
            pattern: {
              value: /^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/,
              message: '半角英数記号のみで入力してください',
            },
          })}
        />
        {/* メールアドレス　バリデーションエラーメッセージ */}
        {errors.username?.message && (
          <p className={styles.validMessage}>
            <BsExclamationCircle />
            {errors.username.message}
          </p>
        )}

        {/* パスワードエリア */}
        <p className={styles.subjectTitle}>Password</p>
        <input
          type={isRevealPassword ? 'text' : 'password'}
          className={styles.inputLog}
          onKeyPress={pressEnter}
          value={authen.password}
          // パスワード用バリデーション
          {...register('password', {
            onChange: (e) => dispatch(editPassword(e.target.value)),
            required: {
              value: true,
              message: '入力が必須の項目です',
            },
            pattern: {
              value: /^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/,
              message: '半角英数記号のみで入力してください',
            },
          })}
        />
        <span
          onClick={togglePassword}
          role="presentation"
          className={styles.passwordEyeIcon}
        >
          {isRevealPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>
        {/* パスワード　バリデーションエラーメッセージ */}
        {errors.password?.message && (
          <div className={styles.validMessage}>
            <BsExclamationCircle />
            {errors.password.message}
          </div>
        )}

        {/* ログインボタンエリア */}
        <div className={styles.switch}>
          <Button
            variant="contained"
            disabled={btnDisabled}
            color="primary"
            onClick={() => login(0)}
          >
            Login
          </Button>
        </div>

        {/* ユーザー登録切り替え文言エリア */}
        <div className={styles.switchTextContainer}>
          <span
            className={styles.switchText}
            onClick={() => dispatch(toggleMode())}
          >
            Create Account?
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
