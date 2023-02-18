import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { LoginState } from '../types/loginState';
import Cookies from 'js-cookie';

//ログインAPIURL
const loginURL = process.env.REACT_APP_LOGIN_API_URL;

//ログイン処理
export const fetchAsyncLogin = async (auth: LoginState['authen']) => {
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
};

//ユーザー登録処理
export const fetchAsyncRegister = async (auth: LoginState['authen']) => {
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
};

//ログイン済み判定処理
export const fetchAsyncisLogin = async () => {
  //トークン
  try {
    const token = Cookies.get('access_token');
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
  isLogin: false,
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
    editIsLogin(state, action) {
      state.isLogin = action.payload;
    },
  },
});

export const {
  editUserId,
  editPassword,
  editLoginUserId,
  toggleMode,
  editIsLogin,
} = loginSlice.actions;
export const selectAuthen = (state: RootState) => state.login.authen;
export const selectLoginUserId = (state: RootState) => state.login.loginUserId;
export const selectIsLoginView = (state: RootState) => state.login.isLoginView;
export const selectIsLogin = (state: RootState) => state.login.isLogin;

export default loginSlice.reducer;
