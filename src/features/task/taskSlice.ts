import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { taskState } from '../types/taskState';

//タスクAPIURL（本番）
// const apiUrl = 'http://13.115.86.228:8080/portfolio-backend/api/tasks';
//タスクAPIURL（テスト用）
const apiUrl = process.env.REACT_APP_TASK_API_URL;
// const apiUrl = 'http://localhost:8080/api/tasks';
//トークン
// const token = localStorage.localJWT;

const initialState: taskState = {
  tasks: [
    {
      id: 0,
      name: '',
      completed: false,
      createdAt: '',
      updatedAt: '',
      createdUser: '',
    },
  ],
  editedTask: {
    id: 0,
    name: '',
    completed: false,
    createdAt: '',
    updatedAt: '',
    createdUser: '',
  },
  selectedTask: {
    id: 0,
    name: '',
    completed: false,
    createdAt: '',
    updatedAt: '',
    createdUser: '',
  },
};

//タスク全取得
export const fetchAsyncTasksGet = createAsyncThunk('task/get', async () => {
  const loginUserId = localStorage.loginUserId;
  const token = localStorage.localJWT;
  try {
    const res = await axios.get(`${apiUrl}/get`, {
      headers: {
        'X-AUTH-TOKEN': `Bearer ${token}`,
      },
      params: { createdUser: loginUserId },
    });
    return res;
  } catch (e: any) {
    return e;
  }
});

//タスク登録
export const fetchAsyncTaskInsert = createAsyncThunk(
  'task/insert',
  async (insertTask: taskState['editedTask']) => {
    const token = localStorage.localJWT;
    try {
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
    const token = localStorage.localJWT;
    try {
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
    const token = localStorage.localJWT;
    try {
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
// export const fetchAsyncTaskCompletedUpdate = createAsyncThunk(
//   'task/updateCompleted',
//   async (updateTask: taskState['selectedTask']) => {
//     const token = localStorage.localJWT;
//     await axios.put(
//       `${apiUrl}/put/complete`,
//       {
//         id: updateTask.id,
//         completed: updateTask.completed,
//       },
//       {
//         headers: {
//           'X-AUTH-TOKEN': `Bearer ${token}`,
//         },
//       }
//     );
//   }
// );
export const fetchAsyncTaskCompletedUpdate = createAsyncThunk(
  'task/updateCompleted',
  async (updateTask: taskState['selectedTask']) => {
    const token = localStorage.localJWT;
    try {
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
    editTask(state, action) {
      state.editedTask = action.payload;
    },
    selectTask(state, action) {
      state.selectedTask = action.payload;
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
        createdUser: '',
      };
    });
  },
});

export const { editTask, selectTask } = taskSlice.actions;

export const selectTasks = (state: RootState) => state.task.tasks;
export const selectEditedTask = (state: RootState) => state.task.editedTask;
export const selectSelectedTask = (state: RootState) => state.task.selectedTask;

export default taskSlice.reducer;
