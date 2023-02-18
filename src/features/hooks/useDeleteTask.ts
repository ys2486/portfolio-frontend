import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { editBanner } from '../banner/bannerSlice';
import { fetchAsyncTaskDelete } from '../task/taskSlice';
import { useGetTask } from './useGetTask';
import { useIsCookiesCheck } from './useIsCookiesCheck';

// -----------------------------------------------------------------
// タスク削除処理
// 　・概要　　：選択したタスクを削除する処理
// 　・引数　　：削除したいタスクのID
// 　　　　　　　taskId
// 　・戻り値　：なし
// -----------------------------------------------------------------
export const useDeleteTask = (taskId: number) => {
  const dispatch: AppDispatch = useDispatch();
  const { getTask } = useGetTask();
  const { isCookiesCheck } = useIsCookiesCheck();

  const deleteTask = useCallback(async () => {
    //認証に必要な情報がCookiesに存在しているかチェック
    const checkResult = await isCookiesCheck();
    if (!checkResult) {
      //エラーの場合処理終了
      throw new Error();
    }
    const res = await dispatch(fetchAsyncTaskDelete(taskId));
    //タスク削除成功時
    if (res.payload?.request?.status === 200) {
      await getTask();
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
  }, [dispatch, taskId, getTask, isCookiesCheck]);
  return { deleteTask };
};
