import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { taskState } from '../types/taskState';
import Cookies from 'js-cookie';

//タスクAPIURL
const apiUrl = process.env.REACT_APP_TASK_API_URL;

const initialState: taskState = {
  tasks: [
    // {
    //   id: 0,
    //   name: '',
    //   completed: false,
    //   createdAt: '',
    //   updatedAt: '',
    //   createdUser: 0,
    // },
  ],
  editedTask: {
    id: 0,
    name: '',
    completed: false,
    createdAt: '',
    updatedAt: '',
    createdUser: 0,
  },
  selectedTask: {
    id: 0,
    name: '',
    completed: false,
    createdAt: '',
    updatedAt: '',
    createdUser: 0,
  },
};

//タスク全取得
export const fetchAsyncTasksGet = createAsyncThunk(
  'task/get',
  async (loginUserId: number) => {
    try {
      const token = Cookies.get('access_token');
      const res = await axios.get(`${apiUrl}/get`, {
        headers: {
          'X-AUTH-TOKEN': `Bearer ${token}`,
        },
        params: { createdUserId: loginUserId },
      });
      return res;
    } catch (e: any) {
      return e;
    }
  }
);

//タスク登録
export const fetchAsyncTaskInsert = createAsyncThunk(
  'task/insert',
  async (insertTask: taskState['editedTask']) => {
    try {
      const token = Cookies.get('access_token');
      const res = await axios.post(
        `${apiUrl}/post`,
        { name: insertTask.name, createdUser: insertTask.createdUser },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': `Bearer ${token}`,
          },
        }
      );
      return res;
    } catch (e: any) {
      return e;
    }
  }
);

//タスク削除
export const fetchAsyncTaskDelete = createAsyncThunk(
  'task/delete',
  async (taskId: number) => {
    try {
      const token = Cookies.get('access_token');
      const res = await axios.delete(`${apiUrl}/delete`, {
        headers: {
          'X-AUTH-TOKEN': `Bearer ${token}`,
        },
        data: { id: taskId },
      });
      return res;
    } catch (e: any) {
      return e;
    }
  }
);

//タスク更新
export const fetchAsyncTaskUpdate = createAsyncThunk(
  'task/update',
  async (updateTask: taskState['selectedTask']) => {
    try {
      const token = Cookies.get('access_token');
      const res = await axios.put(
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
      return res;
    } catch (e: any) {
      return e;
    }
  }
);

//タスク完了・未完了更新
export const fetchAsyncTaskCompletedUpdate = createAsyncThunk(
  'task/updateCompleted',
  async (updateTask: taskState['selectedTask']) => {
    try {
      const token = Cookies.get('access_token');
      const res = await axios.put(
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
      return res;
    } catch (e: any) {
      return e;
    }
  }
);

const taskSlice = createSlice({
  name: 'task',
  initialState: initialState,
  reducers: {
    editEditedTask(state, action) {
      state.editedTask = action.payload;
    },
    editSelectTask(state, action) {
      state.selectedTask = action.payload;
    },
    editTasks(state, action) {
      state.tasks = action.payload;
    },
  },
  //タスク全取得の後処理
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncTasksGet.fulfilled, (state, action) => {
      state.tasks = action.payload.data;
    });
    builder.addCase(fetchAsyncTaskUpdate.fulfilled, (state, action) => {
      //更新後に初期化
      state.selectedTask = {
        id: 0,
        name: '',
        completed: false,
        createdAt: '',
        updatedAt: '',
        createdUser: 0,
      };
    });
  },
});

export const { editEditedTask, editSelectTask, editTasks } = taskSlice.actions;

export const selectTasks = (state: RootState) => state.task.tasks;
export const selectEditedTask = (state: RootState) => state.task.editedTask;
export const selectSelectedTask = (state: RootState) => state.task.selectedTask;

export default taskSlice.reducer;
