import React from 'react';
import styles from './Task.module.css';
import { FaSignInAlt } from 'react-icons/fa';
import TaskList from './TaskList';
import TaskInput from './TaskInput';

const Task = () => {
  return (
    <div className={styles.containerTasks}>
      <div className={styles.appTasks}>
        <button className={styles.signBtn}>
          <FaSignInAlt />
          <TaskInput />
          <TaskList />
        </button>
      </div>
      <div className={styles.appDetails}></div>
    </div>
  );
};

export default Task;
