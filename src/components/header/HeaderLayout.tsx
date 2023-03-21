import React, { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useIsLoginCheck } from '../../features/auth/hooks/useIsLoginCheck';
import { selectIsLogin } from '../../features/auth/slice/loginSlice';
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
  // useEffect(() => {
  //   isLoginCheck();
  // }, [isLoginCheck]);

  useEffect(() => {
    const initHeaderLayout = async () => {
      isLoginCheck();
    };
    initHeaderLayout();
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
