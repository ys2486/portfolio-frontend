import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { editBanner } from '../banner/bannerSlice';
import { fetchAsyncTaskUpdate, selectSelectedTask } from '../task/taskSlice';
import { taskState } from '../types/taskState';
import { useGetTask } from './useGetTask';
import { useIsCookiesCheck } from './useIsCookiesCheck';

// -----------------------------------------------------------------
// タスク変更処理
// 　・概要　　：登録済タスクのタスクの内容を更新する処理
// 　・引数　　：タスク編集用モーダルの開閉用関数
// 　　　　　　　setEditModalIsOpen
// 　・戻り値　：なし
// -----------------------------------------------------------------
export const useUpdateTask = (
  setEditModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const dispatch: AppDispatch = useDispatch();
  const selectedTask: taskState['selectedTask'] =
    useSelector(selectSelectedTask);
  const { getTask } = useGetTask();
  const { isCookiesCheck } = useIsCookiesCheck();

  const updateTask = useCallback(async () => {
    //認証に必要な情報がCookiesに存在しているかチェック
    const checkResult = await isCookiesCheck();
    if (!checkResult) {
      //エラーの場合処理終了
      throw new Error();
    }

    //タスク変更処理
    const res = await dispatch(fetchAsyncTaskUpdate(selectedTask));
    //タスク変更成功時
    if (res.payload?.request?.status === 200) {
      //タスク再取得
      await getTask();
      //編集用モーダルを閉じる
      await setEditModalIsOpen(false);
      await dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'success',
          bannerMessage: `タスク修正しました。`,
        })
      );
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
  }, [dispatch, selectedTask, setEditModalIsOpen, getTask, isCookiesCheck]);
  return { updateTask };
};
