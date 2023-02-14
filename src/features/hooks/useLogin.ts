import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../app/store';
import { editBanner } from '../banner/bannerSlice';
import {
  editPassword,
  editUserId,
  fetchAsyncLogin,
  selectAuthen,
} from '../login/loginSlice';

export const useLogin = () => {
  const dispatch: AppDispatch = useDispatch();
  const authen = useSelector(selectAuthen);
  const navigate = useNavigate();

  //ログイン処理
  const login = useCallback(async () => {
    //ユーザーログイン処理
    const res = await dispatch(fetchAsyncLogin(authen));
    //ログイン結果
    const loginResult: number = res.payload.request.status;

    //①ログイン正常時
    if (loginResult === 200) {
      //tasks画面に遷移
      navigate('tasks');
      //UserIdとPasswordの初期化
      dispatch(editUserId(''));
      dispatch(editPassword(''));
    } else if (loginResult === 401) {
      //②ログイン情報が存在しない場合
      dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: 'UserIdとPasswordに一致するユーザーが見つかりません',
        })
      );
      //UserIdとPasswordの初期化
      dispatch(editUserId(''));
      dispatch(editPassword(''));
    } else {
      //③その他エラー時
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
  }, [authen, dispatch, navigate]);

  //カスタムフックから返却
  return { login };
};
