import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../stores/store';
import { editBanner } from '../../../components/banner/bannerSlice';
import { fetchAsyncTaskDelete } from '../slice/taskSlice';
import { useGetTask } from './useGetTask';
import { useIsCookiesCheck } from '../../../hooks/useIsCookiesCheck';
import { useTranslation } from 'react-i18next';

// -----------------------------------------------------------------
// タスク削除処理
// 　・概要　　：選択したタスクを削除する処理
// 　・引数　　：削除したいタスクのID（useDeleteTaskの引数）
// 　　　　　　　taskId
// 　・戻り値　：なし
// -----------------------------------------------------------------
export const useDeleteTask = (taskId: number) => {
  const dispatch: AppDispatch = useDispatch();
  const { getTask } = useGetTask();
  const { isCookiesCheck } = useIsCookiesCheck();
  //多言語対応用
  const { t } = useTranslation();

  const deleteTask = useCallback(async () => {
    //認証に必要な情報がCookiesに存在しているかチェック
    const checkResult = await isCookiesCheck();
    if (!checkResult) {
      //エラーの場合処理終了
      throw new Error();
    }

    //タスク削除処理
    const res = await dispatch(fetchAsyncTaskDelete(taskId));
    if (res.payload?.request?.status === 200) {
      //タスク削除成功時
      await dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'warning',
          bannerMessage: t('Banner.deleteTask'),
        })
      );
      //タスク再取得
      await getTask();
    } else {
      //タスク削除エラー時
      await dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: t('Banner.deleteTaskError'),
        })
      );
    }
  }, [dispatch, taskId, getTask, isCookiesCheck, t]);
  return { deleteTask };
};
