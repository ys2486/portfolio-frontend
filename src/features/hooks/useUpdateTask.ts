import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { editBanner } from '../banner/bannerSlice';
import {
  fetchAsyncTasksGet,
  fetchAsyncTaskUpdate,
  selectSelectedTask,
} from '../task/taskSlice';
import { taskState } from '../types/taskState';

export const useUpdateTask = (
  setEditModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const dispatch: AppDispatch = useDispatch();
  const selectedTask: taskState['selectedTask'] =
    useSelector(selectSelectedTask);

  //編集要モーダルのタスク変更処理
  const updateTask = useCallback(async () => {
    const res = await dispatch(fetchAsyncTaskUpdate(selectedTask));
    //タスク変更成功時
    if (res.payload.request.status === 200) {
      await dispatch(fetchAsyncTasksGet());
      await setEditModalIsOpen(false);
    } else {
      //タスク更新エラー時
      await dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: `タスクの更新に失敗しました。管理者に連絡してください。`,
        })
      );
    }
  }, [dispatch, selectedTask, setEditModalIsOpen]);
  return { updateTask };
};
