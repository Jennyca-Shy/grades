export interface Subject {
  _id: string;
  name: string;
  teacher: string;
  room: string;
  color: string;
  notes: string;
  type: 'LK' | 'GK' | 'sonstiges' | 'seminar';
  abitur: boolean;
}

export interface Homework {
  _id: string;
  title: string;
  subject: Subject;
  dueDate: string;
  notes?: string;
  status: 'finished' | 'due' | 'overdue';
}
