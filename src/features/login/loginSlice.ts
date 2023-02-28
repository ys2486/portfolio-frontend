import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
    const res = await axios.post(`${loginURL}/user/register`, auth, {
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

//ログインユーザー情報取得
export const fetchAsyncLoginUserInfoGet = createAsyncThunk(
  'loginUserInfo/get',
  async (loginUserMailAddress: string) => {
    try {
      const token = Cookies.get('access_token');
      const res = await axios.get(`${loginURL}/user/getUserInfo`, {
        headers: {
          'X-AUTH-TOKEN': `Bearer ${token}`,
        },
        params: { loginUserMailAddress: loginUserMailAddress },
      });
      return res;
    } catch (e: any) {
      return e;
    }
  }
);

//initialState
const initialState: LoginState = {
  authen: {
    mailAddress: '',
    password: '',
  },
  registerInfo: {
    mailAddress: '',
    userName: '',
    password: '',
    passwordConfirm: '',
  },
  loginUserInfo: {
    loginUserId: 0,
    loginUserMailAddress: '',
    loginUserName: '',
  },
  isLoginView: true,
  isLogin: false,
};

//ログインスライス
const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    editmailAddress(state, action) {
      state.authen.mailAddress = action.payload;
    },
    editPassword(state, action) {
      state.authen.password = action.payload;
    },
    editRegisterMailAddress(state, action) {
      state.registerInfo.mailAddress = action.payload;
    },
    editRegisterUserName(state, action) {
      state.registerInfo.userName = action.payload;
    },
    editRegisterPassword(state, action) {
      state.registerInfo.password = action.payload;
    },
    editRegisterPasswordConfirm(state, action) {
      state.registerInfo.passwordConfirm = action.payload;
    },
    editLoginUserId(state, action) {
      state.loginUserInfo.loginUserId = action.payload;
    },
    editLoginUserMailAddress(state, action) {
      state.loginUserInfo.loginUserMailAddress = action.payload;
    },
    editLoginUserName(state, action) {
      state.loginUserInfo.loginUserName = action.payload;
    },
    toggleMode(state) {
      state.isLoginView = !state.isLoginView;
    },
    editIsLogin(state, action) {
      state.isLogin = action.payload;
    },
  },
  //ログインユーザー情報取得後の処理
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLoginUserInfoGet.fulfilled, (state, action) => {
      // state.loginUserInfo = action.payload.data;
      state.loginUserInfo.loginUserId = action.payload.data.userId;
      state.loginUserInfo.loginUserMailAddress =
        action.payload.data.mailAddress;
      state.loginUserInfo.loginUserName = action.payload.data.userName;
    });
  },
});

export const {
  editmailAddress,
  editPassword,
  editRegisterMailAddress,
  editRegisterUserName,
  editRegisterPassword,
  editRegisterPasswordConfirm,
  editLoginUserId,
  editLoginUserMailAddress,
  editLoginUserName,
  toggleMode,
  editIsLogin,
} = loginSlice.actions;
export const selectAuthen = (state: RootState) => state.login.authen;
export const selectRegisterInfo = (state: RootState) =>
  state.login.registerInfo;
export const selectLoginUserInfo = (state: RootState) =>
  state.login.loginUserInfo;
export const selectIsLoginView = (state: RootState) => state.login.isLoginView;
export const selectIsLogin = (state: RootState) => state.login.isLogin;

export default loginSlice.reducer;
