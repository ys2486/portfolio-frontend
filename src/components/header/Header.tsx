import * as React from 'react';
import styles from './Header.module.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { Avatar, Badge, Grid } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { selectLoginUserInfo } from '../../features/auth/slice/loginSlice';
import { useLogout } from '../../features/auth/hooks/useLogout';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/configs';

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
  //多言語対応用
  const { t } = useTranslation();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className={styles.barStyle}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item sm={1} xs={2}></Grid>
          {/* Todo List文言エリア */}
          <Grid item sm={10} xs={8}>
            <Typography
              variant="h6"
              align="center"
              style={{ fontFamily: "'Comic Neue', cursive" }}
              className={styles.HeaderMessage}
            >
              {t('header.todoList')}
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
              className={styles.MenuContainer}
            >
              <p className={styles.loginUserName}>
                {loginuseInfo.loginUserName}
              </p>
              <p
                onClick={() => logout(setAnchorEl)}
                className={styles.menuItem}
              >
                {t('header.logout')}
              </p>
              <p className={styles.languageTextArea}>
                <span
                  onClick={() => i18n.changeLanguage('en')}
                  className={styles.switchText}
                >
                  {t('header.english')}
                </span>
                <span>/</span>
                <span
                  className={styles.switchText}
                  onClick={() => i18n.changeLanguage('ja')}
                >
                  {t('header.japanese')}
                </span>
              </p>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
