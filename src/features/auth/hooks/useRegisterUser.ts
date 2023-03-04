import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../stores/store';
import { editBanner } from '../../../components/banner/bannerSlice';
import {
  editPassword,
  editmailAddress,
  fetchAsyncRegister,
  toggleMode,
  selectRegisterInfo,
} from '../slice/loginSlice';
import { useLogin } from './useLogin';
import { useTranslation } from 'react-i18next';

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
  //多言語対応用
  const { t } = useTranslation();

  const registerUser = useCallback(async () => {
    //ユーザー登録処理
    const res = await fetchAsyncRegister(registerInfo);
    console.log('res');
    console.log(res);
    const registerResult: number = res.request?.status;
    console.log('registerResult');
    console.log(registerResult);

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
          bannerMessage: `${registerInfo.mailAddress}${t(
            'Banner.registerAlreadyUsedError'
          )}`,
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
          bannerMessage: t('Banner.systemError'),
        })
      );
      //UserIdとPasswordの初期化
      dispatch(editmailAddress(''));
      dispatch(editPassword(''));
    }
  }, [registerInfo, dispatch, login, t]);

  //カスタムフックから返却
  return { registerUser };
};
