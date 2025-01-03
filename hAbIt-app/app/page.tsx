import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Habits from "@/components/habits/habits";
import Metrics from "@/components/metrics/metrics";
import Dashboard from "@/components/dashboard/dashboard";
import ClearActions from "@/components/habits/clear-actions";
import NavBar from "@/components/navigation/nav-bar";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/signin");
  }

  

  return (
    <main className="min-h-screen flex flex-col gap-4 items-center justify-center">
      <NavBar />
      <div className="flex flex-col max-w-2xl border rounded-lg shadow-lg p-4">
        <div className="flex items-center gap-4 pb-4">
          <CheckCircleIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
          <h1 className="font-semibold text-2xl">Habits</h1>
        </div>
        <Habits />
        <ClearActions />
      </div>

      <div className="flex flex-col max-w-2xl border rounded-lg shadow-lg p-4 mt-4">
        <div className="flex items-center gap-4 pb-4">
          <CheckCircleIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
          <h1 className="font-semibold text-2xl">Dashboard</h1>
        </div>
        <Dashboard/>
      </div>
      

      <div className="flex flex-col max-w-2xl border rounded-lg shadow-lg p-4 mt-4">
        <div className="flex items-center gap-4 pb-4">
          <CheckCircleIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
          <h1 className="font-semibold text-2xl">Metrics</h1>
        </div>
        {/* Add your metrics content here */}
      </div>
    </main>
  );
}

function CheckCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}