import type { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  flagged?: boolean;
  className?: string;
}

export function Card({ children, flagged, className }: CardProps) {
  const classes = [styles.card, flagged ? styles.flagged : '', className].filter(Boolean).join(' ');
  return <div className={classes}>{children}</div>;
}
