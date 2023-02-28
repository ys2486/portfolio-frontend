import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { editBanner } from '../banner/bannerSlice';
import {
  editEditedTask,
  fetchAsyncTaskInsert,
  selectEditedTask,
} from '../task/taskSlice';
import { taskState } from '../types/taskState';
import { useGetTask } from './useGetTask';
import { selectLoginUserInfo } from '../login/loginSlice';
import { useIsCookiesCheck } from './useIsCookiesCheck';

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

  const createTask = useCallback(async () => {
    //認証に必要な情報がCookiesに存在しているかチェック
    const checkResult: boolean = await isCookiesCheck();
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
      await dispatch(editEditedTask({ id: 0, name: '' }));
      //タスクの再取得
      await getTask();
    } else {
      //タスク登録エラー時
      //タスク登録用テキスト初期化
      await dispatch(editEditedTask({ id: 0, name: '' }));
      await dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: `タスクの登録に失敗しました。管理者に連絡してください。`,
        })
      );
    }
  }, [dispatch, editedTask, getTask, isCookiesCheck, loginUserId]);
  return { createTask };
};
