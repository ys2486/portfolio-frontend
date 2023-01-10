import { Button, Grid } from '@material-ui/core';
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
    dispatch(editTask({ ...editedTask, id: 0, name: e.target.value }));
  };

  const createClicked = async () => {
    await dispatch(fetchAsyncInsert(editedTask.name));
    await dispatch(editTask({ id: 0, name: '' }));
    await dispatch(fetchAsyncGet());
  };

  const isDisabled = editedTask.name.length === 0;

  return (
    <Grid container>
      <Grid item xs={9}>
        <input
          type="text"
          className={styles.taskInput}
          value={editedTask.name}
          onChange={handleInputChange}
          placeholder="タスクを入力してください"
        />
      </Grid>
      <Grid xs={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={createClicked}
          disabled={isDisabled}
          fullWidth
        >
          CREATE
        </Button>
      </Grid>
    </Grid>
  );
};

export default TaskInput;
