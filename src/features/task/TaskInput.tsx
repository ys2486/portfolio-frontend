import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../app/store';
import { taskState } from '../types/taskState';
import styles from './TaskItem.module.css';
import {
  editTask,
  fetchAsyncGet,
  fetchAsyncInsert,
  selectEditedTask,
} from './taskSlice';

const TaskInput = () => {
  const disptch: AppDispatch = useDispatch();
  const editedTask: taskState['editedTask'] = useSelector(selectEditedTask);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    disptch(editTask({ ...editedTask, id: 0, name: e.target.value }));
  };

  const createClicked = async () => {
    await disptch(fetchAsyncInsert(editedTask.name));
    await disptch(editTask({ id: 0, name: '' }));
    await disptch(fetchAsyncGet());
  };

  const isDisabled = editedTask.name.length === 0;

  return (
    <div>
      <input
        type="text"
        className={styles.taskInput}
        value={editedTask.name}
        onChange={handleInputChange}
      />
      <div className={styles.switch}>
        <Button
          variant="contained"
          color="primary"
          onClick={createClicked}
          disabled={isDisabled}
        >
          CREATE
        </Button>
      </div>
    </div>
  );
};

export default TaskInput;
