"use client";

import sleep from "@/helpers/sleep";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMiniArrowPath } from "react-icons/hi2";
import { PiSpinnerBold } from "react-icons/pi";

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
    await sleep(750);
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
