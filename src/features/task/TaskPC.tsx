import React from 'react';
import CompletedTaskList from './CompletedTaskList';
import InCompletedTaskList from './IncompletedTaskList';
import styles from './TaskPC.module.css';
import TaskInput from './TaskInput';

const TaskPC: React.FC = () => {
  return (
    <div className={styles.containerTasks}>
      {/* タスク入力エリア */}
      <div className={styles.taskInputContainer}>
        <TaskInput />
      </div>

      <div className={styles.appTaskContainer}>
        {/* 未完了タスク一覧エリア */}
        <div className={styles.taskListContainer}>
          <InCompletedTaskList />
        </div>
        {/* 完了タスク一覧エリア */}
        <div className={styles.taskListContainer}>
          <CompletedTaskList />
        </div>
      </div>
    </div>
  );
};

export default TaskPC;
