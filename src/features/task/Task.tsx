import React, { useEffect } from 'react';
import useMedia from 'use-media';
import TaskPC from './TaskPC';
import TaskMobile from './TaskMobile';
import TaskTablet from './TaskTablet';
import { useGetTask } from '../hooks/useGetTask';
import { AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';
import { editEditedTask } from './taskSlice';

const Task: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { getTask } = useGetTask();

  //タスク画面初期処理
  useEffect(() => {
    dispatch(editEditedTask({ id: 0, name: '' }));
    getTask();
  }, [getTask, dispatch]);

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
