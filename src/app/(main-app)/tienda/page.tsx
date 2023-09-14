import AvatarStore from "./(components)/(normal-store)/AvatarStore";
import AvatarStoreRoulette from "./(components)/(roulette-store)/AvatarStoreRoulette";

function Page() {
  return (
    <div className="py-8">
      <AvatarStoreRoulette />
      <AvatarStore />
    </div>
  );
}

export default Page;
