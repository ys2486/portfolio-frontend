import React, { VFC } from 'react';
import { useDispatch } from 'react-redux';
import { BsTrash } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import styles from './TaskItem.module.css';
import { taskState } from '../types/taskState';

type Props = {
  key: number;
  task: {
    id: number;
    name: string;
    completed: boolean;
  };
};

const TaskItem = (props: Props) => {
  const { task } = props;
  const dispatch = useDispatch();
  // console.log(task);

  return (
    <li className={styles.listItem}>
      <span className={styles.cursor}>{task.name}</span>
      <div>
        <button className={styles.taskIcon}>
          <BsTrash />
        </button>
        <button className={styles.taskIcon}>
          <FaEdit />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
