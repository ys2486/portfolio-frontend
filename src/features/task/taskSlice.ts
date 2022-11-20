import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { taskState } from '../types/taskState';

const apiUrl = 'http://13.115.86.228:8080/portfolio-backend/tasks';

const initialState = {
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
  const res = await axios.get(apiUrl);
  return res.data;
});

//タスク登録
export const fetchAsyncInsert = createAsyncThunk(
  'task/insert',
  async (taskName: String) => {
    await axios.post(
      apiUrl,
      { name: taskName },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
);

//タスク削除
export const fetchAsyncDelete = createAsyncThunk(
  'task/delete',
  async (taskId: number) => {
    await axios.delete(apiUrl, { data: { id: taskId } });
  }
);

//タスク更新
export const fetchAsyncUpdate = createAsyncThunk(
  'task/update',
  async (updateTask: taskState['selectedTask']) => {
    await axios.put(apiUrl, {
      id: updateTask.id,
      name: updateTask.name,
    });
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
  },
});

export const { editTask, selectTask } = taskSlice.actions;

export const selectTasks = (state: RootState) => state.task.tasks;
export const selectEditedTask = (state: RootState) => state.task.editedTask;
export const selectSelectedTask = (state: RootState) => state.task.selectedTask;

export default taskSlice.reducer;
