"use client";

import sleep from "@/helpers/sleep";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMiniArrowPath } from "react-icons/hi2";
import { ImSpinner3 } from "react-icons/im";
import { twMerge } from "tailwind-merge";

function RakingTableReloadButton({
  finishedReloading,
}: {
  finishedReloading: boolean;
}) {
  const [isReloading, setIsReloading] = useState(false);
  const router = useRouter();

  const handleReload = async () => {
    setIsReloading(true);
    router.refresh();
    await sleep(1000);
    setIsReloading(false);
  };

  useEffect(() => {
    if (finishedReloading) {
      setIsReloading(false);
    }
  }, [finishedReloading]);

  return (
    <div>
      <button
        onClick={handleReload}
        className="absolute right-3.5 top-3.5 rounded-md p-1.5 text-2xl text-white transition hover:bg-teal-800"
      >
        <HiMiniArrowPath className={twMerge(isReloading && "animate-spin")} />
      </button>
    </div>
  );
}

export default RakingTableReloadButton;
