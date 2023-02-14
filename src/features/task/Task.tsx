import React, { useEffect } from 'react';
import useMedia from 'use-media';
import TaskPC from './TaskPC';
import TaskMobile from './TaskMobile';
import TaskTablet from './TaskTablet';
import { useSelector } from 'react-redux';
import { selectIsLogin } from '../login/loginSlice';
import { useInitTask } from '../hooks/useInitTask';

const Task: React.FC = () => {
  const isLogin = useSelector(selectIsLogin);
  const { initTask } = useInitTask();

  //初期処理
  useEffect(() => {
    initTask();
  }, [initTask]);

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
