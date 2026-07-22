export type CategoryId =
  | 'research'
  | 'clinicalShadowing'
  | 'service'
  | 'coursework'
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

export interface AppState {
  profile: Profile;
  entries: LogEntry[];
}

export type Action =
  | {
      type: 'COMPLETE_ONBOARDING';
      payload: { yearInSchool: YearInSchool; startingContext: CategoryId[] };
    }
  | {
      type: 'ADD_ENTRY';
      payload: { category: CategoryId; hours: number; description: string };
    };
