import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../app/store';
import { editBanner } from '../banner/bannerSlice';
import { editIsLogin, fetchAsyncisLogin } from '../login/loginSlice';
import { fetchAsyncTasksGet } from '../task/taskSlice';

export const useInitTask = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  //ログインユーザーが作成したタスクを全件取得
  const initTask = useCallback(async () => {
    //ログインしているか判定
    const res = await fetchAsyncisLogin();
    //ログインしている場合の処理
    if (res.data === true) {
      //ユーザーに紐づく全タスク取得処理
      const res = await dispatch(fetchAsyncTasksGet());
      //全タスク処理結果
      const tasksGetResult: number = res.payload.request.status;

      if (tasksGetResult === 200) {
        //タスク画面を表示する
        await dispatch(editIsLogin(true));
        //ログイン成功バナー表示
        await dispatch(
          editBanner({
            bannerIsopen: true,
            bannerType: 'success',
            bannerMessage: `${localStorage.loginUserId}さん ようこそ`,
          })
        );
      } else {
        //タスクの取得に失敗した場合
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
      //ログインしていない場合、ログイン画面に戻しバナー表示
      await navigate('/');
      await dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: `ログインしてください`,
        })
      );
    }
  }, [dispatch, navigate]);

  //カスタムフックから返却
  return { initTask };
};
