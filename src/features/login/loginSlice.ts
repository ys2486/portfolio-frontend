import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { LoginState } from '../types/loginState';

//ログインURL(本番用)
// const loginURL = 'http://13.115.86.228:8080/portfolio-backend/api/login';
//ログインURL(テスト用)
const loginURL = 'http://localhost:8080/api';

//LOGINボタン押下時の処理
export const fetchAsyncLogin = createAsyncThunk(
  'login/post',
  async (auth: LoginState['authen']) => {
    try {
      const res = await axios.post(`${loginURL}/login`, auth, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res;
    } catch (e: any) {
      return e;
    }
  }
);

export const fetchAsyncRegister = createAsyncThunk(
  'register/post',
  async (auth: LoginState['authen']) => {
    try {
      const res = await axios.post(`${loginURL}/register`, auth, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res;
    } catch (e: any) {
      return e;
    }
  }
);

//ログイン判定処理
export const fetchAsyncisLogin = async () => {
  //トークン
  const token = localStorage.localJWT;
  try {
    const res = await axios.get(`${loginURL}/islogin`, {
      headers: {
        'X-AUTH-TOKEN': `Bearer ${token}`,
      },
    });
    return res;
  } catch (e: any) {
    return e;
  }
};

//initialState
const initialState: LoginState = {
  authen: {
    userId: '',
    password: '',
  },
  loginUserId: '',
  isLoginView: true,
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
    editLoginUserId(state, action) {
      state.loginUserId = action.payload;
    },
    toggleMode(state) {
      state.isLoginView = !state.isLoginView;
    },
  },
  extraReducers: (builders) => {
    //ログインAPI終了後の後処理
    builders.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      if (action.payload!.status === 200) {
        //JWTトークンを、local Strorageに保存
        localStorage.setItem(
          'localJWT',
          action.payload!.headers['x-auth-token'] || ''
        );
        //ログインユーザーIDをLocal Strorageに保存
        localStorage.setItem(
          'loginUserId',
          action.payload!.headers['login-user-id'] || ''
        );
      }
    });
  },
});

export const { editUserId, editPassword, editLoginUserId, toggleMode } =
  loginSlice.actions;
export const selectAuthen = (state: RootState) => state.login.authen;
export const selectLoginUserId = (state: RootState) => state.login.loginUserId;
export const selectIsLoginView = (state: RootState) => state.login.isLoginView;

export default loginSlice.reducer;
