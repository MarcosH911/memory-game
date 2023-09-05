import AvatarsStore from "./(normal-store)/AvatarsStore";
import AvatarStoreRoulette from "./(roulette-store)/AvatarStoreRoulette";

function Page() {
  return (
    <div>
      <AvatarStoreRoulette />
      <AvatarsStore />
    </div>
  );
}

export default Page;
