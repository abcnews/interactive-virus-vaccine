import React from 'react';
import styles from './styles.scss';

import testsvg from "./test.svg"



export default props => {
  console.log(testsvg, "Hello")
  return (
    <div className={styles.root}>
      <img src={testsvg} />
    </div>
  );
}
