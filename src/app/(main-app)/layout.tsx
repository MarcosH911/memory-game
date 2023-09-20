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

export const dynamic = "force-dynamic";

async function Layout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const userId = (await supabase.auth.getSession()).data.session?.user.id;

  if (!userId) {
    console.error("There was an error getting the user");
    return null;
  }

  const pointsDataPromise = supabase.from("user_points").select("*").single();

  const profileDataPromise = supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  const [
    { data: profileData, error: profileError },
    { data: pointsData, error: pointsError },
  ] = await Promise.all([profileDataPromise, pointsDataPromise]);

  if (pointsError) {
    console.error("There was an error selecting the user points");
    return;
  }
  if (profileError || !profileData) {
    console.error("There was an error selecting the user profile");
    return;
  }

  const avatarUrl = getAvatarImage(profileData.avatar_path);
  const fullName = profileData.full_name;

  return (
    <MainAppLayoutWrapper>
      <NavbarWrapper>
        <ul className="hidden flex-row items-start justify-center gap-6 lg:flex">
          <MenuNavbar />
        </ul>
        <div className="lg:hidden">
          <MobileNavbar avatarUrl={avatarUrl} fullName={fullName} />
        </div>
        <div className="z-20 flex items-center gap-2 xs:gap-8">
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
