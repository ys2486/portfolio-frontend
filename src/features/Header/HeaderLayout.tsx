import React, { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useIsLoginCheck } from '../hooks/useIsLoginCheck';
import { selectIsLogin } from '../login/loginSlice';
import Header from './Header';
import styles from './HeaderLayout.module.css';

type HeaderLayoutProps = {
  children: ReactNode;
};

const HeaderLayout: React.FC<HeaderLayoutProps> = (props) => {
  const { children } = props;
  const isLogin = useSelector(selectIsLogin);
  const { isLoginCheck } = useIsLoginCheck();

  //初期表示時にログイン済みチェック
  useEffect(() => {
    isLoginCheck();
  }, [isLoginCheck]);

  return (
    <>
      {/* ログイン済の時のみ画面表示 */}
      {isLogin && (
        <div className={styles.HeaderLayoutContainer}>
          <Header />
          {children}
        </div>
      )}
    </>
  );
};

export default HeaderLayout;
