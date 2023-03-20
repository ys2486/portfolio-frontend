import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../stores/store';
import { editBanner } from '../../../components/banner/bannerSlice';
import {
  editIsLogin,
  fetchAsyncisLogin,
  selectLoginUserInfo,
} from '../slice/loginSlice';
import { useDecryptCookies } from '../../../hooks/useDecryptCookies';
import { useGetUserInfo } from '../../../hooks/useGetUserInfo';
import { useIsCookiesCheck } from '../../../hooks/useIsCookiesCheck';
import { useTranslation } from 'react-i18next';

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
  const loginUserInfo = useSelector(selectLoginUserInfo);
  const { getUserInfo } = useGetUserInfo();
  //多言語対応用
  const { t } = useTranslation();

  //ログイン済みチェック処理
  const isLoginCheck = useCallback(async () => {
    //認証に必要な情報がCookiesに存在しているかチェック
    const checkResult = isCookiesCheck();
    //エラーの場合処理終了
    if (!checkResult) {
      throw new Error();
    }

    //ログイン済チェック処理
    const res = await fetchAsyncisLogin();
    if (res.data === true) {
      //ログイン済みの場合
      dispatch(editIsLogin(true));

      //stateのユーザー情報が不足している場合、ログインユーザー情報を取得（再描画時など）
      if (
        loginUserInfo.loginUserId === 0 ||
        loginUserInfo.loginUserMailAddress === '' ||
        loginUserInfo.loginUserName === ''
      ) {
        //Cookieからメールアドレスを取得し、ログインユーザー情報を取得
        const decryptedLoginUserMailAddress: string = decryptCookies({
          CookieKey: 'login_user',
          DecryptKey: key,
        });
        await getUserInfo(decryptedLoginUserMailAddress);
      }

      //ログイン成功バナー表示
      dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'success',
          bannerMessage: `${t('Banner.loginWelcomeTop')}${
            loginUserInfo.loginUserName
          }${t('Banner.loginWelcomeEnd')}`,
        })
      );
    } else {
      //ログインしていない場合（ログインせずに直接task画面にURLで遷移しようとした場合等）
      navigate('/');
      dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: t('Banner.loginAgain'),
        })
      );
    }
  }, [
    isCookiesCheck,
    navigate,
    dispatch,
    decryptCookies,
    key,
    getUserInfo,
    loginUserInfo.loginUserId,
    loginUserInfo.loginUserMailAddress,
    loginUserInfo.loginUserName,
    t,
  ]);
  //カスタムフックから返却
  return { isLoginCheck };
};
