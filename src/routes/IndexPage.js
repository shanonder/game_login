import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import  DebugLogin from '../components/LoginForm';

function IndexPage() {
  return (
    <div className={styles.main}>
      {/*<h1 className={styles.title}>H5 Login</h1>*/}
      <div className={styles.welcome} />
      <DebugLogin/>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
