import React, { memo, ReactNode } from 'react';
import Header from './Header';
import styles from './HeaderLayout.module.css';

type HeaderLayoutProps = {
  children: ReactNode;
};

const HeaderLayout: React.FC<HeaderLayoutProps> = (props) => {
  const { children } = props;

  return (
    <div className={styles.HeaderLayoutContainer}>
      <Header />
      {children}
    </div>
  );
};

export default HeaderLayout;
