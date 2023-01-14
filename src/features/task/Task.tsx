import React from 'react';
import useMedia from 'use-media';
import TaskPC from './TaskPC';
import TaskMobile from './TaskMobile';
import TaskTablet from './TaskTablet';

const Task = () => {
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
