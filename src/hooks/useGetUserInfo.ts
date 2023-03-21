import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../stores/store';
import { editBanner } from '../components/banner/bannerSlice';
import { fetchAsyncLoginUserInfoGet } from '../features/auth/slice/loginSlice';
import { useTranslation } from 'react-i18next';
import { useGetTask } from '../features/task/hooks/useGetTask';

// -----------------------------------------------------------------
// ログインユーザー情報取得処理
// 　・概要　　：メールアドレスを元に、ログインしたユーザー情報を取得する処理
// 　・引数　　：ログインしたメールアドレス（getUserInfoの引数）
//　　　　　　　 loginUserMailAddress
// 　・戻り値　：なし
// -----------------------------------------------------------------
export const useGetUserInfo = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  //多言語対応用
  const { t } = useTranslation();
  const { getTask } = useGetTask();

  const getUserInfo = useCallback(
    async (loginUserMailAddress: string) => {
      //ログインユーザー情報取得
      const res = await dispatch(
        fetchAsyncLoginUserInfoGet(loginUserMailAddress)
      );
      if (res.payload?.request?.status === 200) {
        //ログインユーザー情報取得処理成功時に、タスク情報を取得
        await getTask();
      } else {
        //APIでエラーが発生しタスクの取得に失敗した場合
        navigate('/');
        dispatch(
          editBanner({
            bannerIsopen: true,
            bannerType: 'error',
            bannerMessage: t('Banner.getUserInfoError'),
          })
        );
      }
    },
    [dispatch, navigate, t, getTask]
  );

  //カスタムフックから返却
  return { getUserInfo };
};
