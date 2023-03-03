import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../stores/store';
import { editBanner } from '../../../components/banner/bannerSlice';
import { fetchAsyncTaskUpdate, selectSelectedTask } from '../slice/taskSlice';
import { taskState } from '../types/taskState';
import { useGetTask } from './useGetTask';
import { useIsCookiesCheck } from '../../../hooks/useIsCookiesCheck';
import { useTranslation } from 'react-i18next';

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
  //多言語対応用
  const { t } = useTranslation();

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
          bannerMessage: t('Banner.updateTask'),
        })
      );
    } else {
      //タスク更新エラー時
      await dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: t('Banner.updateTaskError'),
        })
      );
    }
  }, [dispatch, selectedTask, setEditModalIsOpen, getTask, isCookiesCheck, t]);
  return { updateTask };
};
