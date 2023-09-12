"use client";

import { useEffect, useState } from "react";
import { BiSolidCoinStack } from "react-icons/bi";

function CoinsNavItem() {
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      const pointsDataResponse = await fetch("/api/points/user-points", {
        method: "get",
      });

      const { data: userPointsData } = await pointsDataResponse.json();
      setCoins(userPointsData.total_coins);
    };

    fetchPoints();
  }, []);

  return (
    <div className="flex min-w-[8rem] items-center justify-between rounded-full border-2 border-yellow-600 px-2 py-1">
      <span className="ml-1 font-bold text-yellow-600">{coins}</span>
      <BiSolidCoinStack className="text-lg text-yellow-600" />
    </div>
  );
}

export default CoinsNavItem;
