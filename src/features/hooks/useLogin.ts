import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../app/store';
import { editBanner } from '../banner/bannerSlice';
import {
  editPassword,
  editUserId,
  fetchAsyncLogin,
  selectAuthen,
} from '../login/loginSlice';
import Cookies from 'js-cookie';
import crypto from 'crypto-js';

// -----------------------------------------------------------------
// ログイン処理
// 　・概要　　：ログイン画面で入力されたユーザーIDとパスワードを用いたログイン処理
// 　・引数　　：なし
// 　・戻り値　：なし
// -----------------------------------------------------------------
export const useLogin = () => {
  const dispatch: AppDispatch = useDispatch();
  const authen = useSelector(selectAuthen);
  const navigate = useNavigate();
  const key = process.env.REACT_APP_USERID_ENCRYPT_KEY!;

  //ログイン処理
  const login = useCallback(async () => {
    //ユーザーログイン処理
    const res = await fetchAsyncLogin(authen);
    //ログイン結果
    const loginResult: number = res.request?.status;

    //①ログイン正常時
    if (loginResult === 200) {
      //JWTトークンを、cookieに保存
      Cookies.set('access_token', res.headers['x-auth-token'], {
        expires: 7,
      });
      //ログインユーザーを暗号化しCookieに保存
      const loginUserId: string = res.headers['login-user-id'];
      const enryptedUserId = crypto.AES.encrypt(loginUserId, key).toString();
      Cookies.set('login_user', enryptedUserId, {
        expires: 7,
      });
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
  }, [authen, dispatch, navigate, key]);

  //カスタムフックから返却
  return { login };
};
