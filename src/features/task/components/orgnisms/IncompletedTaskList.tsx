import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from '../molecules/TaskItem';
import { selectTasks } from '../../slice/taskSlice';
import { useTranslation } from 'react-i18next';

const InCompletedTaskList: React.FC = () => {
  const tasks = useSelector(selectTasks);
  //多言語対応用
  const { t } = useTranslation();

  //未完了タスクのみ抽出
  const IncompletedTasks = tasks.filter((task) => {
    return task.completed === false;
  });

  return (
    <div>
      <h1 style={{ margin: 0 }}>
        {t('IncompletedTaskList.incompletedTaskList')}
      </h1>
      {IncompletedTasks.map((IncompleteTask) => (
        <TaskItem key={IncompleteTask.id} task={IncompleteTask} />
      ))}
    </div>
  );
};

export default InCompletedTaskList;
