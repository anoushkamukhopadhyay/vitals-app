import type { ButtonHTMLAttributes } from 'react';
import typography from '../../../styles/typography.module.css';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  const classes = [
    typography.headingS,
    styles.button,
    variant === 'secondary' ? styles.secondary : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return <button className={classes} {...props} />;
}
