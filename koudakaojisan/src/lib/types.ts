export type Subject = {
  id: string;
  name: string;
  color?: string;
};

export type Task = {
  id: string;
  title: string;
  subject?: string;
  time?: string;
  period?: number; // 1-6 校時
};

