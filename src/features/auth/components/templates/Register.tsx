import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../stores/store';
import { useRegisterUser } from '../../hooks/useRegisterUser';
import {
  toggleMode,
  selectRegisterInfo,
  editRegisterMailAddress,
  editRegisterPassword,
  editRegisterPasswordConfirm,
  editRegisterUserName,
} from '../../slice/loginSlice';
import styles from './Register.module.css';
import { BsExclamationCircle } from 'react-icons/bs';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import i18n from '../../../../i18n/configs';
import { useTranslation } from 'react-i18next';

//バリデーション用タイプ
type Inputs = {
  registerMailAddress: string;
  registerPassword: string;
  registerpasswordConfirm: string;
  registerUserName: string;
};

const Register: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const registerInfo = useSelector(selectRegisterInfo);
  const [isValid, setIsValid] = useState<boolean>(false);
  const btnDisabled: boolean =
    isValid ||
    registerInfo.mailAddress === '' ||
    registerInfo.userName === '' ||
    registerInfo.password === '' ||
    registerInfo.passwordConfirm === '';
  const { registerUser } = useRegisterUser();
  const [isRevealPassword, setIsRevealPassword] = useState<boolean>(false);
  //多言語対応用
  const { t } = useTranslation();

  //バリデーション用
  const {
    register,
    formState: { errors },
    getValues,
  } = useForm<Inputs>({
    mode: 'all',
    criteriaMode: 'all',
  });

  //バリデーション結果制御
  useEffect(() => {
    if (
      errors.registerMailAddress?.message ||
      errors.registerPassword?.message ||
      errors.registerUserName?.message ||
      errors.registerpasswordConfirm?.message
    ) {
      // 入力項目のバリデーションにエラーが有る場合
      setIsValid(true);
    } else {
      //入力項目のバリデーションが正常な場合
      setIsValid(false);
    }
  }, [
    errors.registerMailAddress?.message,
    errors.registerPassword?.message,
    errors.registerUserName?.message,
    errors.registerpasswordConfirm?.message,
  ]);

  //パスワード表示切り替え用
  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  };

  return (
    <>
      <div className={styles.containerRegister}>
        <div className={styles.register}>
          <h1>{t('register.RegisterTopMessage')}</h1>

          {/* メールアドレスエリア*/}
          <p className={styles.subjectTitle}>{t('register.mailAddress')}</p>
          <input
            type="text"
            className={styles.inputLog}
            value={registerInfo.mailAddress}
            // ユーザーIDバリデーション
            {...register('registerMailAddress', {
              onChange: (e) =>
                dispatch(editRegisterMailAddress(e.target.value)),
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
          {errors.registerMailAddress?.message && (
            <div className={styles.validMessage}>
              <BsExclamationCircle />
              {errors.registerMailAddress.message}
            </div>
          )}

          {/* ユーザー名*/}
          <p className={styles.subjectTitle}>{t('register.userName')}</p>
          <input
            type="text"
            className={styles.inputLog}
            value={registerInfo.userName}
            // ユーザーIDバリデーション
            {...register('registerUserName', {
              onChange: (e) => dispatch(editRegisterUserName(e.target.value)),
              required: {
                value: true,
                message: t('validation.validationRequiredMessage'),
              },
            })}
          />
          {/* ユーザー名　バリデーションエラーメッセージ */}
          {errors.registerUserName?.message && (
            <div className={styles.validMessage}>
              <BsExclamationCircle />
              {errors.registerUserName.message}
            </div>
          )}

          {/* パスワードエリア */}
          <p className={styles.subjectTitle}>{t('register.password')}</p>
          <input
            type={isRevealPassword ? 'text' : 'password'}
            className={styles.inputLog}
            value={registerInfo.password}
            // パスワードバリデーション
            {...register('registerPassword', {
              onChange: (e) => dispatch(editRegisterPassword(e.target.value)),
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
          {errors.registerPassword?.message && (
            <div className={styles.validMessage}>
              <BsExclamationCircle />
              {errors.registerPassword.message}
            </div>
          )}

          {/* パスワード再入力エリア */}
          <p className={styles.subjectTitle}>{t('register.reEnterpassword')}</p>
          <input
            type={isRevealPassword ? 'text' : 'password'}
            className={styles.inputLog}
            value={registerInfo.passwordConfirm}
            {...register('registerpasswordConfirm', {
              // パスワード項目との一致チェック
              validate: (value) =>
                value === getValues('registerPassword') ||
                t('validation.validationPWUnmatchMessage').toString(),
              onChange: (e) =>
                dispatch(editRegisterPasswordConfirm(e.target.value)),
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
          {/* パスワード再入力　バリデーションエラーメッセージ */}
          {errors.registerpasswordConfirm?.message && (
            <div className={styles.validMessage}>
              <BsExclamationCircle />
              {errors.registerpasswordConfirm.message}
            </div>
          )}

          {/* REGISTERボタンエリア */}
          <div className={styles.switch}>
            <Button
              variant="contained"
              disabled={btnDisabled}
              color="primary"
              onClick={registerUser}
            >
              {t('register.registerButton')}
            </Button>
          </div>

          {/* ログイン切り替え文言エリア */}
          <div className={styles.switchTextContainer}>
            <span
              className={styles.switchText}
              onClick={() => dispatch(toggleMode())}
            >
              {t('register.changeLoginMode')}
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
    </>
  );
};

export default Register;
