import { Snackbar } from '@material-ui/core';
import React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import {
  editBannerIsopen,
  selectBannerIsopen,
  selectBannerMessage,
  selectBannerType,
} from './bannerSlice';
import { AppDispatch } from '../../stores/store';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Banner: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  //バナー表示に必要な情報
  const bannerIsOpen = useSelector(selectBannerIsopen);
  const bannerType = useSelector(selectBannerType);
  const bannerMessage = useSelector(selectBannerMessage);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(editBannerIsopen(false));
  };

  return (
    <Snackbar
      open={bannerIsOpen}
      autoHideDuration={1500}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={bannerType} sx={{ width: '100%' }}>
        {bannerMessage}
      </Alert>
    </Snackbar>
  );
};

export default Banner;
