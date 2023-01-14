import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import TaskItem from './TaskItem';
import { fetchAsyncGet, selectTasks } from './taskSlice';

const CompletedTaskList = () => {
  const tasks = useSelector(selectTasks);
  //Appdisptchの型が必須
  const dispatch: AppDispatch = useDispatch();

  //完了タスクのみ抽出
  const completedTasks = tasks.filter((task) => {
    return task.completed === true;
  });

  useEffect(() => {
    const fetchTaskProf = async () => {
      await dispatch(fetchAsyncGet());
    };
    fetchTaskProf();
  }, [dispatch]);

  return (
    <div>
      <h1 style={{ margin: 0 }}>完了タスク一覧</h1>
      {completedTasks.map((completeTask) => (
        <TaskItem key={completeTask.id} task={completeTask} />
      ))}
    </div>
  );
};

export default CompletedTaskList;
