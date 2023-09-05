interface Props {
  handleSpinRoulette: (type: "coins" | "diamonds") => void;
}

function AvatarStoreRouletteBuyButtons({ handleSpinRoulette }: Props) {
  return (
    <div>
      <button onClick={() => handleSpinRoulette("coins")}>Coins</button>
      <button onClick={() => handleSpinRoulette("diamonds")}>Diamonds</button>
    </div>
  );
}

export default AvatarStoreRouletteBuyButtons;
