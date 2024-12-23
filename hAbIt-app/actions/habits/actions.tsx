"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { Habit } from "@/lib/interface";

export async function addHabit(formData: FormData) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("habits")
    .insert([
      {
        user_id: user?.id,
        task: formData.get("task") as string,
        is_complete: false,
        inserted_at: new Date(),
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

export async function editHabit(habit: Habit) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("habits")
    .update({ task: habit.task })
    .eq("id", habit.id)
    .eq("user_id", user?.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteHabit(id: number) {
  const supabase = createClient();

  const { error } = await supabase.from("habits").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

export async function deleteCompletedHabits() {
  const supabase = createClient();

  const { error } = await supabase
    .from("habits")
    .delete()
    .eq("is_complete", true);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

export async function deleteAllHabits() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("habits")
    .delete()
    .eq("user_id", user?.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

export async function onCheckChange(habit: Habit) {
  const supabase = createClient();

  const { error } = await supabase
    .from("habits")
    .update({ is_complete: !habit?.is_complete })
    .eq("id", habit?.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}