"use client";

import sleep from "@/helpers/sleep";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiMiniArrowPath } from "react-icons/hi2";
import { PiSpinnerBold } from "react-icons/pi";

function RakingTableReloadButton() {
  const [isReloading, setIsReloading] = useState(false);
  const router = useRouter();

  const handleReload = async () => {
    setIsReloading(true);
    router.refresh();
    await sleep(750);
    setIsReloading(false);
  };

  return (
    <div className="hidden sm:block">
      <button
        onClick={handleReload}
        className="absolute right-3.5 top-3.5 rounded-md p-1.5 text-2xl text-white transition hover:bg-teal-800"
      >
        {isReloading ? (
          <PiSpinnerBold className="animate-spin" />
        ) : (
          <HiMiniArrowPath />
        )}
      </button>
    </div>
  );
}

export default RakingTableReloadButton;
