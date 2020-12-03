import styles from './style.module.css';

import { forwardRef } from 'react';
import { CheckOutlined } from '@ant-design/icons';

type Props = {
  enter?: boolean;
} & JSX.IntrinsicElements['input'];

const SpaceChar = forwardRef<any, Props>(({ enter, ...props }, ref) => {
  return (
    <>
      <label>
        <input
          {...props}
          ref={ref}
          type="checkbox"
          className={styles.checkbox}
        />
        <span className={styles.space}>
          &nbsp;&nbsp;
          <CheckOutlined />
        </span>
      </label>
      {enter && <br />}
    </>
  );
});

export default SpaceChar;
