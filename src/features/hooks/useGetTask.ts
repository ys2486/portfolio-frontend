import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../app/store';
import { editBanner } from '../banner/bannerSlice';
import { editIsLogin } from '../login/loginSlice';
import { fetchAsyncTasksGet } from '../task/taskSlice';

export const useGetTask = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const getTask = useCallback(async () => {
    //ユーザーに紐づく全タスク取得処理
    const res = await dispatch(fetchAsyncTasksGet());
    //全タスク処理結果
    const tasksGetResult: number = res.payload.request.status;

    if (tasksGetResult === 200) {
      //タスク画面を表示する
      await dispatch(editIsLogin(true));
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
  }, [dispatch, navigate]);
  return { getTask };
};
