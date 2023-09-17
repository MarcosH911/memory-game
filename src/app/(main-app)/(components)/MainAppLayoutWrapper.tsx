"use client";

import { useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
}

function MainAppLayoutWrapper({ children }: Props) {
  const searchParams = useSearchParams();
  const isPlaying = searchParams.has("playing", "true");

  return (
    <div
      className={twMerge(
        "h-full pt-20 transition-all duration-500",
        isPlaying && "pt-0",
      )}
    >
      {children}
    </div>
  );
}

export default MainAppLayoutWrapper;
