import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../stores/store';
import { useCreateTask } from '../../hooks/useCreateTask';
import { taskState } from '../../types/taskState';
import styles from './TaskInput.module.css';
import { editEditedTask, selectEditedTask } from '../../slice/taskSlice';
import { useTranslation } from 'react-i18next';

const TaskInput: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const editedTask: taskState['editedTask'] = useSelector(selectEditedTask);
  const isDisabled = editedTask.name.length === 0;
  const { createTask } = useCreateTask();
  //多言語対応用
  const { t } = useTranslation();

  //パスワード入力時にエンターキークリックでタスク登録処理
  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!isDisabled) {
        createTask();
      }
    }
  };

  return (
    <div className={styles.taskInputContainer}>
      <input
        type="text"
        className={styles.taskInput}
        value={editedTask.name}
        onChange={(e) =>
          dispatch(editEditedTask({ ...editedTask, name: e.target.value }))
        }
        // placeholder="タスクを入力してください"
        placeholder={t('taskInput.inputPlaceholder') || ''}
        onKeyPress={pressEnter}
      />
      <div className={styles.buttonArea}>
        <Button
          variant="contained"
          color="primary"
          onClick={createTask}
          disabled={isDisabled}
          fullWidth
          className={styles.createButton}
        >
          {t('taskInput.taskCreateButton')}
        </Button>
      </div>
    </div>
  );
};

export default TaskInput;
