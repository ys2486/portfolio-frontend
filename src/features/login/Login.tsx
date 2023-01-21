import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import {
  editLoginUserId,
  editPassword,
  editUserId,
  fetchAsyncLogin,
  selectAuthen,
  selectIsLoginView,
  toggleMode,
} from './loginSlice';
import styles from './Login.module.css';
import { Button } from '@material-ui/core';
import Register from './Register';

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const authen = useSelector(selectAuthen);
  const isLoginView = useSelector(selectIsLoginView);
  const btnDisabled = authen.userId === '' || authen.password === '';

  const login = async () => {
    await dispatch(fetchAsyncLogin(authen));
  };

  return (
    <>
      {isLoginView ? (
        <div className={styles.containerLogin}>
          <div className={styles.appLogin}>
            <h1>{true ? 'Login' : 'Register'}</h1>
            <span>UserId</span>
            <input
              type="text"
              className={styles.inputLog}
              name="username"
              placeholder=""
              required
              onChange={(e) => dispatch(editUserId(e.target.value))}
            />
            <span>Password</span>
            <input
              type="password"
              className={styles.inputLog}
              name="username"
              placeholder=""
              required
              onChange={(e) => dispatch(editPassword(e.target.value))}
            />
            <div className={styles.switch}>
              <Button
                variant="contained"
                disabled={btnDisabled}
                color="primary"
                onClick={login}
              >
                Login
              </Button>
            </div>
            <span
              className={styles.switchText}
              onClick={() => dispatch(toggleMode())}
            >
              Create Account?
            </span>
          </div>
        </div>
      ) : (
        <Register />
      )}
    </>
  );
};

export default Login;
