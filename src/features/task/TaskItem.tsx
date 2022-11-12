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
    createdAt: string;
    updatedAt: string;
  };
};

const TaskItem = (props: Props) => {
  const { task } = props;
  const dispatch = useDispatch();
  // console.log(task);

  const formatCreatedAt = new Date(task.createdAt).toLocaleString();
  const formatUpdatedAt = new Date(task.updatedAt).toLocaleString();

  return (
    <li className={styles.listItem}>
      <span className={styles.cursor}>{task.name}</span>
      <span className={styles.cursor}>登録日時：{formatCreatedAt}</span>
      <span className={styles.cursor}>更新日時：{formatUpdatedAt}</span>
      {/* <span className={styles.cursor}>登録日時：{task.createdAt}</span> */}
      {/* <span className={styles.cursor}>更新日時：{task.updatedAt}</span> */}
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
