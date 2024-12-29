import { createClient } from "@/utils/supabase/server";


export default async function Dashboard() {
  const supabase = await createClient();

 



  return (
    <div className="flex-1 overflow-auto">
      <div className="flex flex-col">
     
      </div>
    </div>
  );
}