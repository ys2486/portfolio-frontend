import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { useRegisterUser } from '../hooks/useRegisterUser';
import {
  editPassword,
  editUserId,
  selectAuthen,
  toggleMode,
} from './loginSlice';
import styles from './Register.module.css';
import { BsExclamationCircle } from 'react-icons/bs';

//バリデーション用
type Inputs = {
  username: string;
  password: string;
};

const Register: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const authen = useSelector(selectAuthen);
  const [isValid, setIsValid] = useState<boolean>(false);
  const btnDisabled: boolean =
    isValid || authen.userId === '' || authen.password === '';
  // const btnDisabled: boolean = authen.userId === '' || authen.password === '';
  //ユーザー登録処理
  const { registerUser } = useRegisterUser();

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

  return (
    <>
      <div className={styles.containerLogin}>
        <div className={styles.appLogin}>
          <h1>Register</h1>
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
            <div className={styles.validMessage}>
              <BsExclamationCircle />
              {errors.username.message}
            </div>
          )}
          <span>Password</span>
          <input
            type="password"
            className={styles.inputLog}
            value={authen.password}
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
              onClick={registerUser}
            >
              Register
            </Button>
          </div>
          <span
            className={styles.switchText}
            onClick={() => dispatch(toggleMode())}
          >
            Do you have already account?
          </span>
        </div>
      </div>
    </>
  );
};

export default Register;
