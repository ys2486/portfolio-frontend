import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { selectTasks } from './taskSlice';

const CompletedTaskList = () => {
  const tasks = useSelector(selectTasks);

  //完了タスクのみ抽出
  const completedTasks = tasks.filter((task) => {
    return task.completed === true;
  });

  return (
    <div>
      <h1 style={{ margin: 0, fontFamily: "'Comic Neue', cursive" }}>
        完了タスク一覧
      </h1>
      {completedTasks.map((completeTask) => (
        <TaskItem key={completeTask.id} task={completeTask} />
      ))}
    </div>
  );
};

export default CompletedTaskList;
