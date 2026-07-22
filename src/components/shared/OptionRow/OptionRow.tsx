import typography from '../../../styles/typography.module.css';
import styles from './OptionRow.module.css';

interface OptionRowProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionRow({ label, selected, onClick }: OptionRowProps) {
  return (
    <button
      type="button"
      className={`${styles.row} ${selected ? styles.selected : ''}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span className={`${styles.dot} ${selected ? styles.dotSelected : ''}`} />
      <span className={`${typography.bodyRegular} ${selected ? styles.labelSelected : styles.label}`}>
        {label}
      </span>
    </button>
  );
}
