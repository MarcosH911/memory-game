"use client";

import { useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
}

function NavbarWrapper({ children }: Props) {
  const searchParams = useSearchParams();
  const isPlaying = searchParams.has("playing", "true");

  return (
    <nav
      className={twMerge(
        "fixed top-0 z-40 flex h-20 w-full items-center justify-between border-b-2 bg-teal-50/90 pl-14 transition duration-500 opacity-100 translate-y-0 pr-4 xs:pr-8 backdrop-blur-md",
        isPlaying && "-translate-y-full opacity-100",
      )}
    >
      {children}
    </nav>
  );
}

export default NavbarWrapper;
