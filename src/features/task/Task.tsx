import React from 'react';
import styles from './Task.module.css';
import TaskList from './TaskList';
import TaskInput from './TaskInput';

const Task = () => {
  return (
    <div className={styles.containerTasks}>
      <div className={styles.appTasks}>
        <TaskInput />
        <TaskList />
      </div>
    </div>
  );
};

export default Task;
