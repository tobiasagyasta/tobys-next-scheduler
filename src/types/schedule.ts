export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  priority: Priority;
  completed: boolean;
  date: string;
}

export interface TimeSlot {
  time: string;
  tasks: Task[];
}
