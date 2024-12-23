"use client";

import { useEffect, useState } from "react";
import { editHabit } from "@/actions/habits/actions";
import { Input } from "@/components/ui/input";
import type { Habit } from "@/lib/interface";

export default function HabitData({ habit }: { habit: Habit }) {
  const [description, setDescription] = useState(habit.task);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  useEffect(() => {
    setDescription(habit.task);
  }, [habit.task]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDescription(newValue);

    // Clear previous timeout if exists
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout
    setTypingTimeout(
      setTimeout(async () => {
        await editHabit({ ...habit, task: e.target.value });
      }, 2000),
    );
  };

  return (
    <Input
      className="p-0 border-none focus-visible:ring-transparent"
      value={description}
      onChange={handleInputChange}
    />
  );
}