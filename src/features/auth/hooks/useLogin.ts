import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../stores/store';
import { editBanner } from '../../../components/banner/bannerSlice';
import {
  editPassword,
  editmailAddress,
  fetchAsyncLogin,
  selectAuthen,
  selectRegisterInfo,
  editRegisterMailAddress,
  editRegisterPassword,
  editRegisterUserName,
  editRegisterPasswordConfirm,
} from '../slice/loginSlice';
import Cookies from 'js-cookie';
import crypto from 'crypto-js';
import { useGetUserInfo } from '../../../hooks/useGetUserInfo';

// -----------------------------------------------------------------
// ログイン処理
// 　・概要　　：ログイン画面で入力されたユーザーIDとパスワードを用いたログイン処理
// 　・引数　　：mode
//             0；ログイン画面からの遷移
//　　　　　　　　1：ユーザー登録画面からの繊維
// 　・戻り値　：なし
// -----------------------------------------------------------------
export const useLogin = () => {
  const dispatch: AppDispatch = useDispatch();
  const authen = useSelector(selectAuthen);
  const navigate = useNavigate();
  const key = process.env.REACT_APP_USERID_ENCRYPT_KEY!;
  const registerInfo = useSelector(selectRegisterInfo);
  const { getUserInfo } = useGetUserInfo();

  //ログイン処理
  const login = useCallback(
    async (mode: number) => {
      let res: any;
      let loginUserMailAddress: string = '';

      //ユーザーログイン処理
      if (mode === 0) {
        //ログイン画面から起動された場合
        res = await fetchAsyncLogin(authen);
        loginUserMailAddress = authen.mailAddress;
      } else {
        //ユーザー登録画面からユーザー登録後に起動された場合
        res = await fetchAsyncLogin({
          mailAddress: registerInfo.mailAddress,
          password: registerInfo.password,
        });
        loginUserMailAddress = registerInfo.mailAddress;
      }
      //ログイン結果
      const loginResult: number = res.request?.status;

      if (loginResult === 200) {
        //ログイン正常時
        //JWTトークンを、cookieに保存
        await Cookies.set('access_token', res.headers['x-auth-token'], {
          expires: 7,
        });
        //ログインユーザーメールアドレスを暗号化しCookieに保存
        const enryptedUserMailAddress = crypto.AES.encrypt(
          loginUserMailAddress,
          key
        ).toString();
        await Cookies.set('login_user', enryptedUserMailAddress, {
          expires: 7,
        });
        //ログインユーザー情報取得処理
        await getUserInfo(loginUserMailAddress);
        //tasks画面に遷移
        await navigate('tasks');
        //ログイン画面・ユーザー登録画面の入力項目の初期化
        dispatch(editmailAddress(''));
        dispatch(editPassword(''));
        dispatch(editRegisterMailAddress(''));
        dispatch(editRegisterUserName(''));
        dispatch(editRegisterPassword(''));
        dispatch(editRegisterPasswordConfirm(''));
      } else if (loginResult === 401) {
        //ログイン情報が存在しない場合
        dispatch(
          editBanner({
            bannerIsopen: true,
            bannerType: 'error',
            bannerMessage: 'UserIdとPasswordに一致するユーザーが見つかりません',
          })
        );
        //ログイン画面・ユーザー登録画面の入力項目の初期化
        dispatch(editmailAddress(''));
        dispatch(editPassword(''));
        dispatch(editRegisterMailAddress(''));
        dispatch(editRegisterUserName(''));
        dispatch(editRegisterPassword(''));
        dispatch(editRegisterPasswordConfirm(''));
      } else {
        //その他エラー時
        dispatch(
          editBanner({
            bannerIsopen: true,
            bannerType: 'error',
            bannerMessage: 'エラーが発生しました。管理者に連絡してください。',
          })
        );
        //ログイン画面・ユーザー登録画面の入力項目の初期化
        dispatch(editmailAddress(''));
        dispatch(editPassword(''));
        dispatch(editRegisterMailAddress(''));
        dispatch(editRegisterUserName(''));
        dispatch(editRegisterPassword(''));
        dispatch(editRegisterPasswordConfirm(''));
      }
    },
    [
      authen,
      dispatch,
      navigate,
      key,
      registerInfo.mailAddress,
      registerInfo.password,
      getUserInfo,
    ]
  );

  //カスタムフックから返却
  return { login };
};
