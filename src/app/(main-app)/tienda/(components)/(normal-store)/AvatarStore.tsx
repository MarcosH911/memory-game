import AvatarStoreItem from "./AvatarStoreItem";

interface Props {
  allAvatars: string[];
  userAvatars: (string | null)[];
  userPoints: { coins: number; diamonds: number };
}

async function AvatarStore({ allAvatars, userAvatars, userPoints }: Props) {
  return (
    <div>
      <h1 className="mb-6 block text-center text-7xl font-semibold text-emerald-950">
        O compra tu favorito
      </h1>
      <div className="mx-auto grid w-[80rem] grid-cols-6 gap-8">
        {allAvatars?.map((avatarPath, index) => (
          <AvatarStoreItem
            key={index}
            avatarPath={avatarPath}
            userHasAvatar={userAvatars?.includes(avatarPath) || false}
            userPoints={userPoints}
          />
        ))}
      </div>
    </div>
  );
}

export default AvatarStore;
