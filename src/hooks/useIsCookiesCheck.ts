import { useCallback } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../stores/store';
import { useDispatch } from 'react-redux';
import { editBanner } from '../components/banner/bannerSlice';
import { useTranslation } from 'react-i18next';

// -----------------------------------------------------------------
// Cookies認証情報チェック処理
// 　・概要　　：Cookiesに処理で必要な認証情報(トークンとログインユーザーID)が存在しているか確認する処理
// 　・引数　　：なし
// 　・戻り値　：確認結果(true or false)
// -----------------------------------------------------------------
export const useIsCookiesCheck = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  //多言語対応用
  const { t } = useTranslation();

  const isCookiesCheck = useCallback(() => {
    //クッキーから必要な情報を取得する
    const token = Cookies.get('access_token');
    const loginUserId = Cookies.get('login_user');

    if (token && loginUserId) {
      //クッキーに必要な情報がセットされたいた場合
      return true;
    } else {
      //クッキーに必要な情報がセットされていない場合
      //クッキーから削除
      Cookies.remove('login_user');
      Cookies.remove('access_token');
      //ログイン画面に戻す
      navigate('/');
      dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: t('Banner.loginAgain'),
        })
      );
    }
    return false;
  }, [dispatch, navigate, t]);
  return { isCookiesCheck };
};
