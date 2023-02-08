import React from 'react';
import Modal from 'react-modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Grid, TextField, Typography } from '@material-ui/core';
import { taskState } from '../types/taskState';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAsyncTasksGet,
  fetchAsyncTaskUpdate,
  selectSelectedTask,
  selectTask,
} from './taskSlice';
import { AppDispatch } from '../../app/store';
import { editBanner } from '../banner/bannerSlice';

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

  //タスク変更処理
  const updateClicked = async () => {
    const res = await dispatch(fetchAsyncTaskUpdate(selectedTask));
    //タスク変更成功時
    if (res.payload.request.status === 200) {
      await dispatch(fetchAsyncTasksGet());
      await setEditModalIsOpen(false);
    } else {
      //タスク更新エラー時
      await dispatch(
        editBanner({
          bannerIsopen: true,
          bannerType: 'error',
          bannerMessage: `タスクの更新に失敗しました。管理者に連絡してください。`,
        })
      );
    }
  };

  //モーダルのタスク入力
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      selectTask({ ...selectedTask, id: selectedTask.id, name: e.target.value })
    );
  };

  return (
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
  );
};

export default TaskEditModal;
