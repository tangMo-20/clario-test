'use client';

import { SignUp } from '@/screens/SignUp/SignUp';
import styles from './root.module.scss';

const App = () => {
  return (
    <div className={styles.root}>
      <SignUp />
    </div>
  );
};

export default App;
