export type LoginState = {
  authen: {
    mailAddress: string;
    password: string;
  };
  registerInfo: {
    mailAddress: string;
    userName: string;
    password: string;
    passwordConfirm: string;
  };
  loginUserInfo: {
    loginUserId: number;
    loginUserMailAddress: string;
    loginUserName: string;
  };
  isLoginView: boolean;
  isLogin: boolean;
  //★追加
  isGetLoginUserInfo: boolean;
};
