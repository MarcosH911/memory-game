import { Database as DB } from "./supabase";

declare global {
  type Database = DB;
}
