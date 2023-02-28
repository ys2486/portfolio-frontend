import Cookies from 'js-cookie';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../stores/store';
import { editBanner } from '../../../components/banner/bannerSlice';
import { editTasks } from '../../task/slice/taskSlice';

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const logout = useCallback(
    async (
      setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
    ) => {
      //メニューを閉じる
      await setAnchorEl(null);
      //クッキーからユーザー情報を削除
      await Cookies.remove('login_user');
      await Cookies.remove('access_token');
      //ログイン画面に戻す
      await navigate('/');
      //タスク情報を初期化
      await dispatch(editTasks([]));
      await dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'success',
          bannerMessage: `ログアウトしました。`,
        })
      );
    },
    [dispatch, navigate]
  );
  return { logout };
};
