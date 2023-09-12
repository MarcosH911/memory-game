import CoinsNavItem from "./(components)/CoinsNavItem";
import DiamondsNavItem from "./(components)/DiamondsNavItem";
import ProfileButton from "./(components)/ProfileButton";
import MenuNavbar from "./(components)/MenuNavbar";

export const dynamic = "force-dynamic";

async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full pt-20">
      <nav className="fixed top-0 z-50 flex h-20 w-full items-center justify-between border-b-2 bg-teal-50/90 pl-14 pr-8 backdrop-blur-md">
        <MenuNavbar />
        <div className="flex items-center gap-8">
          <DiamondsNavItem />
          <CoinsNavItem />
          <ProfileButton />
        </div>
      </nav>
      <div className="relative h-full">{children}</div>
    </div>
  );
}

export default Layout;
