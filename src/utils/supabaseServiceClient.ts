import "server-only";
import { createClient } from "@supabase/supabase-js";

const supabaseServiceClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export default supabaseServiceClient;
