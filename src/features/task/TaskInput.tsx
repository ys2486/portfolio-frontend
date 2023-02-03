import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { editBanner } from '../banner/bannerSlice';
import { taskState } from '../types/taskState';
import styles from './TaskInput.module.css';
import {
  editTask,
  fetchAsyncTasksGet,
  fetchAsyncTaskInsert,
  selectEditedTask,
} from './taskSlice';

const TaskInput = () => {
  const dispatch: AppDispatch = useDispatch();
  const editedTask: taskState['editedTask'] = useSelector(selectEditedTask);
  const isDisabled = editedTask.name.length === 0;

  //タスク入力時の処理
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editTask({ ...editedTask, name: e.target.value }));
  };

  //タスク登録処理
  const createClicked = async () => {
    const loginUserId = localStorage.loginUserId;
    const res: any = await dispatch(
      fetchAsyncTaskInsert({
        ...editedTask,
        createdUser: loginUserId,
      })
    );
    //タスク登録成功時
    if (res.payload.request.status === 200) {
      await dispatch(editTask({ id: 0, name: '' }));
      await dispatch(fetchAsyncTasksGet());
    } else {
      //タスク登録エラー時
      await dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: `タスクの登録に失敗しました。管理者に連絡してください。`,
        })
      );
    }
  };

  //パスワード入力時にエンターキークリックでタスク追加処理
  const pressEnter = (e: any) => {
    if (e.key === 'Enter') {
      if (!isDisabled) {
        createClicked();
      }
    }
  };

  return (
    <div className={styles.taskInputContainer}>
      <input
        type="text"
        className={styles.taskInput}
        value={editedTask.name}
        onChange={handleInputChange}
        placeholder="タスクを入力してください"
        onKeyPress={pressEnter}
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
