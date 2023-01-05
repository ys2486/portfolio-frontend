import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { LoginState } from '../types/loginState';

//ログインURL(本番用)
// const loginURL = 'http://13.115.86.228:8080/portfolio-backend/api/login';
//ログインURL(テスト用)
const loginURL = 'http://localhost:8080/api/login';

export const fetchAsyncLogin = createAsyncThunk(
  'login/post',
  async (auth: LoginState['authen']) => {
    const res = await axios.post(loginURL, auth, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(res);
    return res.headers['x-auth-token'];
  }
);

//initialState
const initialState: LoginState = {
  authen: {
    userId: '',
    password: '',
  },
};

//ログインスライス
const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    editUserId(state, action) {
      state.authen.userId = action.payload;
    },
    editPassword(state, action) {
      state.authen.password = action.payload;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem('localJWT', action.payload || '');
      action.payload && (window.location.href = '/tasks');
    });
  },
});

export const { editUserId, editPassword } = loginSlice.actions;
export const selectAuthen = (state: RootState) => state.login.authen;

export default loginSlice.reducer;
