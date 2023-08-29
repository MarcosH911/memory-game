import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import CoinsNavItem from "./CoinsNavItem";
import DiamondsNavItem from "./DiamondsNavItem";
import { cookies } from "next/headers";

async function GameLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies });

  const userId = (await supabase.auth.getSession()).data.session?.user.id;

  const { data, error } = await supabase
    .from("points")
    .select("coins, diamonds")
    .eq("user_id", userId);

  if (error) {
    console.error(error.message);
  }

  return (
    <>
      <nav className="w-full h-20 border-b-2 flex justify-between items-center px-12">
        <div className="flex gap-8">
          <div>Jugar</div>
          <div>Tienda</div>
        </div>
        <div className="flex items-center gap-8">
          <DiamondsNavItem>{data?.[0].diamonds}</DiamondsNavItem>
          <CoinsNavItem>{data?.[0].coins}</CoinsNavItem>
          <div>Perfil</div>
        </div>
      </nav>
      <div className="h-[calc(100%-5rem)] relative">{children}</div>
    </>
  );
}

export default GameLayout;
