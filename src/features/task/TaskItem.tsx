import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BsTrash } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import styles from './TaskItem.module.css';
import {
  fetchAsyncDelete,
  fetchAsyncGet,
  fetchAsyncUpdateCompleted,
  selectTask,
} from './taskSlice';
import { AppDispatch } from '../../app/store';
import Button from '@mui/material/Button';
import TaskEditModal from './TaskEditModal';

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
  const dispatch: AppDispatch = useDispatch();
  //モーダルのstate
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  //登録日時と更新日時を見やすいフォーマットに変換
  let formatCreatedAt;
  let formatUpdatedAt;

  if (task.createdAt) {
    formatCreatedAt = new Date(task.createdAt).toLocaleString();
  }
  if (task.updatedAt) {
    formatUpdatedAt = new Date(task.updatedAt).toLocaleString();
  }

  //Deleteボタンクリック時の処理
  const deleteClicked = async () => {
    await dispatch(fetchAsyncDelete(task.id));
    await dispatch(fetchAsyncGet());
  };

  //未完了タスクの「完了」ボタンクリック時の処理
  const completeClicked = async () => {
    await dispatch(fetchAsyncUpdateCompleted({ ...task, completed: true }));
    await dispatch(fetchAsyncGet());
  };

  //完了タスクの「戻す」ボタンクリック時の処理
  const inCompleteClicked = async () => {
    await dispatch(fetchAsyncUpdateCompleted({ ...task, completed: false }));
    await dispatch(fetchAsyncGet());
  };

  return (
    <>
      <li className={styles.listItem}>
        <span
          className={styles.cursor}
          onClick={() => {
            setEditModalIsOpen(true);
            dispatch(selectTask(task));
          }}
        >
          {task.name}
        </span>
        <div className={styles.buttonArea}>
          <button className={styles.taskIcon} onClick={deleteClicked}>
            <BsTrash />
          </button>
          <button className={styles.taskIcon}>
            <FaEdit
              onClick={() => {
                setEditModalIsOpen(true);
                dispatch(selectTask(task));
              }}
            />
          </button>
          {/* 完了・戻すボタン */}
          {task.completed === false ? (
            <Button
              variant="contained"
              color="inherit"
              size="small"
              onClick={completeClicked}
            >
              完了
            </Button>
          ) : (
            <Button
              variant="contained"
              color="inherit"
              size="small"
              onClick={inCompleteClicked}
            >
              戻す
            </Button>
          )}
        </div>
      </li>
      {/* 以下編集用モーダル */}
      <TaskEditModal
        editModalIsOpen={editModalIsOpen}
        setEditModalIsOpen={setEditModalIsOpen}
        formatCreatedAt={formatCreatedAt}
        formatUpdatedAt={formatUpdatedAt}
      />
    </>
  );
};

export default TaskItem;
