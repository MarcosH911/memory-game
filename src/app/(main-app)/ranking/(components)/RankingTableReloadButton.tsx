"use client";

import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiMiniArrowPath } from "react-icons/hi2";

function RakingTableReloadButton() {
  const router = useRouter();

  return (
    <div>
      <button className="absolute right-3.5 top-3.5 rounded-md p-1.5 text-2xl text-white transition hover:bg-teal-800">
        <HiMiniArrowPath />
      </button>
    </div>
  );
}

export default RakingTableReloadButton;
