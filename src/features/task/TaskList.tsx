import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import TaskItem from './TaskItem';
import { fetchAsyncGet, selectTasks } from './taskSlice';

const TaskList = () => {
  const tasks = useSelector(selectTasks);
  //Appdisptchの型が必須
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchTaskProf = async () => {
      await dispatch(fetchAsyncGet());
    };
    fetchTaskProf();
  }, [dispatch]);

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
