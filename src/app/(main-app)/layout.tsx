import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import CoinsNavItem from "./(components)/CoinsNavItem";
import DiamondsNavItem from "./(components)/DiamondsNavItem";
import ProfileButton from "./(components)/ProfileButton";
import MenuNavbar from "./(components)/MenuNavbar";
import FeedbackButton from "./(components)/FeedbackButton";
import MobileNavbar from "./(components)/MobileNavbar";
import NavbarWrapper from "./(components)/NavbarWrapper";
import MainAppLayoutWrapper from "./(components)/MainAppLayoutWrapper";
import getAvatarImage from "@/utils/getAvatarImage";
import toast from "react-hot-toast";

export const dynamic = "force-dynamic";

async function Layout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const userId = (await supabase.auth.getSession()).data.session?.user.id;

  let profileData = { full_name: "", avatar_path: "" };
  let pointsData = { total_coins: 0, total_diamonds: 0 };

  if (userId) {
    const pointsDataPromise = supabase.from("user_points").select("*").single();

    const profileDataPromise = supabase
      .from("profiles")
      .select("full_name, avatar_path")
      .eq("user_id", userId)
      .single();

    const [
      { data: newProfileData, error: profileError },
      { data: newPointsData, error: pointsError },
    ] = await Promise.all([profileDataPromise, pointsDataPromise]);

    if (pointsError) {
      toast.error("Ha ocurrido un error inesperado");
      return;
    }
    if (profileError) {
      toast.error("Ha ocurrido un error inesperado");
      return;
    }

    if (newProfileData) {
      profileData = newProfileData;
    }
    if (newPointsData) {
      pointsData = newPointsData as {
        total_coins: number;
        total_diamonds: number;
      };
    }
  }

  const avatarUrl = getAvatarImage(profileData.avatar_path);
  const fullName = profileData.full_name;

  return (
    <MainAppLayoutWrapper>
      <NavbarWrapper>
        <ul className="hidden flex-row items-start justify-center gap-3 lg:flex xl:gap-6">
          <MenuNavbar />
        </ul>
        <div className="lg:hidden">
          <MobileNavbar avatarUrl={avatarUrl} fullName={fullName} />
        </div>
        <div className="z-20 flex items-center gap-2 xs:gap-8 lg:gap-4 xl:gap-8">
          <DiamondsNavItem>{pointsData?.total_diamonds || 0}</DiamondsNavItem>
          <CoinsNavItem>{pointsData?.total_coins || 0}</CoinsNavItem>
          <ProfileButton />
        </div>
      </NavbarWrapper>
      <FeedbackButton />
      <div className="relative h-full">{children}</div>
    </MainAppLayoutWrapper>
  );
}

export default Layout;
