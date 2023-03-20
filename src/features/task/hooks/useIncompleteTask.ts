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
// 　・戻り値：boolean
// -----------------------------------------------------------------
export const useIncompleteTask = (updateTask: taskState['selectedTask']) => {
  const dispatch: AppDispatch = useDispatch();
  const { getTask } = useGetTask();
  const { isCookiesCheck } = useIsCookiesCheck();
  //多言語対応用
  const { t } = useTranslation();
  //完了アイコンクリック制御
  const [isInCompleteIconClicked, setIsIncompleteIconClicked] =
    useState<boolean>(false);

  const incompleteTask = useCallback(async () => {
    //認証に必要な情報がCookiesに存在しているかチェック
    const checkResult = isCookiesCheck();
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
      //未完了アイコンに変化させる
      setIsIncompleteIconClicked(true);
      //未完了アイコンに変化後少し時間を置く
      await new Promise((resolve) => setTimeout(resolve, 300));
      dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'success',
          bannerMessage: t('Banner.incompleteTask'),
        })
      );
      //タスク再取得
      await getTask();
    } else {
      //タスク未完了エラー時
      //タスク完了処理に失敗した場合、未完了アイコンに戻す
      setIsIncompleteIconClicked(false);
      dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: t('Banner.incompleteTaskError'),
        })
      );
    }
  }, [dispatch, updateTask, getTask, isCookiesCheck, t]);
  return { incompleteTask, isInCompleteIconClicked };
};
