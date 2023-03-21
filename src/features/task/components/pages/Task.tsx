import React, { useEffect } from 'react';
import useMedia from 'use-media';
import TaskPC from '../templates/TaskPC';
import TaskMobile from '../templates/TaskMobile';
import TaskTablet from '../templates/TaskTablet';
import { useGetTask } from '../../hooks/useGetTask';
import { AppDispatch } from '../../../../stores/store';
import { useDispatch } from 'react-redux';
import { editEditedTask } from '../../slice/taskSlice';

const Task: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { getTask } = useGetTask();

  //タスク画面初期処理
  // useEffect(() => {
  //   dispatch(editEditedTask({ id: 0, name: '' }));
  //   getTask();
  // }, [getTask, dispatch]);

  useEffect(() => {
    const initTask = async () => {
      dispatch(editEditedTask({ id: 0, name: '' }));
      await getTask();
    };
    initTask();
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
