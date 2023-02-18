import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../app/store';
import { editBanner } from '../banner/bannerSlice';
import { editIsLogin, selectLoginUserId } from '../login/loginSlice';
import { fetchAsyncTasksGet } from '../task/taskSlice';
import { useIsCookiesCheck } from './useIsCookiesCheck';

// -----------------------------------------------------------------
// タスク取得処理
// 　・概要　　：ログインユーザーに紐づくタスクを全件取得する処理
// 　・引数　　：なし
// 　・戻り値　：なし
// -----------------------------------------------------------------
export const useGetTask = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const loginuseId = useSelector(selectLoginUserId);
  const { isCookiesCheck } = useIsCookiesCheck();

  const getTask = useCallback(async () => {
    //認証に必要な情報がCookiesに存在しているかチェック
    const checkResult = await isCookiesCheck();
    if (!checkResult) {
      throw new Error();
    }

    //ユーザーに紐づく全タスク取得処理
    const res = await dispatch(fetchAsyncTasksGet(loginuseId));

    if (res.payload?.request?.status) {
      //API結果
      const tasksGetResult: number = res.payload.request.status;
      if (tasksGetResult === 200) {
        //タスク画面を表示する
        await dispatch(editIsLogin(true));
      } else {
        //APIでエラーが発生しタスクの取得に失敗した場合
        navigate('/');
        await dispatch(
          editBanner({
            bannerIsopen: true,
            bannerType: 'error',
            bannerMessage: `タスクの取得に失敗しました。ログインからやり直してください。`,
          })
        );
      }
    } else {
      //API以外のエラー時
      navigate('/');
      await dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: `タスクの取得に失敗しました。ログインからやり直してください。`,
        })
      );
    }
  }, [dispatch, navigate, loginuseId, isCookiesCheck]);
  return { getTask };
};
