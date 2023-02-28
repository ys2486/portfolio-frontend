import * as React from 'react';
import styles from './Header.module.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Avatar, Badge, Grid } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { selectLoginUserInfo } from '../../features/auth/slice/loginSlice';
import { useLogout } from '../../features/auth/hooks/useLogout';

//ユーザーアイコン右下の緑色マークのスタイル
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const loginuseInfo = useSelector(selectLoginUserInfo);
  const { logout } = useLogout();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className={styles.barStyle}>
      <Toolbar>
        {/* Todo List文言エリア */}
        <Grid container alignItems="center">
          <Grid item sm={1} xs={2}></Grid>
          <Grid item sm={10} xs={8}>
            {/* <Grid item sm={11} xs={10}> */}
            <Typography
              variant="h6"
              align="center"
              style={{ fontFamily: "'Comic Neue', cursive" }}
              className={styles.HeaderMessage}
            >
              Todo List
            </Typography>
          </Grid>

          {/* ユーザーアイコンエリア */}
          <Grid item sm={1} xs={2}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <Avatar
                  alt={loginuseInfo.loginUserName}
                  src="*"
                  className={styles.userIcon}
                />
              </StyledBadge>
            </IconButton>

            {/* ユーザーアイコンクリック時のメニュー */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <p className={styles.loginUserName}>
                {loginuseInfo.loginUserName}
              </p>
              <MenuItem
                onClick={() => logout(setAnchorEl)}
                className={styles.menuItem}
              >
                Logout
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
