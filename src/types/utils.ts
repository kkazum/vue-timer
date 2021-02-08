export interface ChildTimer {
  id: string;
  pickTime: number;
  totalTime: number;
  title: string;
  resetButton: boolean;
  minutes: number;
  seconds: string;
  timerId: number | null;
  isMaskShown: boolean;
}

export interface ParentTimer {
  totalTime: number;
  title: string;
  resetButton: boolean;
  minutes: number;
  seconds: string;
}
