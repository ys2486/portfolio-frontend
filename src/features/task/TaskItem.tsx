import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BsTrash } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import styles from './TaskItem.module.css';
import {
  fetchAsyncTaskDelete,
  fetchAsyncTasksGet,
  fetchAsyncTaskCompletedUpdate,
  selectTask,
} from './taskSlice';
import { AppDispatch } from '../../app/store';
import Button from '@mui/material/Button';
import TaskEditModal from './TaskEditModal';
import { editBanner } from '../banner/bannerSlice';

type Props = {
  key: number;
  task: {
    id: number;
    name: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    createdUser: string;
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
    const res: any = await dispatch(fetchAsyncTaskDelete(task.id));
    //タスク削除成功時
    if (res.payload.request.status === 200) {
      await dispatch(fetchAsyncTasksGet());
    } else {
      //タスク削除エラー時
      await dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: `タスクの削除に失敗しました。管理者に連絡してください。`,
        })
      );
    }
  };

  //編集用ボタンもしくは、テキストクリック時の処理
  const editClicked = async () => {
    await dispatch(selectTask(task));
    await setEditModalIsOpen(true);
  };

  //未完了タスクの「完了」ボタンクリック時の処理
  const completeClicked = async () => {
    const res: any = await dispatch(
      fetchAsyncTaskCompletedUpdate({ ...task, completed: true })
    );
    //タスク完了成功時
    if (res.payload.request.status === 200) {
      await dispatch(fetchAsyncTasksGet());
    } else {
      //タスク完了エラー時
      await dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: `タスクの完了処理に失敗しました。管理者に連絡してください。`,
        })
      );
    }
  };

  //完了タスクの「戻す」ボタンクリック時の処理
  const inCompleteClicked = async () => {
    const res: any = await dispatch(
      fetchAsyncTaskCompletedUpdate({ ...task, completed: false })
    );
    //タスク未完了成功時
    if (res.payload.request.status === 200) {
      await dispatch(fetchAsyncTasksGet());
    } else {
      //タスク未完了エラー時
      await dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: `タスクの未完了処理に失敗しました。管理者に連絡してください。`,
        })
      );
    }
  };

  return (
    <>
      <li className={styles.listItem}>
        <span className={styles.cursor} onClick={editClicked}>
          {task.name}
        </span>
        <div className={styles.buttonArea}>
          <button className={styles.taskIcon} onClick={deleteClicked}>
            <BsTrash />
          </button>
          <button className={styles.taskIcon}>
            <FaEdit onClick={editClicked} />
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
