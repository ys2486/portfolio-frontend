import reducer, {
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
  fetchAsyncLoginUserInfoGet,
} from '../slice/loginSlice';

describe('loginSlice', () => {
  let initialState = {
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
  // Reducers
  describe('Reducers of loginSlice', () => {
    describe('editmailAddress', () => {
      it('should set mailAddress of authen', () => {
        let action = { type: editmailAddress.type, payload: 'testMailAddress' };
        const state = reducer(initialState, action);
        expect(state.authen.mailAddress).toEqual('testMailAddress');
      });
    });
    describe('editPassword', () => {
      it('should set password of authen', () => {
        let action = { type: editPassword.type, payload: 'testPassword' };
        const state = reducer(initialState, action);
        expect(state.authen.password).toEqual('testPassword');
      });
    });
    describe('editRegisterMailAddress', () => {
      it('should set mailAddress of registerInfo', () => {
        let action = {
          type: editRegisterMailAddress.type,
          payload: 'testRegisterMailAddress',
        };
        const state = reducer(initialState, action);
        expect(state.registerInfo.mailAddress).toEqual(
          'testRegisterMailAddress'
        );
      });
    });
    describe('editRegisterUserName', () => {
      it('should set userName of registerInfo', () => {
        let action = {
          type: editRegisterUserName.type,
          payload: 'testRegisteruserName',
        };
        const state = reducer(initialState, action);
        expect(state.registerInfo.userName).toEqual('testRegisteruserName');
      });
    });
    describe('editRegisterPassword', () => {
      it('should set password of registerInfo', () => {
        let action = {
          type: editRegisterPassword.type,
          payload: 'testRegisterPassword',
        };
        const state = reducer(initialState, action);
        expect(state.registerInfo.password).toEqual('testRegisterPassword');
      });
    });
    describe('editRegisterPasswordConfirm', () => {
      it('should set passwordConfirm of registerInfo', () => {
        let action = {
          type: editRegisterPasswordConfirm.type,
          payload: 'testRegisterPasswordConfirm',
        };
        const state = reducer(initialState, action);
        expect(state.registerInfo.passwordConfirm).toEqual(
          'testRegisterPasswordConfirm'
        );
      });
    });
    describe('editLoginUserId', () => {
      it('should set loginUserId of loginUserInfo', () => {
        let action = {
          type: editLoginUserId.type,
          payload: 11,
        };
        const state = reducer(initialState, action);
        expect(state.loginUserInfo.loginUserId).toEqual(11);
      });
    });
    describe('editLoginUserMailAddress', () => {
      it('should set loginUserMailAddress of loginUserInfo', () => {
        let action = {
          type: editLoginUserMailAddress.type,
          payload: 'testLoginUserMailAddress',
        };
        const state = reducer(initialState, action);
        expect(state.loginUserInfo.loginUserMailAddress).toEqual(
          'testLoginUserMailAddress'
        );
      });
    });
    describe('editLoginUserName', () => {
      it('should set loginUserName of loginUserInfo', () => {
        let action = {
          type: editLoginUserName.type,
          payload: 'testLoginUserName',
        };
        const state = reducer(initialState, action);
        expect(state.loginUserInfo.loginUserName).toEqual('testLoginUserName');
      });
    });
    describe('toggleMode', () => {
      it('should change loginMode', () => {
        let action = {
          type: toggleMode.type,
          payload: false,
        };
        const state = reducer(initialState, action);
        expect(state.isLoginView).toEqual(false);
      });
    });
    describe('editIsLogin', () => {
      it('should change isLogin', () => {
        let action = {
          type: editIsLogin.type,
          payload: true,
        };
        const state = reducer(initialState, action);
        expect(state.isLogin).toEqual(true);
      });
    });
  });

  //extraReducers
  describe('extraReducers', () => {
    describe('fetchAsyncLoginUserInfoGet of extraReducer', () => {
      it('should set loginUserInfo when fullfiled', () => {
        const action = {
          type: fetchAsyncLoginUserInfoGet.fulfilled.type,
          payload: {
            data: {
              userId: 1,
              mailAddress: 'testMailAddress',
              userName: 'userName',
            },
          },
        };
        const state = reducer(initialState, action);
        expect(state.loginUserInfo).toEqual({
          loginUserId: 1,
          loginUserMailAddress: 'testMailAddress',
          loginUserName: 'userName',
        });
      });
    });
  });
});
