import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BsTrash } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import styles from './TaskItem.module.css';
import { selectTask } from './taskSlice';
import { AppDispatch } from '../../app/store';
import Button from '@mui/material/Button';
import TaskEditModal from './TaskEditModal';
import { useDeleteTask } from '../hooks/useDeleteTask';
import { useCompleteTask } from '../hooks/useCompleteTask';
import { useIncompleteTask } from '../hooks/useIncompleteTask';

//propsの型
type TaskItemProps = {
  key: number;
  task: {
    id: number;
    name: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    createdUser: string;
  };
};

const TaskItem: React.FC<TaskItemProps> = (props) => {
  const { task } = props;
  const dispatch: AppDispatch = useDispatch();
  //モーダルのstate
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
  const { deleteTask } = useDeleteTask(task.id);
  const { completeTask } = useCompleteTask(task);
  const { incompleteTask } = useIncompleteTask(task);

  //登録日時と更新日時を見やすいフォーマットに変換
  let formatCreatedAt: string = '';
  let formatUpdatedAt: string = '';
  if (task.createdAt) {
    formatCreatedAt = new Date(task.createdAt).toLocaleString();
  }
  if (task.updatedAt) {
    formatUpdatedAt = new Date(task.updatedAt).toLocaleString();
  }

  //編集用ボタンもしくは、テキストクリック時の処理
  const editClicked = async () => {
    await dispatch(selectTask(task));
    await setEditModalIsOpen(true);
  };

  return (
    <>
      <li className={styles.listItem}>
        {/* タスク表示エリア */}
        <span className={styles.cursor} onClick={editClicked}>
          {task.name}
        </span>
        <div className={styles.buttonArea}>
          {/* 削除アイコン */}
          <button className={styles.taskIcon} onClick={deleteTask}>
            <BsTrash />
          </button>
          {/* 編集アイコン */}
          <button className={styles.taskIcon}>
            <FaEdit onClick={editClicked} />
          </button>
          {/* 完了 or 戻すボタン */}
          {task.completed === false ? (
            <Button
              variant="contained"
              color="inherit"
              size="small"
              onClick={completeTask}
            >
              完了
            </Button>
          ) : (
            <Button
              variant="contained"
              color="inherit"
              size="small"
              onClick={incompleteTask}
            >
              戻す
            </Button>
          )}
        </div>
      </li>
      {/* 以下編集用モーダル */}
      <TaskEditModal
        editModalIsOpen={editModalIsOpen}
        setEditModalIsOpen={setEditModalIsOpen}
        formatCreatedAt={formatCreatedAt}
        formatUpdatedAt={formatUpdatedAt}
      />
    </>
  );
};

export default TaskItem;
