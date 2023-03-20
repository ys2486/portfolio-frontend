import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BsTrash } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import styles from './TaskItem.module.css';
import { editSelectTask } from '../../slice/taskSlice';
import { AppDispatch } from '../../../../stores/store';
import TaskEditModal from '../orgnisms/TaskEditModal';
import { useDeleteTask } from '../../hooks/useDeleteTask';
import { useCompleteTask } from '../../hooks/useCompleteTask';
import { useIncompleteTask } from '../../hooks/useIncompleteTask';
import { BsCircle, BsCheckCircleFill } from 'react-icons/bs';

//propsの型
type TaskItemProps = {
  key: number;
  task: {
    id: number;
    name: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    createdUser: number;
  };
};

const TaskItem: React.FC<TaskItemProps> = (props) => {
  const { task } = props;
  const dispatch: AppDispatch = useDispatch();
  //モーダルのstate
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
  const { deleteTask } = useDeleteTask(task.id);
  const { completeTask, isCompleteIconClicked } = useCompleteTask(task);
  const { incompleteTask, isInCompleteIconClicked } = useIncompleteTask(task);

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
  const editClicked = () => {
    dispatch(editSelectTask(task));
    setEditModalIsOpen(true);
  };

  return (
    <>
      <li className={styles.listItem}>
        {/* 完了・未完了アイコン */}
        {!task.completed ? (
          // 未完了タスク
          <button className={styles.taskIcon}>
            {isCompleteIconClicked ? (
              //一時的に完了アイコンに変更
              <BsCheckCircleFill />
            ) : (
              <BsCircle onClick={completeTask} />
            )}
          </button>
        ) : (
          //完了タスク
          <button className={styles.taskIcon}>
            {isInCompleteIconClicked ? (
              //一時的に未完了アイコンに変更
              <BsCircle />
            ) : (
              <BsCheckCircleFill onClick={incompleteTask} />
            )}
          </button>
        )}

        {/* タスク内容表示エリア */}
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
