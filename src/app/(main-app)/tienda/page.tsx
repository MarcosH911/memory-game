import AvatarsStore from "./(components)/(normal-store)/AvatarsStore";
import AvatarStoreRoulette from "./(components)/(roulette-store)/AvatarStoreRoulette";

function Page() {
  return (
    <div className="py-8">
      <AvatarStoreRoulette />
      <AvatarsStore />
    </div>
  );
}

export default Page;
