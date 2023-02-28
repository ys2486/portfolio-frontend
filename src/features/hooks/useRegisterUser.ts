import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { editBanner } from '../banner/bannerSlice';
import {
  editPassword,
  editmailAddress,
  fetchAsyncRegister,
  toggleMode,
  selectRegisterInfo,
} from '../login/loginSlice';
import { useLogin } from './useLogin';

// -----------------------------------------------------------------
// ユーザー登録処理
// 　・概要　　：ユーザー登録画面で入力されたユーザーIDとパスワードを用いたユーザー登録処理
// 　・引数　　：なし
// 　・戻り値　：なし
// -----------------------------------------------------------------
export const useRegisterUser = () => {
  const dispatch: AppDispatch = useDispatch();
  // const authen = useSelector(selectAuthen);
  const registerInfo = useSelector(selectRegisterInfo);
  const { login } = useLogin();

  const registerUser = useCallback(async () => {
    //ユーザー登録処理
    const res = await fetchAsyncRegister(registerInfo);
    const registerResult: number = res.request?.status;

    if (registerResult === 200) {
      //ユーザー登録正常時
      //作成したユーザーでログイン（ユーザー登録時の流れでログインする場合は「1」を引数にセットする）
      await login(1);
      //ユーザー登録モードからログインモードに戻す
      await dispatch(toggleMode());
    } else if (registerResult === 500) {
      //既にそのユーザーIDが登録されている場合
      dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: `「${registerInfo.mailAddress}」は既に使用されているメールアドレスとなります。
          別のUserIdを使用してください。`,
        })
      );
      //UserIdとPasswordの初期化
      dispatch(editmailAddress(''));
      dispatch(editPassword(''));
    } else {
      //その他エラー
      dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: 'エラーが発生しました。管理者に連絡してください。',
        })
      );
      //UserIdとPasswordの初期化
      dispatch(editmailAddress(''));
      dispatch(editPassword(''));
    }
  }, [registerInfo, dispatch, login]);

  //カスタムフックから返却
  return { registerUser };
};
