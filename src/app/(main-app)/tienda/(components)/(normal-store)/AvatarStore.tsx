import AvatarStoreItem from "./AvatarStoreItem";

interface Props {
  allAvatars: string[];
  userAvatars: (string | null)[];
  userPoints: { coins: number; diamonds: number };
}

async function AvatarStore({ allAvatars, userAvatars, userPoints }: Props) {
  return (
    <div>
      <h1 className="mb-6 block text-center text-4xl font-semibold text-emerald-950 xs:text-5xl sm:text-6xl lg:text-7xl">
        O compra tu favorito
      </h1>
      <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-4 px-2 xs:gap-8 sm:max-w-2xl sm:grid-cols-3 md:max-w-4xl md:grid-cols-4 lg:max-w-6xl lg:grid-cols-5 xl:max-w-7xl xl:grid-cols-6">
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
