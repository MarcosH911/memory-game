import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import CoinsNavItem from "./(components)/CoinsNavItem";
import DiamondsNavItem from "./(components)/DiamondsNavItem";
import ProfileButton from "./(components)/ProfileButton";
import MenuNavbar from "./(components)/MenuNavbar";
import FeedbackButton from "../(components)/FeedbackButton";
import MobileNavbar from "./(components)/MobileNavbar";
import NavbarWrapper from "./(components)/NavbarWrapper";
import MainAppLayoutWrapper from "./(components)/MainAppLayoutWrapper";

export const dynamic = "force-dynamic";

async function Layout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data, error } = await supabase
    .from("user_points")
    .select("*")
    .single();

  if (error) {
    console.error("There was an error selecting the user points");
  }

  return (
    <MainAppLayoutWrapper>
      <NavbarWrapper>
        <ul className="gap-6 flex-row items-start justify-center hidden lg:flex">
          <MenuNavbar />
        </ul>
        <div className="lg:hidden">
          <MobileNavbar />
        </div>
        <div className="flex items-center gap-2 xs:gap-8 z-20">
          <DiamondsNavItem>{data?.total_diamonds || 0}</DiamondsNavItem>
          <CoinsNavItem>{data?.total_coins || 0}</CoinsNavItem>
          <ProfileButton />
        </div>
      </NavbarWrapper>
      <div className="relative h-full">{children}</div>
      <FeedbackButton />
    </MainAppLayoutWrapper>
  );
}

export default Layout;
