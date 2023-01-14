import React from 'react';
import CompletedTaskList from './CompletedTaskList';
import InCompletedTaskList from './IncompletedTaskList';
import styles from './TaskTablet.module.css';
import TaskInput from './TaskInput';

const TaskTablet = () => {
  return (
    <div className={styles.containerTasks}>
      <div className={styles.taskInputContainer}>
        <TaskInput />
      </div>
      <div className={styles.appTaskContainer}>
        <div className={styles.incompletedTasks}>
          <InCompletedTaskList />
        </div>
        <div className={styles.completedTasks}>
          <CompletedTaskList />
        </div>
      </div>
    </div>
  );
};

export default TaskTablet;
