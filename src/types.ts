export interface Subject {
  id: string;
  name: string;
  marks: number;
  year: number;
}

export interface TimerState {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  mode: 'work' | 'break';
}

export interface EditModalProps {
  subject: Subject | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (subject: Subject) => void;
}