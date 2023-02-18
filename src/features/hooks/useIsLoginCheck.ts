import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../app/store';
import { editBanner } from '../banner/bannerSlice';
import {
  editIsLogin,
  editLoginUserId,
  fetchAsyncisLogin,
} from '../login/loginSlice';
import { useDecryptCookies } from './useDecryptCookies';
import { useIsCookiesCheck } from './useIsCookiesCheck';

// -----------------------------------------------------------------
// ログイン済チェック処理
// 　・概要　　：既にログイン済みかどうかcookiesのトークンを利用しチェックする処理
// 　・引数　　：なし
// 　・戻り値　：なし
// -----------------------------------------------------------------
export const useIsLoginCheck = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { decryptCookies } = useDecryptCookies();
  const key = process.env.REACT_APP_USERID_ENCRYPT_KEY!;
  const { isCookiesCheck } = useIsCookiesCheck();

  //ログイン済みチェック処理
  const isLoginCheck = useCallback(async () => {
    //認証に必要な情報がCookiesに存在しているかチェック
    const checkResult = await isCookiesCheck();
    //エラーの場合処理終了
    if (!checkResult) {
      throw new Error();
    }

    //ログインユーザー判定処理
    const res = await fetchAsyncisLogin();
    //ログインユーザー正しい場合
    if (res?.data === true) {
      await dispatch(editIsLogin(true));
      //ログインユーザーIDをstateに保存
      const decryptedUserId: string = await decryptCookies({
        CookieKey: 'login_user',
        DecryptKey: key,
      });
      dispatch(editLoginUserId(decryptedUserId));
      //ログイン成功バナー表示
      await dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'success',
          bannerMessage: `${decryptedUserId}さん ようこそ`,
        })
      );
    } else {
      await navigate('/');
      await dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: `ログインし直してください`,
        })
      );
    }
  }, [isCookiesCheck, navigate, dispatch, decryptCookies, key]);
  //カスタムフックから返却
  return { isLoginCheck };
};
