export interface Habit {
    id: number;
    user_id: string;
    habit_name: string;
    description: string;
    is_complete: boolean;
    inserted_at: Date;
    updated_at: Date;
  }