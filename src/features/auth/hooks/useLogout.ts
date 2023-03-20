import Cookies from 'js-cookie';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../stores/store';
import { editBanner } from '../../../components/banner/bannerSlice';
import { editTasks } from '../../task/slice/taskSlice';
import { useTranslation } from 'react-i18next';

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  //多言語対応用
  const { t } = useTranslation();

  const logout = useCallback(
    (setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>) => {
      //メニューを閉じる
      setAnchorEl(null);
      //クッキーからユーザー情報を削除
      Cookies.remove('login_user');
      Cookies.remove('access_token');
      //ログイン画面に戻す
      navigate('/');
      //タスク情報を初期化
      dispatch(editTasks([]));
      dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'success',
          bannerMessage: t('Banner.logout'),
        })
      );
    },
    [dispatch, navigate, t]
  );
  return { logout };
};
