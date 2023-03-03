import React from 'react';
import Modal from 'react-modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Grid, TextField } from '@material-ui/core';
import { taskState } from '../../types/taskState';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedTask, editSelectTask } from '../../slice/taskSlice';
import { AppDispatch } from '../../../../stores/store';
import { useUpdateTask } from '../../hooks/useUpdateTask';
import styles from './TaskEditModal.module.css';
import { useTranslation } from 'react-i18next';

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
  //多言語対応用
  const { t } = useTranslation();

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
          label={t('TaskEditModal.taskTextFieldLabel')}
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
          <p className={styles.dateTime}>
            {t('TaskEditModal.createdAt')}
            {formatCreatedAt}
          </p>
        )}
        {formatUpdatedAt && (
          <p className={styles.dateTime}>
            {t('TaskEditModal.updatedAt')}
            {formatUpdatedAt}
          </p>
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
              {t('TaskEditModal.updateButton')}
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Modal>
  );
};

export default TaskEditModal;
