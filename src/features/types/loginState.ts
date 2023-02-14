export type LoginState = {
  authen: {
    userId: string;
    password: string;
  };
  loginUserId: string;
  isLoginView: boolean;
  isLogin: boolean;
};
