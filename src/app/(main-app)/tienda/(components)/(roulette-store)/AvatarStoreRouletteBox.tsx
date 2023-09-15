"use client";

import { useRouter } from "next/navigation";
import AvatarStoreRouletteBuyButtons from "./AvatarStoreRouletteBuyButtons";
import AvatarStoreRouletteModal from "./AvatarStoreRouletteModal";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Props {
  children: React.ReactNode;
}

function AvatarStoreRouletteBox({ children }: Props) {
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [isSpinningRoulette, setIsSpinningRoulette] = useState(false);

  const router = useRouter();

  const handleSpinRoulette = async (type: "coins" | "diamonds") => {
    if (isSpinningRoulette) return;
    setIsSpinningRoulette(true);

    // TODO: Move this to route handler
    const supabase = createClientComponentClient<Database>();
    const userId = (await supabase.auth.getSession()).data.session?.user.id;

    if (!userId) {
      console.error("There was an error getting the user");
      return;
    }

    const { data: userPointsData, error: userPointsError } = await supabase
      .from("user_points")
      .select("*")
      .single();

    if (
      userPointsError ||
      !userPointsData.total_coins ||
      !userPointsData.total_diamonds
    ) {
      console.error("There was an error selecting the user points");
      return;
    }

    if (type === "coins" && userPointsData.total_coins < 60) {
      console.error("You don't have enough coins to buy this");
      return;
    } else if (type === "diamonds" && userPointsData.total_diamonds < 15) {
      console.error("You don't have enough diamonds to buy this");
      return;
    }

    const { error: insertAvatarError } = await supabase
      .from("avatars_transactions")
      .insert({ user_id: userId, avatar_path: selectedAvatarPath.current });

    if (insertAvatarError) {
      console.error("There was an error inserting the avatar");
      return;
    }

    if (type === "coins") {
      const { error: insertCoinsError } = await supabase
        .from("points_transactions")
        .insert({ user_id: userId, coins: -60 });

      if (insertCoinsError) {
        console.error("There was an error inserting the coins");
      }
    } else if (type === "diamonds") {
      const { error: insertDiamondsError } = await supabase
        .from("points_transactions")
        .insert({ user_id: userId, diamonds: -15 });

      if (insertDiamondsError) {
        console.error("There was an error inserting the diamonds");
      }
    }
    router.refresh();

    setIsAnimationPlaying(true);

    setTimeout(() => {
      setShowAvatarModal(true);
      setIsSpinningRoulette(false);
    }, 10000);
  };

  return (
    <div className="relative">
      <div className="relative h-64 w-[80rem] overflow-hidden rounded-lg">
        <div
          style={
            isAnimationPlaying
              ? {
                  transform: `translateX(-${animationTranslation.current}rem)`,
                }
              : {}
          }
          className={twMerge(
            "flex flex-row flex-nowrap items-center justify-start divide-x-2 rounded-lg divide-teal-50",
            isAnimationPlaying &&
              "transition duration-[10s] ease-[cubic-bezier(0.25,1,0.25,1)]"
          )}
        >
          {children}
        </div>
        <div>
          <div className="absolute left-1/2 top-0 z-20 h-full w-0.5 -translate-x-1/2 border-none bg-red-600 drop-shadow-[0_0_3px_rgba(255,0,0,1)]"></div>
          <div className="absolute bottom-0 left-1/2 z-20 h-1 w-1 -translate-x-1/2 border-[1.25rem] border-transparent border-b-red-600 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]"></div>
          <div className="absolute left-1/2 top-0 z-20 h-1 w-1 -translate-x-1/2 border-[1.25rem] border-transparent border-t-red-600 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]"></div>
        </div>
      </div>
      <AvatarStoreRouletteBuyButtons handleSpinRoulette={handleSpinRoulette} />
      <AvatarStoreRouletteModal
        handleModalChange={handleModalChange}
        selectedAvatarUrl={selectedAvatarUrl.current}
        showAvatarModal={showAvatarModal}
      />
    </div>
  );
}

export default AvatarStoreRouletteBox;
