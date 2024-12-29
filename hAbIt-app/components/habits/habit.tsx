'use client';

import { useRouter } from 'next/navigation';
import HabitData from "./habit-data";
import HabitCheckbox from "./habit-checkbox";
import DeleteHabit from "./delete-habit";
import type { Habit } from "@/lib/interface";

export default function Habit({ habit }: { habit: Habit }) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking checkbox or delete button
    if (
      (e.target as HTMLElement).closest('button') ||
      (e.target as HTMLElement).closest('input[type="checkbox"]')
    ) {
      return;
    }
    router.push(`/habits/${habit.id}`);
  };

  return (
    <div 
      className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors"
      onClick={handleClick}
    >
      <div className="flex-1 flex items-center gap-2">
        <HabitCheckbox habit={habit} />
        <HabitData habit={habit} />
      </div>
      <DeleteHabit id={habit.id} />
    </div>
  );
}