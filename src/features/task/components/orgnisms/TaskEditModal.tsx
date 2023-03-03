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
import { BsCheckCircleFill, BsTrash } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { useCompleteTask } from '../../hooks/useCompleteTask';
import { useDeleteTask } from '../../hooks/useDeleteTask';

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
  const { completeTask } = useCompleteTask(selectedTask);
  const { deleteTask } = useDeleteTask(selectedTask.id);

  //多言語対応用
  const { t } = useTranslation();

  //完了ボタンクリック時
  const completeButtonClicked = async () => {
    await completeTask();
    await setEditModalIsOpen(false);
  };

  //削除ボタンクリック時
  const deleteButtonClicked = async () => {
    await deleteTask();
    await setEditModalIsOpen(false);
  };

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
        <Grid container justifyContent="space-around">
          {/* 更新ボタン */}
          <Grid item xs={5}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={updateTask}
              className={styles.modalButton}
              startIcon={<FaEdit />}
            >
              {t('TaskEditModal.updateButton')}
            </Button>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-around">
          {/* 完了ボタン */}
          <Grid item xs={5}>
            <Button
              color="success"
              variant="contained"
              fullWidth
              onClick={completeButtonClicked}
              className={styles.modalButton}
              startIcon={<BsCheckCircleFill />}
            >
              {t('TaskEditModal.completeButton')}
            </Button>
          </Grid>
          {/* 削除ボタン */}
          <Grid item xs={5}>
            <Button
              color="error"
              variant="contained"
              fullWidth
              onClick={deleteButtonClicked}
              className={styles.modalButton}
              startIcon={<BsTrash />}
            >
              {t('TaskEditModal.deleteButton')}
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Modal>
  );
};

export default TaskEditModal;
