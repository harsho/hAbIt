"use client";

import { Button } from "@/components/ui/button";
import { deleteCompletedHabits, deleteAllHabits } from "@/actions/habits/actions";

export default function ClearActions() {
  return (
    <div className="flex items-center gap-2 border-t pt-2">
      <Button
        onClick={async () => {
          await deleteCompletedHabits();
        }}
        size="sm"
        variant="outline"
      >
        Clear Completed Habits
      </Button>
      <Button
        onClick={async () => {
          await deleteAllHabits();
        }}
        className="ml-auto"
        size="sm"
      >
        Clear All Habits
      </Button>
    </div>
  );
}