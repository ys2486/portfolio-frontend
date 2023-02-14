import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { editBanner } from '../banner/bannerSlice';
import { fetchAsyncTaskDelete, fetchAsyncTasksGet } from '../task/taskSlice';

export const useDeleteTask = (taskId: number) => {
  const dispatch: AppDispatch = useDispatch();

  const deleteTask = useCallback(async () => {
    const res = await dispatch(fetchAsyncTaskDelete(taskId));
    //タスク削除成功時
    if (res.payload.request.status === 200) {
      await dispatch(fetchAsyncTasksGet());
    } else {
      //タスク削除エラー時
      await dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: `タスクの削除に失敗しました。管理者に連絡してください。`,
        })
      );
    }
  }, [dispatch, taskId]);
  return { deleteTask };
};
