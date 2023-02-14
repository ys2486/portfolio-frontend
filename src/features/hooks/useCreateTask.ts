import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { editBanner } from '../banner/bannerSlice';
import {
  editTask,
  fetchAsyncTaskInsert,
  selectEditedTask,
} from '../task/taskSlice';
import { taskState } from '../types/taskState';
import { useGetTask } from './useGetTask';

export const useCreateTask = () => {
  const dispatch: AppDispatch = useDispatch();
  const editedTask: taskState['editedTask'] = useSelector(selectEditedTask);
  const { getTask } = useGetTask();

  const createTask = useCallback(async () => {
    const loginUserId = localStorage.loginUserId;
    const res = await dispatch(
      fetchAsyncTaskInsert({
        ...editedTask,
        createdUser: loginUserId,
      })
    );
    //タスク登録成功時
    if (res.payload.request.status === 200) {
      await dispatch(editTask({ id: 0, name: '' }));
      //タスクの再取得
      await getTask();
      // await dispatch(fetchAsyncTasksGet());
    } else {
      //タスク登録エラー時
      await dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: `タスクの登録に失敗しました。管理者に連絡してください。`,
        })
      );
    }
  }, [dispatch, editedTask, getTask]);
  return { createTask };
};
