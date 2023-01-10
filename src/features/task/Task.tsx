import React from 'react';
import styles from './Task.module.css';
import TaskList from './TaskList';
import TaskInput from './TaskInput';
import CompletedTaskList from './CompletedTaskList';
import InCompletedTaskList from './IncompletedTaskList';

const Task = () => {
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
        {/* <div className={styles.appTasks}>
          <TaskList />
        </div>
        <div className={styles.appTasks}>
          <TaskList />
        </div> */}
      </div>
    </div>
  );
};

export default Task;
