import React, { memo, ReactNode } from 'react';
import Header from './Header';
import styles from './HeaderLayout.module.css';

type Props = {
  children: ReactNode;
};

const HeaderLayout = memo((props: Props) => {
  const { children } = props;

  return (
    // <>
    //   <Header />
    //   {children}
    // </>
    <div className={styles.HeaderLayoutContainer}>
      <Header />
      {children}
    </div>
  );
});

export default HeaderLayout;
