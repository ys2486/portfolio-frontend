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
    createdAt: '',
    updatedAt: '',
  },
  selectedTask: {
    id: 0,
    name: '',
    createdAt: '',
    updatedAt: '',
  },
};

export const fetchAsyncGet = createAsyncThunk('task/get', async () => {
  const res = await axios.get(apiUrl);
  return res.data;
});

export const fetchAsyncInsert = createAsyncThunk(
  'task/insert',
  async (taskName: String) => {
    const res = await axios.post(
      apiUrl,
      { name: taskName },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data;
  }
);

// export const fetchAsyncInsert = createAsyncThunk(
//   'task/insert',
//   async (taskName: String) => {
//     const res = await axios.post(apiUrl, taskName, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return res.data;
//   }
// );

// export const fetchAsyncGet = createAsyncThunk('task/get', async () => {
//   const res = await axios.get(apiUrl, {
//     headers: {
//       Authorization: `JWT ${token}`,
//     },
//   });
//   // console.log(res.data);
//   return res.data;
// });

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
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: action.payload,
      };
    });
    builder.addCase(fetchAsyncInsert.fulfilled, (state, action) => {
      return;
    });
  },
});

export const { editTask, selectTask } = taskSlice.actions;

export const selectTasks = (state: RootState) => state.task.tasks;
export const selectEditedTask = (state: RootState) => state.task.editedTask;
export const selectSelectedTask = (state: RootState) => state.task.selectedTask;

export default taskSlice.reducer;
