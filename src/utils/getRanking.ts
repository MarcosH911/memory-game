import { cache } from "react";
import supabaseClient from "./supabaseClient";
import { Database } from "../../types/supabase";

type dataType =
  | Database["public"]["Views"]["points_ranking_all_time"]["Row"][]
  | null;

export const getRanking = cache(async (view: string, sortColumn: string) => {
  const { data, error } = await supabaseClient
    .from(view)
    .select("*")
    .order(sortColumn, { ascending: false });

  console.log(data);

  return { data, error } as { data: dataType };
});
