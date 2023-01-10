import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsTrash } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import styles from './TaskItem.module.css';
import {
  fetchAsyncDelete,
  fetchAsyncGet,
  fetchAsyncUpdate,
  fetchAsyncUpdateCompleted,
  selectSelectedTask,
  selectTask,
} from './taskSlice';
import { AppDispatch } from '../../app/store';
import Modal from 'react-modal';
import { Grid, TextField, Typography } from '@material-ui/core';
import { taskState } from '../types/taskState';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

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

//モーダルのスタイル
const customStyles = {
  content: {
    top: '20%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '40%',
  },
};

const TaskItem = (props: Props) => {
  const { task } = props;
  const dispatch: AppDispatch = useDispatch();
  const selectedTask: taskState['selectedTask'] =
    useSelector(selectSelectedTask);
  //モーダルのstate
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  //登録日時と更新日時を見やすいフォーマットに変換
  let formatCreatedAt;
  let formatUpdatedAt;

  if (task.createdAt) {
    // formatCreatedAt = new Date(task.createdAt).toLocaleString();
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

  //モーダルのタスク入力
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      selectTask({ ...selectedTask, id: selectedTask.id, name: e.target.value })
    );
  };

  //モーダル内のUPDATEボタンクリック時の処理
  const updateClicked = async () => {
    await dispatch(fetchAsyncUpdate(selectedTask));
    await dispatch(fetchAsyncGet());
    await setEditModalIsOpen(false);
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
        <span className={styles.cursor}>{task.name}</span>
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
          {/* <Button variant="outlined" color="warning" startIcon={<BsTrash />}> */}
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
      <Modal
        isOpen={editModalIsOpen}
        style={customStyles}
        onRequestClose={() => setEditModalIsOpen(false)}
      >
        <Stack spacing={2}>
          <TextField
            variant="outlined"
            label="タスク"
            fullWidth
            value={selectedTask.name}
            onChange={handleInputChange}
          />
          {formatCreatedAt && (
            <Typography variant="h6">登録日時：{formatCreatedAt}</Typography>
          )}
          {formatUpdatedAt && (
            <Typography variant="h6">更新日時：{formatUpdatedAt}</Typography>
          )}
          <Grid container justifyContent="center">
            <Grid item xs={3}>
              <Button variant="contained" fullWidth onClick={updateClicked}>
                UPDATE
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Modal>
    </>
  );
};

export default TaskItem;
