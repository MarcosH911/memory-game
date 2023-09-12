"use client";

import { useEffect, useState } from "react";
import { IoDiamond } from "react-icons/io5";

function DiamondsNavItem() {
  const [diamonds, setDiamonds] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      const pointsDataResponse = await fetch("/api/points/user-points", {
        method: "get",
      });

      const { data: userPointsData } = await pointsDataResponse.json();

      setDiamonds(userPointsData.total_diamonds);
    };

    fetchPoints();
  }, []);

  return (
    <div className="flex min-w-[8rem] items-center justify-between rounded-full border-2 border-purple-600 px-2 py-1">
      <span className="ml-1 font-bold text-purple-600">{diamonds}</span>
      <IoDiamond className="text-lg text-purple-600" />
    </div>
  );
}

export default DiamondsNavItem;
