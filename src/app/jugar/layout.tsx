import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import CoinsNavItem from "./CoinsNavItem";
import DiamondsNavItem from "./DiamondsNavItem";
import { cookies } from "next/headers";
import ProfileButton from "./ProfileButton";
import { Database } from "../../../types/supabase";

export const dynamic = "force-dynamic";

async function GameLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data, error } = await supabase
    .from("total_points")
    .select("*")
    .single();

  if (error) {
    console.error(error.message);
  }

  return (
    <>
      <nav className="w-full h-20 border-b-2 flex justify-between items-center px-8">
        <div className="flex gap-8">
          <div>Jugar</div>
          <div>Tienda</div>
        </div>
        <div className="flex items-center gap-8">
          <DiamondsNavItem>{data?.total_diamonds}</DiamondsNavItem>
          <CoinsNavItem>{data?.total_coins}</CoinsNavItem>
          <ProfileButton />
        </div>
      </nav>
      <div className="h-[calc(100%-5rem)] relative">{children}</div>
    </>
  );
}

export default GameLayout;
