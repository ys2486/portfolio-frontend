import React from 'react';
import Modal from 'react-modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Grid, TextField } from '@material-ui/core';
import { taskState } from '../types/taskState';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedTask, editSelectTask } from './taskSlice';
import { AppDispatch } from '../../app/store';
import { useUpdateTask } from '../hooks/useUpdateTask';
import styles from './TaskEditModal.module.css';

//モーダルのスタイル
const customStyles = {
  overlay: {
    overflow: 'auto',
  },
  content: {
    top: '10%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, 0)',
    minWidth: '50%',
  },
};

//モーダルのpropsの型
type taskEditModalProps = {
  editModalIsOpen: boolean;
  setEditModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formatCreatedAt: string;
  formatUpdatedAt: string;
};

const TaskEditModal: React.FC<taskEditModalProps> = (props) => {
  const {
    editModalIsOpen,
    setEditModalIsOpen,
    formatCreatedAt,
    formatUpdatedAt,
  } = props;

  const dispatch: AppDispatch = useDispatch();
  const selectedTask: taskState['selectedTask'] =
    useSelector(selectSelectedTask);
  const { updateTask } = useUpdateTask(setEditModalIsOpen);

  return (
    <Modal
      isOpen={editModalIsOpen}
      style={customStyles}
      onRequestClose={() => setEditModalIsOpen(false)}
    >
      <Stack spacing={2}>
        <TextField
          className={styles.textArea}
          variant="outlined"
          label="タスク"
          fullWidth
          multiline
          value={selectedTask.name}
          onChange={(e) =>
            dispatch(
              editSelectTask({
                ...selectedTask,
                id: selectedTask.id,
                name: e.target.value,
              })
            )
          }
        />
        {formatCreatedAt && (
          <p className={styles.dateTime}>登録日時：{formatCreatedAt}</p>
        )}
        {formatUpdatedAt && (
          <p className={styles.dateTime}>更新日時：{formatUpdatedAt}</p>
        )}
        <Grid container justifyContent="center">
          <Grid item xs={3}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={updateTask}
              className={styles.updateButton}
            >
              UPDATE
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Modal>
  );
};

export default TaskEditModal;
