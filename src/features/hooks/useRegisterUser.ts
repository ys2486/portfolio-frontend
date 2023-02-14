import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { editBanner } from '../banner/bannerSlice';
import {
  editPassword,
  editUserId,
  fetchAsyncRegister,
  selectAuthen,
} from '../login/loginSlice';
import { useLogin } from './useLogin';

export const useRegisterUser = () => {
  const dispatch: AppDispatch = useDispatch();
  const authen = useSelector(selectAuthen);
  const { login } = useLogin();

  //ユーザー登録処理
  const registerUser = useCallback(async () => {
    const res = await dispatch(fetchAsyncRegister(authen));
    //ユーザー登録結果
    const registerResult: number = res.payload.request.status;

    if (registerResult === 200) {
      //①ユーザー登録正常時
      //作成したユーザーでログイン
      login();
    } else if (registerResult === 500) {
      //②既にそのユーザーIDが登録されている場合
      //バナー表示
      dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: `「${authen.userId}」は既に使用されているUserIdとなります。
          別のUserIdを使用してください。`,
        })
      );
      //UserIdとPasswordの初期化
      dispatch(editUserId(''));
      dispatch(editPassword(''));
    } else {
      //③その他エラー
      dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: 'エラーが発生しました。管理者に連絡してください。',
        })
      );
      //UserIdとPasswordの初期化
      dispatch(editUserId(''));
      dispatch(editPassword(''));
    }
  }, [authen, dispatch, login]);

  //カスタムフックから返却
  return { registerUser };
};
