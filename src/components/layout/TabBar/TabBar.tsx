import { NavLink } from 'react-router-dom';
import typography from '../../../styles/typography.module.css';
import styles from './TabBar.module.css';

const TABS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/log', label: 'Log' },
  { to: '/schools', label: 'Schools' },
  { to: '/path', label: 'Path' },
  { to: '/roadmap', label: 'Roadmap' },
];

export function TabBar() {
  return (
    <nav className={styles.tabBar} aria-label="Primary">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) => `${styles.tab} ${isActive ? styles.tabActive : ''}`}
        >
          <span className={styles.dot} />
          <span className={typography.label}>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
