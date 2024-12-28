"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { onCheckChange } from "@/actions/habits/actions";
import type { Habit } from "@/lib/interface";

export default function HabitCheckbox({ habit }: { habit: Habit }) {
  return (
    <Checkbox
      className="mt-0.5 w-5 h-5"
      id={habit?.id as unknown as string}
      checked={habit?.is_complete}
      onCheckedChange={() => onCheckChange(habit)}
    />
  );
}