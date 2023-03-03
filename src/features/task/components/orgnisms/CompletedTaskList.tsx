import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from '../molecules/TaskItem';
import { selectTasks } from '../../slice/taskSlice';
import { useTranslation } from 'react-i18next';

const CompletedTaskList: React.FC = () => {
  const tasks = useSelector(selectTasks);
  //多言語対応用
  const { t } = useTranslation();

  //完了タスクのみ抽出
  const completedTasks = tasks.filter((task) => {
    return task.completed === true;
  });

  return (
    <div>
      <h1 style={{ margin: 0 }}>{t('CompletedTaskList.completedTaskList')}</h1>
      {completedTasks.map((completeTask) => (
        <TaskItem key={completeTask.id} task={completeTask} />
      ))}
    </div>
  );
};

export default CompletedTaskList;
