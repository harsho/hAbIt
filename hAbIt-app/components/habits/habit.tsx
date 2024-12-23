import HabitData from "./habit-data";
import HabitCheckbox from "./habit-checkbox";
import DeleteHabit from "./delete-habit";

import { editHabit } from "@/actions/habits/actions";
import type { Habit } from "@/lib/interface";

export default async function Habit({ habit }: { habit: Habit }) {
  return (
    <div className="flex items-center gap-2">
      <form
        className="flex-1 flex items-center gap-2"
        action={async () => {
          "use server";

          await editHabit(habit);
        }}
      >
        <HabitCheckbox habit={habit} />
        <HabitData habit={habit} />
      </form>
      <DeleteHabit id={habit.id} />
    </div>
  );
}