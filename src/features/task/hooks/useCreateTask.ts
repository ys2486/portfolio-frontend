import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../stores/store';
import { editBanner } from '../../../components/banner/bannerSlice';
import {
  editEditedTask,
  fetchAsyncTaskInsert,
  selectEditedTask,
} from '../slice/taskSlice';
import { taskState } from '../types/taskState';
import { useGetTask } from './useGetTask';
import { selectLoginUserInfo } from '../../auth/slice/loginSlice';
import { useIsCookiesCheck } from '../../../hooks/useIsCookiesCheck';
import { useTranslation } from 'react-i18next';

// -----------------------------------------------------------------
// タスク新規登録処理
// 　・概要　　：入力したテキストを新規タスクとして登録する処理
// 　・引数　　：なし
// 　・戻り値　：なし
// -----------------------------------------------------------------
export const useCreateTask = () => {
  const dispatch: AppDispatch = useDispatch();
  const editedTask: taskState['editedTask'] = useSelector(selectEditedTask);
  const { getTask } = useGetTask();
  const { loginUserId } = useSelector(selectLoginUserInfo);
  const { isCookiesCheck } = useIsCookiesCheck();
  //多言語対応用
  const { t } = useTranslation();

  const createTask = useCallback(async () => {
    //認証に必要な情報がCookiesに存在しているかチェック
    const checkResult: boolean = isCookiesCheck();
    if (!checkResult) {
      //エラーの場合処理終了
      dispatch(editEditedTask({ id: 0, name: '' }));
      throw new Error();
    }

    //タスク新規登録処理
    const res = await dispatch(
      fetchAsyncTaskInsert({
        ...editedTask,
        createdUser: loginUserId,
      })
    );
    if (res.payload?.request?.status === 200) {
      //タスク登録成功時
      //タスク登録用テキスト初期化
      dispatch(editEditedTask({ id: 0, name: '' }));
      //タスクの再取得
      await getTask();
    } else {
      //タスク登録エラー時
      //タスク登録用テキスト初期化
      dispatch(editEditedTask({ id: 0, name: '' }));
      dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: t('Banner.createTaskError'),
        })
      );
    }
  }, [dispatch, editedTask, getTask, isCookiesCheck, loginUserId, t]);
  return { createTask };
};
