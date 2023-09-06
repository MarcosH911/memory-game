import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import CoinsNavItem from "./CoinsNavItem";
import DiamondsNavItem from "./DiamondsNavItem";
import ProfileButton from "./ProfileButton";
import MenuNavbar from "./MenuNavbar";

export const dynamic = "force-dynamic";

async function GameLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data, error } = await supabase
    .from("user_points")
    .select("*")
    .single();

  if (error) {
    console.error(error.message);
  }

  return (
    <div className="h-full pt-20">
      <nav className="fixed top-0 z-50 flex h-20 w-full items-center justify-between border-b-2 bg-teal-50/90 pl-14 pr-8 backdrop-blur-md">
        <MenuNavbar />
        <div className="flex items-center gap-8">
          <DiamondsNavItem>{data?.total_diamonds || 0}</DiamondsNavItem>
          <CoinsNavItem>{data?.total_coins || 0}</CoinsNavItem>
          <ProfileButton />
        </div>
      </nav>
      <div className="relative h-full">{children}</div>
    </div>
  );
}

export default GameLayout;
