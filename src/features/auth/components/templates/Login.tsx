import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../stores/store';
import {
  editmailAddress,
  editPassword,
  selectAuthen,
  toggleMode,
} from '../../slice/loginSlice';
import styles from './Login.module.css';
import { Button } from '@material-ui/core';
import { useLogin } from '../../hooks/useLogin';
import { useForm } from 'react-hook-form';
import { BsExclamationCircle } from 'react-icons/bs';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import i18n from '../../../../i18n/configs';
import { useTranslation } from 'react-i18next';

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
  //多言語対応用
  const { t } = useTranslation();

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
        <h1>{t('login.loginTopMessage')}</h1>

        {/* メールアドレスエリア */}
        <p className={styles.subjectTitle}>{t('login.mailAddress')}</p>
        <input
          type="text"
          className={styles.inputLog}
          value={authen.mailAddress}
          // ユーザーIDバリデーション
          {...register('username', {
            onChange: (e) => dispatch(editmailAddress(e.target.value)),
            required: {
              value: true,
              message: t('validation.validationRequiredMessage'),
            },
            pattern: {
              value: /^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/,
              message: t('validation.validationPatternMessage'),
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
        <p className={styles.subjectTitle}>{t('login.password')}</p>
        <input
          type={isRevealPassword ? 'text' : 'password'}
          enterKeyHint="go"
          className={styles.inputLog}
          onKeyPress={pressEnter}
          value={authen.password}
          data-testid="loginPassword"
          // パスワード用バリデーション
          {...register('password', {
            onChange: (e) => dispatch(editPassword(e.target.value)),
            required: {
              value: true,
              message: t('validation.validationRequiredMessage'),
            },
            pattern: {
              value: /^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/,
              message: t('validation.validationPatternMessage'),
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
            {t('login.loginButton')}
          </Button>
        </div>

        {/* ユーザー登録切り替え文言エリア */}
        <div className={styles.switchTextContainer}>
          <span
            className={styles.switchText}
            onClick={() => dispatch(toggleMode())}
          >
            {t('login.changeRegisterMode')}
          </span>
        </div>

        {/* 言語切替テキスト */}
        <div className={styles.languageChangeContainer}>
          <span
            className={styles.switchText}
            onClick={() => i18n.changeLanguage('en')}
          >
            {t('login.english')}
          </span>
          <span>/</span>
          <span
            className={styles.switchText}
            onClick={() => i18n.changeLanguage('ja')}
          >
            {t('login.japanese')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
