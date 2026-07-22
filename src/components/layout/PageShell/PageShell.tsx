import type { ReactNode } from 'react';
import { TabBar } from '../TabBar/TabBar';
import styles from './PageShell.module.css';

interface PageShellProps {
  children: ReactNode;
  showTabBar?: boolean;
}

export function PageShell({ children, showTabBar = true }: PageShellProps) {
  return (
    <div className={styles.shell}>
      <div className={styles.content}>{children}</div>
      {showTabBar && (
        <div className={styles.tabBarWrapper}>
          <TabBar />
        </div>
      )}
    </div>
  );
}
