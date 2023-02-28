import { useCallback } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';
import { editBanner } from '../banner/bannerSlice';

// -----------------------------------------------------------------
// Cookies認証情報チェック処理
// 　・概要　　：Cookiesに処理で必要な認証情報(トークンとログインユーザーID)が存在しているか確認する処理
// 　・引数　　：なし
// 　・戻り値　：確認結果(true or false)
// -----------------------------------------------------------------
export const useIsCookiesCheck = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const isCookiesCheck = useCallback(async () => {
    //クッキーから必要な情報を取得する
    const token = Cookies.get('access_token');
    const loginUserId = Cookies.get('login_user');

    if (token && loginUserId) {
      //クッキーに必要な情報がセットされたいた場合
      return true;
    } else {
      //クッキーに必要な情報がセットされていない場合
      //クッキーから削除
      await Cookies.remove('login_user');
      await Cookies.remove('access_token');
      //ログイン画面に戻す
      await navigate('/');
      await dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: `認証期限が切れました。再度ログインし直してください`,
        })
      );
    }
    return false;
  }, [dispatch, navigate]);
  return { isCookiesCheck };
};
