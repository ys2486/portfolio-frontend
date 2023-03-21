import React, { useEffect } from 'react';
import useMedia from 'use-media';
import TaskPC from '../templates/TaskPC';
import TaskMobile from '../templates/TaskMobile';
import TaskTablet from '../templates/TaskTablet';
import { useGetTask } from '../../hooks/useGetTask';
import { AppDispatch } from '../../../../stores/store';
import { useDispatch, useSelector } from 'react-redux';
import { editEditedTask } from '../../slice/taskSlice';
import { selectIsGetLoginUserInfo } from '../../../auth/slice/loginSlice';

const Task: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { getTask } = useGetTask();
  const isGetLoginUserInfo = useSelector(selectIsGetLoginUserInfo);

  //タスク画面初期処理
  useEffect(() => {
    const initTask = async () => {
      dispatch(editEditedTask({ id: 0, name: '' }));
      await getTask();
    };
    //ログインユーザー情報取得後に実行
    if (isGetLoginUserInfo) {
      initTask();
    }
  }, [getTask, dispatch, isGetLoginUserInfo]);

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
      {isMobile && <TaskMobile />}
      {isTablet && <TaskTablet />}
      {isPC && <TaskPC />}
    </>
  );
};

export default Task;
