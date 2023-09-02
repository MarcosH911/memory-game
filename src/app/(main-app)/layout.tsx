import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import CoinsNavItem from "./jugar/CoinsNavItem";
import DiamondsNavItem from "./jugar/DiamondsNavItem";
import { cookies } from "next/headers";
import ProfileButton from "./jugar/ProfileButton";
import Link from "next/link";

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
        <ul className="flex gap-8">
          <Link href="/jugar">
            <li>Jugar</li>
          </Link>
          <Link href="/tienda">
            <li>Tienda</li>
          </Link>
          <Link href="/ranking">
            <li>Ranking</li>
          </Link>
        </ul>
        <div className="flex items-center gap-8">
          <DiamondsNavItem>{data?.total_diamonds || 0}</DiamondsNavItem>
          <CoinsNavItem>{data?.total_coins || 0}</CoinsNavItem>
          <ProfileButton />
        </div>
      </nav>
      <div className="h-[calc(100%-5rem)] relative">{children}</div>
    </>
  );
}

export default GameLayout;
