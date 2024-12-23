import { createClient } from "@/utils/supabase/server";
import Habit from "./habit";
import AddHabit from "./add-habit";

export default async function Habits() {
  const supabase = createClient();

  const { data: habits, error } = await supabase.from("habits").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="flex flex-col">
        {habits &&
          habits
            .filter((habit) => {
              return habit.is_complete == false;
            })
            .map((habit) => {
              return <Habit key={habit.id} habit={habit} />;
            })}
        {habits &&
          habits
            .filter((habit) => {
              return habit.is_complete;
            })
            .map((habit) => {
              return <Habit key={habit.id} habit={habit} />;
            })}
        <AddHabit />
      </div>
    </div>
  );
}