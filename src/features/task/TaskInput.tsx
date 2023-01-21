import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { taskState } from '../types/taskState';
import styles from './TaskInput.module.css';
import {
  editTask,
  fetchAsyncGet,
  fetchAsyncInsert,
  selectEditedTask,
} from './taskSlice';

const TaskInput = () => {
  const dispatch: AppDispatch = useDispatch();
  const editedTask: taskState['editedTask'] = useSelector(selectEditedTask);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editTask({ ...editedTask, name: e.target.value }));
  };

  const createClicked = async () => {
    //ログインユーザー取得
    const loginUserId = localStorage.loginUserId;
    await dispatch(
      fetchAsyncInsert({
        ...editedTask,
        createdUser: loginUserId,
      })
    );
    await dispatch(editTask({ id: 0, name: '' }));
    await dispatch(fetchAsyncGet());
  };

  const isDisabled = editedTask.name.length === 0;

  return (
    <div className={styles.taskInputContainer}>
      <input
        type="text"
        className={styles.taskInput}
        value={editedTask.name}
        onChange={handleInputChange}
        placeholder="タスクを入力してください"
      />
      <div className={styles.taskButton}>
        <Button
          variant="contained"
          color="primary"
          onClick={createClicked}
          disabled={isDisabled}
          fullWidth
        >
          CREATE
        </Button>
      </div>
    </div>
  );
};

export default TaskInput;
