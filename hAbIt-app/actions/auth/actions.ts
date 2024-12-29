"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return redirect("/signup?message=Could not create user");
  }

  return redirect("/questionnaire");
}

export async function signin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/signin?message=Could not authenticate user");
  }

  // Check if user has completed the questionnaire
  const { data: { user } } = await supabase.auth.getUser();
  const { data: preferences } = await supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", user?.id)
    .single();

  if (!preferences) {
    return redirect("/questionnaire");
  }

  return redirect("/");
}

export async function signout() {
  const supabase = await createClient();

  let { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  redirect("/signin");
}