import React, { useEffect, useState } from 'react';
import useMedia from 'use-media';
import TaskPC from './TaskPC';
import TaskMobile from './TaskMobile';
import TaskTablet from './TaskTablet';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { fetchAsyncTasksGet } from './taskSlice';
import { fetchAsyncisLogin } from '../login/loginSlice';
import { editBanner } from '../banner/bannerSlice';
import { useNavigate } from 'react-router-dom';

const Task: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  //表示制御
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate();

  //初期処理
  useEffect(() => {
    const fetchTaskProf = async () => {
      //ログインしているか判定
      const res = await fetchAsyncisLogin();
      //ログインしている場合の処理
      if (res.data === true) {
        //ユーザーに紐づく全タスクを取得し、セットする。
        const tasksGetResult = await dispatch(fetchAsyncTasksGet());
        // await dispatch(fetchAsyncTasksGet());
        if (tasksGetResult.payload.request.status === 200) {
          //タスク画面を表示する
          await setIsLogin(true);
          //ログイン成功バナー表示
          await dispatch(
            editBanner({
              bannerIsopen: true,
              bannerType: 'success',
              bannerMessage: `${localStorage.loginUserId}さん ようこそ`,
            })
          );
        } else {
          //タスクの取得に失敗した場合
          navigate('/');
          await dispatch(
            editBanner({
              bannerIsopen: true,
              bannerType: 'error',
              bannerMessage: `タスクの取得に失敗しました。ログインからやり直してください。`,
            })
          );
        }
      } else {
        //ログインしていない場合、ログイン画面に戻しバナー表示
        await navigate('/');
        await dispatch(
          editBanner({
            bannerIsopen: true,
            bannerType: 'error',
            bannerMessage: `ログインしてください`,
          })
        );
      }
    };
    fetchTaskProf();
  }, [dispatch, navigate]);

  //レスポンシブ定義
  const mediaQueries = {
    mobile: '(max-width: 519px)',
    tablet: '(min-width: 520px) and (max-width: 1049px)',
    pc: '(min-width: 1050px)',
  };
  const isMobile = useMedia(mediaQueries.mobile);
  const isTablet = useMedia(mediaQueries.tablet);
  const isPC = useMedia(mediaQueries.pc);

  return (
    <>
      {isLogin && (
        <>
          {isMobile && <TaskMobile />}
          {isTablet && <TaskTablet />}
          {isPC && <TaskPC />}
        </>
      )}
    </>
  );
};

export default Task;
