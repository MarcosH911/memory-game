import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";
import { Database } from "../../types/supabase";

export const dynamic = "force-dynamic";

export const getDailyRanking = cache(async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data, error } = await supabase.from("daily_points").select("*");

  return { data, error };
});
