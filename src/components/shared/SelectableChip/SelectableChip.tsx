import typography from '../../../styles/typography.module.css';
import styles from './SelectableChip.module.css';

interface SelectableChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function SelectableChip({ label, selected, onClick }: SelectableChipProps) {
  return (
    <button
      type="button"
      className={`${typography.bodySmall} ${styles.chip} ${selected ? styles.selected : ''}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
}
