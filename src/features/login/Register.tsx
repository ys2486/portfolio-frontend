import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import {
  editPassword,
  editUserId,
  fetchAsyncLogin,
  fetchAsyncRegister,
  selectAuthen,
  toggleMode,
} from './loginSlice';
import styles from './Register.module.css';

const Register = () => {
  const dispatch: AppDispatch = useDispatch();
  const authen = useSelector(selectAuthen);
  const btnDisabled = authen.userId === '' || authen.password === '';
  const Register = async () => {
    await dispatch(fetchAsyncRegister(authen));
    await dispatch(fetchAsyncLogin(authen));
  };

  return (
    <>
      <div className={styles.containerLogin}>
        <div className={styles.appLogin}>
          <h1>Register</h1>
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
              onClick={Register}
            >
              Register
            </Button>
          </div>
          <span
            className={styles.switchText}
            onClick={() => dispatch(toggleMode())}
          >
            Do you have already account?
          </span>
        </div>
      </div>
    </>
  );
};

export default Register;
