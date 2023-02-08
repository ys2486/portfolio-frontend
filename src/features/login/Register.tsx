import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../app/store';
import { editBanner } from '../banner/bannerSlice';
import {
  editPassword,
  editUserId,
  fetchAsyncLogin,
  fetchAsyncRegister,
  selectAuthen,
  toggleMode,
} from './loginSlice';
import styles from './Register.module.css';

const Register: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const authen = useSelector(selectAuthen);
  const btnDisabled: boolean = authen.userId === '' || authen.password === '';
  const navigate = useNavigate();

  //ユーザー登録処理
  const Register = async () => {
    const res = await dispatch(fetchAsyncRegister(authen));
    //ユーザー登録結果
    const registerResult = res.payload.request.status;

    //①ユーザー登録正常時
    if (registerResult === 200) {
      //作成したユーザーでログイン
      const res = await dispatch(fetchAsyncLogin(authen));
      //ログイン成功時
      if (res.payload!.request.status === 200) {
        //tasks画面に遷移
        navigate('tasks');
        //UserIdとPasswordの初期化
        dispatch(editUserId(''));
        dispatch(editPassword(''));
      } else {
        //ログイン失敗時
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
    } else if (registerResult === 500) {
      //②既にそのユーザーIDが登録されている場合
      //バナー表示
      dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: `「${authen.userId}」は既に使用されているUserIdとなります。
          別のUserIdを使用してください。`,
        })
      );
      //UserIdとPasswordの初期化
      dispatch(editUserId(''));
      dispatch(editPassword(''));
    } else {
      //③その他エラー
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

  return (
    <>
      <div className={styles.containerLogin}>
        <div className={styles.appLogin}>
          <h1>Register</h1>
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
            value={authen.password}
          />
          <div className={styles.switch}>
            <Button
              variant="contained"
              disabled={btnDisabled}
              color="primary"
              onClick={Register}
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
