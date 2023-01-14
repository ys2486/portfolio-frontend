import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import TaskItem from './TaskItem';
import { fetchAsyncGet, selectTasks } from './taskSlice';

const InCompletedTaskList = () => {
  const tasks = useSelector(selectTasks);
  //Appdisptchの型が必須
  const dispatch: AppDispatch = useDispatch();

  //未完了タスクのみ抽出
  const IncompletedTasks = tasks.filter((task) => {
    return task.completed === false;
  });

  useEffect(() => {
    const fetchTaskProf = async () => {
      await dispatch(fetchAsyncGet());
    };
    fetchTaskProf();
  }, [dispatch]);

  return (
    <div>
      <h1 style={{ margin: 0 }}>未完了タスク一覧</h1>
      {IncompletedTasks.map((IncompleteTask) => (
        <TaskItem key={IncompleteTask.id} task={IncompleteTask} />
      ))}
    </div>
  );
};

export default InCompletedTaskList;
