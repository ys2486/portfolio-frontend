import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../app/store';
import { editBanner } from '../banner/bannerSlice';
import { fetchAsyncLoginUserInfoGet } from '../login/loginSlice';

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

  const getUserInfo = useCallback(
    async (loginUserMailAddress: string) => {
      //ログインユーザー情報取得
      const res = await dispatch(
        fetchAsyncLoginUserInfoGet(loginUserMailAddress)
      );
      if (res.payload?.request?.status === 200) {
        //ログインユーザー情報取得処理成功時は何もしない
        //（fetchAsyncLoginUserInfoGetの後処理でユーザー情報をstateにセットしている）
      } else {
        //APIでエラーが発生しタスクの取得に失敗した場合
        await navigate('/');
        await dispatch(
          editBanner({
            bannerIsopen: true,
            bannerType: 'error',
            bannerMessage: `ユーザー情報の取得に失敗しました。ログインからやり直してください。`,
          })
        );
      }
    },
    [dispatch, navigate]
  );

  //カスタムフックから返却
  return { getUserInfo };
};
