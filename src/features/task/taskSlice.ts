import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { taskState } from '../types/taskState';

//本番用
// const apiUrl = 'http://13.115.86.228:8080/portfolio-backend/api/tasks';
//検証用
const apiUrl = 'http://localhost:8080/api/tasks';
//トークン
const token = localStorage.localJWT;

const initialState: taskState = {
  tasks: [
    {
      id: 0,
      name: '',
      completed: false,
      createdAt: '',
      updatedAt: '',
    },
  ],
  editedTask: {
    id: 0,
    name: '',
    completed: false,
    createdAt: '',
    updatedAt: '',
  },
  selectedTask: {
    id: 0,
    name: '',
    completed: false,
    createdAt: '',
    updatedAt: '',
  },
};

//タスク全取得
export const fetchAsyncGet = createAsyncThunk('task/get', async () => {
  const res = await axios.get(`${apiUrl}/get`, {
    headers: {
      'X-AUTH-TOKEN': `Bearer ${token}`,
    },
  });
  return res.data;
});

//タスク登録
export const fetchAsyncInsert = createAsyncThunk(
  'task/insert',
  async (taskName: String) => {
    await axios.post(
      `${apiUrl}/post`,
      { name: taskName },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-AUTH-TOKEN': `Bearer ${token}`,
        },
      }
    );
  }
);

//タスク削除
export const fetchAsyncDelete = createAsyncThunk(
  'task/delete',
  async (taskId: number) => {
    await axios.delete(`${apiUrl}/delete`, {
      headers: {
        'X-AUTH-TOKEN': `Bearer ${token}`,
      },
      data: { id: taskId },
    });
  }
);

//タスク更新
export const fetchAsyncUpdate = createAsyncThunk(
  'task/update',
  async (updateTask: taskState['selectedTask']) => {
    await axios.put(
      `${apiUrl}/put`,
      {
        id: updateTask.id,
        name: updateTask.name,
      },
      {
        headers: {
          'X-AUTH-TOKEN': `Bearer ${token}`,
        },
      }
    );
  }
);

//タスク完了・未完了更新
export const fetchAsyncUpdateCompleted = createAsyncThunk(
  'task/updateCompleted',
  async (updateTask: taskState['selectedTask']) => {
    await axios.put(
      `${apiUrl}/put/complete`,
      {
        id: updateTask.id,
        completed: updateTask.completed,
      },
      {
        headers: {
          'X-AUTH-TOKEN': `Bearer ${token}`,
        },
      }
    );
  }
);

const taskSlice = createSlice({
  name: 'task',
  initialState: initialState,
  reducers: {
    editTask(state, action) {
      state.editedTask = action.payload;
    },
    selectTask(state, action) {
      state.selectedTask = action.payload;
    },
  },
  //タスク全取得の後処理
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: action.payload,
      };
    });
    builder.addCase(fetchAsyncUpdate.fulfilled, (state, action) => {
      //更新後に初期化
      state.selectedTask = {
        id: 0,
        name: '',
        completed: false,
        createdAt: '',
        updatedAt: '',
      };
    });
  },
});

export const { editTask, selectTask } = taskSlice.actions;

export const selectTasks = (state: RootState) => state.task.tasks;
export const selectEditedTask = (state: RootState) => state.task.editedTask;
export const selectSelectedTask = (state: RootState) => state.task.selectedTask;

export default taskSlice.reducer;
