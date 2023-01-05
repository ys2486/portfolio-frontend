import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import {
  editPassword,
  editUserId,
  fetchAsyncLogin,
  selectAuthen,
} from './loginSlice';
import styles from './Login.module.css';
import { Button } from '@material-ui/core';

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const authen = useSelector(selectAuthen);
  const btnDisabled = authen.userId === '' || authen.password === '';

  const login = async () => {
    await dispatch(fetchAsyncLogin(authen));
  };

  return (
    <div className={styles.containerLogin}>
      <div className={styles.appLogin}>
        <h1>{true ? 'Login' : 'Register'}</h1>
        {/* <h1>{isLoginView ? 'Login' : 'Register'}</h1> */}
        <span>Username</span>
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
            {true ? 'Login' : 'Create'}
            {/* {isLoginView ? 'Login' : 'Create'} */}
          </Button>
        </div>
        <span
          className={styles.switchText}
          // onClick={() => dispatch(toggleMode())}
        >
          Create Account?
        </span>
      </div>
    </div>
  );
};

export default Login;
