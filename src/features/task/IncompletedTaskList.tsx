import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { selectTasks } from './taskSlice';

const InCompletedTaskList = () => {
  const tasks = useSelector(selectTasks);

  //未完了タスクのみ抽出
  const IncompletedTasks = tasks.filter((task) => {
    return task.completed === false;
  });

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
