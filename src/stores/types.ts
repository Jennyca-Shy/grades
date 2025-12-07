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

export interface Grade {
  _id: string;
  title: string;
  subject: Subject;
  date: string;
  result: number;
  outOf: number;
  semester: '12/1' | '12/2' | '13/1' | '13/2' | 'none';
  type: 'Schulaufgabe' | 'Kurzarbeit' | 'Stegreifaufgabe' | 'Abfrage' | 'Abitur';
  notes: string;
}
