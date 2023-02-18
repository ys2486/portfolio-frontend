import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { editBanner } from '../banner/bannerSlice';
import { fetchAsyncTaskCompletedUpdate } from '../task/taskSlice';
import { taskState } from '../types/taskState';
import { useGetTask } from './useGetTask';
import { useIsCookiesCheck } from './useIsCookiesCheck';

// -----------------------------------------------------------------
// タスク完了処理
// 　・概要　：未完了タスクの「完了」ボタンをクリックした場合、そのタスクの完了フラグを「完了」とする処理
// 　・引数　：完了させたいタスク情報
// 　　　　　　updateTask:{
// 　　　　　　　　id: number;
// 　　　　　　　　name: string;
// 　　　　　　　　completed: boolean;
// 　　　　　　　　createdAt: string;
// 　　　　　　　　updatedAt: string;
// 　　　　　　　　createdUser: string;
// 　　　　　　}
// 　・戻り値：なし
// -----------------------------------------------------------------
export const useCompleteTask = (updateTask: taskState['selectedTask']) => {
  const dispatch: AppDispatch = useDispatch();
  const { getTask } = useGetTask();
  const { isCookiesCheck } = useIsCookiesCheck();

  const completeTask = useCallback(async () => {
    //認証に必要な情報がCookiesに存在しているかチェック
    const checkResult = await isCookiesCheck();
    if (!checkResult) {
      //エラーの場合処理終了
      throw new Error();
    }
    //タスク完了処理
    const res = await dispatch(
      fetchAsyncTaskCompletedUpdate({ ...updateTask, completed: true })
    );
    if (res.payload?.request?.status === 200) {
      //タスク完了成功時、タスク再取得
      await getTask();
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
  }, [dispatch, getTask, isCookiesCheck, updateTask]);
  return { completeTask };
};
