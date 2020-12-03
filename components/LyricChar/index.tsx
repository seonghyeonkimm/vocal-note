import styles from './style.module.css';

import { forwardRef } from 'react';

type Props = {
  text: string;
} & JSX.IntrinsicElements['input'];

const LyricChar = forwardRef<HTMLInputElement, Props>(({ text, ...props }, ref) => {
  return (
    <label>
      <input
        {...props}
        ref={ref}
        type="checkbox"
        className={styles.checkbox}
      />
      <span className={styles.text}>{text}</span>
    </label>
  );
});

export default LyricChar;
