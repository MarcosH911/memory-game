import { BiSolidCoinStack } from "react-icons/bi";
import { IoDiamond } from "react-icons/io5";

interface Props {
  handleSpinRoulette: (type: "coins" | "diamonds") => void;
}

function AvatarStoreRouletteBuyButtons({ handleSpinRoulette }: Props) {
  return (
    <div className="mt-8 flex items-center justify-center gap-8">
      <button
        onClick={() => handleSpinRoulette("coins")}
        className="flex items-center justify-center gap-1 rounded-md border border-yellow-600 bg-yellow-50 px-12 py-3 text-yellow-600 shadow-md shadow-yellow-600/30 transition duration-200 hover:bg-yellow-100 hover:shadow-lg hover:shadow-yellow-600/40 active:shadow-md active:duration-100"
      >
        <span className="text-3xl font-bold">60</span>
        <BiSolidCoinStack className="text-2xl" />
      </button>
      <button
        onClick={() => handleSpinRoulette("diamonds")}
        className="flex items-center justify-center gap-1 rounded-md border border-purple-600 bg-purple-600 px-12 py-3 text-purple-50 shadow-md shadow-purple-600/30 transition duration-200 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-600/40 active:shadow-md active:duration-100"
      >
        <span className="text-3xl font-bold">15</span>
        <IoDiamond className="text-2xl" />
      </button>
    </div>
  );
}

export default AvatarStoreRouletteBuyButtons;
