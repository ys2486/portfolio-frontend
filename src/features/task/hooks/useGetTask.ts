import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../stores/store';
import { editBanner } from '../../../components/banner/bannerSlice';
import { editIsLogin, selectLoginUserInfo } from '../../auth/slice/loginSlice';
import { fetchAsyncTasksGet } from '../slice/taskSlice';
import { useIsCookiesCheck } from '../../../hooks/useIsCookiesCheck';
import { useTranslation } from 'react-i18next';

// -----------------------------------------------------------------
// タスク取得処理
// 　・概要　　：ログインユーザーに紐づくタスクを全件取得する処理
// 　・引数　　：なし
// 　・戻り値　：なし
// -----------------------------------------------------------------
export const useGetTask = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { loginUserId } = useSelector(selectLoginUserInfo);
  const { isCookiesCheck } = useIsCookiesCheck();
  //多言語対応用
  const { t } = useTranslation();

  const getTask = useCallback(async () => {
    //認証に必要な情報がCookiesに存在しているかチェック
    const checkResult = isCookiesCheck();
    if (!checkResult) {
      throw new Error();
    }

    //ユーザーに紐づく全タスク取得処理
    const res = await dispatch(fetchAsyncTasksGet(loginUserId));
    if (res.payload?.request?.status) {
      //タスク取得結果が存在する場合
      const tasksGetResult: number = res.payload.request.status;
      if (tasksGetResult === 200) {
        //タスク取得成功時
        //タスク画面を表示する
        dispatch(editIsLogin(true));
      } else {
        //タスクの取得エラー時
        navigate('/');
        dispatch(
          editBanner({
            bannerIsopen: true,
            bannerType: 'error',
            bannerMessage: t('Banner.getTasksError'),
          })
        );
      }
    } else {
      //API以外のエラー等で、タスク取得結果すら存在しない場合
      navigate('/');
      dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: t('Banner.getTasksError'),
        })
      );
    }
  }, [dispatch, navigate, isCookiesCheck, loginUserId, t]);
  return { getTask };
};
