export interface Habit {
    id: number;
    user_id: string;
    habit_name: string;
    is_complete: boolean;
    inserted_at: Date;
  }