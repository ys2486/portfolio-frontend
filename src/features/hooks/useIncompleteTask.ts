import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { editBanner } from '../banner/bannerSlice';
import { fetchAsyncTaskCompletedUpdate } from '../task/taskSlice';
import { taskState } from '../types/taskState';
import { useGetTask } from './useGetTask';
import { useIsCookiesCheck } from './useIsCookiesCheck';

// -----------------------------------------------------------------
// タスク未完了処理
// 　・概要　：完了タスクの「戻す」ボタンをクリックした場合、そのタスクの完了フラグを「未完了」に戻す処理
// 　・引数　：未完了に戻したいタスク情報（useIncompleteTaskの引数）
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
export const useIncompleteTask = (updateTask: taskState['selectedTask']) => {
  const dispatch: AppDispatch = useDispatch();
  const { getTask } = useGetTask();
  const { isCookiesCheck } = useIsCookiesCheck();

  const incompleteTask = useCallback(async () => {
    //認証に必要な情報がCookiesに存在しているかチェック
    const checkResult = await isCookiesCheck();
    if (!checkResult) {
      //エラーの場合処理終了
      throw new Error();
    }
    //タスク未完了処理
    const res = await dispatch(
      fetchAsyncTaskCompletedUpdate({ ...updateTask, completed: false })
    );
    if (res.payload?.request?.status === 200) {
      //タスク未完了成功時
      await dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'success',
          bannerMessage: `タスクを未完了に戻しました。`,
        })
      );
      //タスク再取得
      await getTask();
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
  }, [dispatch, updateTask, getTask, isCookiesCheck]);
  return { incompleteTask };
};
