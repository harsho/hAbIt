export interface Habit {
    id: number;
    user_id: string;
    habit_name: string;
    description: string;
    improvement_areas: string;
    completion_frequency: string;
    is_complete: boolean;
    inserted_at: Date;
    updated_at: Date;
  }