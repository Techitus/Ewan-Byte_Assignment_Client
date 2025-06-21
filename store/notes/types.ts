export enum Status {
  COMPLETED = 'completed',
  LOADING = 'loading',
  ERROR = 'error',
}

export interface Note {
  [x: string]: string;
  title: string;
  content: string;
}

export interface INotesState {
  notes: Note[]; 
  status: Status;
  noteAction: string | null;
}

export const initialNotesState: INotesState = {
  notes: [],
  status: Status.LOADING,
  noteAction: null,
};
