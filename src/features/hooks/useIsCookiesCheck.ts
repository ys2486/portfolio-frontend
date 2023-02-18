import { useCallback } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';
import { editBanner } from '../banner/bannerSlice';

export const useIsCookiesCheck = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  // -----------------------------------------------------------------
  // Cookies認証情報チェック処理
  // 　・概要　　：Cookiesに処理で必要な認証情報(トークンとログインユーザーID)が存在しているか確認する処理
  // 　・引数　　：なし
  // 　・戻り値　：確認結果(true or false)
  // -----------------------------------------------------------------
  const isCookiesCheck = useCallback(() => {
    const token = Cookies.get('access_token');
    const loginUserId = Cookies.get('login_user');
    if (token && loginUserId) {
      return true;
    } else {
      navigate('/');
      dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: `認証情報が不足しています。ログインし直してください`,
        })
      );
    }
    return false;
  }, [dispatch, navigate]);
  return { isCookiesCheck };
};
