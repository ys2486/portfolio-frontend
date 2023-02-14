import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { editBanner } from '../banner/bannerSlice';
import {
  fetchAsyncTaskCompletedUpdate,
  fetchAsyncTasksGet,
} from '../task/taskSlice';
import { taskState } from '../types/taskState';

export const useCompleteTask = (updateTask: taskState['selectedTask']) => {
  const dispatch: AppDispatch = useDispatch();

  const completeTask = useCallback(async () => {
    const res = await dispatch(
      fetchAsyncTaskCompletedUpdate({ ...updateTask, completed: true })
    );
    //タスク完了成功時
    if (res.payload.request.status === 200) {
      await dispatch(fetchAsyncTasksGet());
    } else {
      //タスク完了エラー時
      await dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: `タスクの完了処理に失敗しました。管理者に連絡してください。`,
        })
      );
    }
  }, []);
  return { completeTask };
};
