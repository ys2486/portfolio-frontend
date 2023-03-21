import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../stores/store';
import { editBanner } from '../../../components/banner/bannerSlice';
import { fetchAsyncTaskCompletedUpdate } from '../slice/taskSlice';
import { taskState } from '../types/taskState';
import { useGetTask } from './useGetTask';
import { useIsCookiesCheck } from '../../../hooks/useIsCookiesCheck';
import { useTranslation } from 'react-i18next';

// -----------------------------------------------------------------
// タスク完了処理
// 　・概要　：未完了タスクの「完了」ボタンをクリックした場合、そのタスクの完了フラグを「完了」とする処理
// 　・引数　：完了させたいタスク情報(useCompleteTaskの引数)
// 　　　　　　updateTask:{
// 　　　　　　　　id: number;
// 　　　　　　　　name: string;
// 　　　　　　　　completed: boolean;
// 　　　　　　　　createdAt: string;
// 　　　　　　　　updatedAt: string;
// 　　　　　　　　createdUser: string;
// 　　　　　　}
// 　・戻り値：boolean
// -----------------------------------------------------------------
export const useCompleteTask = (updateTask: taskState['selectedTask']) => {
  const dispatch: AppDispatch = useDispatch();
  const { getTask } = useGetTask();
  const { isCookiesCheck } = useIsCookiesCheck();
  //多言語対応用
  const { t } = useTranslation();
  const [isCompleteIconClicked, setIscompleteIconClicked] =
    useState<boolean>(false);

  const completeTask = useCallback(async () => {
    //認証に必要な情報がCookiesに存在しているかチェック
    const checkResult = isCookiesCheck();
    if (!checkResult) {
      //エラーの場合処理終了
      throw new Error();
    }

    //タスク完了処理
    const res = await dispatch(
      fetchAsyncTaskCompletedUpdate({ ...updateTask, completed: true })
    );
    if (res.payload?.request?.status === 200) {
      //タスク完了成功時
      //完了アイコンに変化させる
      setIscompleteIconClicked(true);
      //完了アイコンに変化後少し時間を置く
      await new Promise((resolve) => setTimeout(resolve, 300));
      dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'success',
          bannerMessage: t('Banner.completeTask'),
        })
      );
      await getTask();
    } else {
      //タスク完了処理に失敗した場合、未完了アイコンに戻す
      setIscompleteIconClicked(false);
      //タスク完了エラー時
      dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: t('Banner.completeTaskError'),
        })
      );
    }
  }, [dispatch, getTask, isCookiesCheck, updateTask, t]);
  return { completeTask, isCompleteIconClicked };
};
