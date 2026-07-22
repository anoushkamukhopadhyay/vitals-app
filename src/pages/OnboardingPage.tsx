import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../context/AppProvider';
import type { CategoryId, YearInSchool } from '../context/types';
import { CATEGORY_LIST } from '../data/categories';
import { PageShell } from '../components/layout/PageShell/PageShell';
import { OptionRow } from '../components/shared/OptionRow/OptionRow';
import { SelectableChip } from '../components/shared/SelectableChip/SelectableChip';
import { Button } from '../components/shared/Button/Button';
import typography from '../styles/typography.module.css';

const YEARS: YearInSchool[] = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Post-bacc / Gap year'];

export function OnboardingPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState<0 | 1>(0);
  const [yearInSchool, setYearInSchool] = useState<YearInSchool | null>(null);
  const [startingContext, setStartingContext] = useState<CategoryId[]>([]);

  function toggleContext(id: CategoryId) {
    setStartingContext((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  }

  function finishOnboarding() {
    if (!yearInSchool) return;
    dispatch({ type: 'COMPLETE_ONBOARDING', payload: { yearInSchool, startingContext } });
    navigate('/dashboard');
  }

  return (
    <PageShell showTabBar={false}>
      <div>
        <p className={typography.label} style={{ color: 'var(--color-text-muted)' }}>
          VITALS
        </p>
      </div>

      {step === 0 && (
        <>
          <div>
            <h1 className={typography.headingL}>Where are you in the journey?</h1>
            <p className={typography.bodyRegular} style={{ color: 'var(--color-text-muted)', marginTop: 8 }}>
              This helps calibrate your timeline and what to prioritize first.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {YEARS.map((year) => (
              <OptionRow
                key={year}
                label={year}
                selected={yearInSchool === year}
                onClick={() => setYearInSchool(year)}
              />
            ))}
          </div>
          <Button disabled={!yearInSchool} onClick={() => setStep(1)}>
            Continue
          </Button>
        </>
      )}

      {step === 1 && (
        <>
          <div>
            <h1 className={typography.headingL}>What have you already been doing?</h1>
            <p className={typography.bodyRegular} style={{ color: 'var(--color-text-muted)', marginTop: 8 }}>
              Select everything that applies — you'll log real hours next.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {CATEGORY_LIST.map((cat) => (
              <SelectableChip
                key={cat.id}
                label={cat.label}
                selected={startingContext.includes(cat.id)}
                onClick={() => toggleContext(cat.id)}
              />
            ))}
          </div>
          <Button onClick={finishOnboarding}>Get started</Button>
        </>
      )}
    </PageShell>
  );
}
