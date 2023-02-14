import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { editBanner } from '../banner/bannerSlice';
import {
  fetchAsyncTaskCompletedUpdate,
  fetchAsyncTasksGet,
} from '../task/taskSlice';
import { taskState } from '../types/taskState';

export const useIncompleteTask = (updateTask: taskState['selectedTask']) => {
  const dispatch: AppDispatch = useDispatch();

  const incompleteTask = useCallback(async () => {
    const res = await dispatch(
      fetchAsyncTaskCompletedUpdate({ ...updateTask, completed: false })
    );
    //タスク未完了成功時
    if (res.payload.request.status === 200) {
      await dispatch(fetchAsyncTasksGet());
    } else {
      //タスク未完了エラー時
      await dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: `タスクの未完了処理に失敗しました。管理者に連絡してください。`,
        })
      );
    }
  }, [dispatch, updateTask]);
  return { incompleteTask };
};
