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

export interface GpaInputs {
  scienceGpa: number;
  cumulativeGpa: number;
  creditsCompleted: number;
  creditsRemaining: number;
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
  | { type: 'SET_GPA_INPUTS'; payload: Partial<GpaInputs> };
