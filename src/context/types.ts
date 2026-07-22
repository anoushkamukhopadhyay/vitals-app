export type CategoryId =
  | 'research'
  | 'clinicalShadowing'
  | 'service'
  | 'coursework'
  | 'mcat'
  | 'leadership';

export type YearInSchool =
  | 'Freshman'
  | 'Sophomore'
  | 'Junior'
  | 'Senior'
  | 'Post-bacc / Gap year';

export interface LogEntry {
  id: string;
  category: CategoryId;
  hours: number;
  description: string;
  date: string;
}

export interface Profile {
  yearInSchool: YearInSchool | null;
  onboarded: boolean;
  startingContext: CategoryId[];
}

export type PersonalStatementStage = 'notStarted' | 'drafting' | 'revising' | 'final';
export const PS_STAGES: PersonalStatementStage[] = ['notStarted', 'drafting', 'revising', 'final'];
export const PS_STAGE_LABELS: Record<PersonalStatementStage, string> = {
  notStarted: 'Not started',
  drafting: 'Drafting',
  revising: 'Revising',
  final: 'Final',
};

export type ApplicationStage = 'primary' | 'secondary' | 'interview' | 'decision';
export const APPLICATION_STAGES: ApplicationStage[] = ['primary', 'secondary', 'interview', 'decision'];
export const APPLICATION_STAGE_LABELS: Record<ApplicationStage, string> = {
  primary: 'Primary',
  secondary: 'Secondary',
  interview: 'Interview',
  decision: 'Decision',
};

export interface ApplicationState {
  personalStatementStage: PersonalStatementStage;
  interviewInvites: number;
  mockInterviewsLogged: number;
  schoolStages: Record<string, ApplicationStage>; // schoolId -> current stage
}

export type LetterGrade = 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'F';

export const GRADE_POINTS: Record<LetterGrade, number> = {
  A: 4.0,
  'A-': 3.7,
  'B+': 3.3,
  B: 3.0,
  'B-': 2.7,
  'C+': 2.3,
  C: 2.0,
  'C-': 1.7,
  'D+': 1.3,
  D: 1.0,
  F: 0.0,
};

export const LETTER_GRADES: LetterGrade[] = Object.keys(GRADE_POINTS) as LetterGrade[];

export interface GpaClass {
  id: string;
  credits: number;
  grade: LetterGrade;
  isScience: boolean;
}

export interface GpaInputs {
  scienceGpa: number;
  cumulativeGpa: number;
  scienceCreditsCompleted: number;
  cumulativeCreditsCompleted: number;
  classes: GpaClass[];
}

export interface AppState {
  profile: Profile;
  entries: LogEntry[];
  application: ApplicationState;
  gpaInputs: GpaInputs;
}

export type Action =
  | {
      type: 'COMPLETE_ONBOARDING';
      payload: { yearInSchool: YearInSchool; startingContext: CategoryId[] };
    }
  | {
      type: 'ADD_ENTRY';
      payload: { category: CategoryId; hours: number; description: string };
    }
  | { type: 'ADVANCE_PS_STAGE' }
  | { type: 'ADD_INTERVIEW_INVITE' }
  | { type: 'LOG_MOCK_INTERVIEW' }
  | { type: 'ADVANCE_SCHOOL_STAGE'; payload: { schoolId: string } }
  | { type: 'SET_GPA_INPUTS'; payload: Partial<Omit<GpaInputs, 'classes'>> }
  | { type: 'ADD_GPA_CLASS'; payload: { credits: number; grade: LetterGrade; isScience: boolean } }
  | { type: 'REMOVE_GPA_CLASS'; payload: { id: string } };
