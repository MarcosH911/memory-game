import Image from "next/image";

interface Props {
  data: string;
  index: number;
}

function AvatarStoreRouletteItem({ data, index }: Props) {
  if (!data) return null;

  return (
    <div className="flex h-64 w-64 flex-shrink-0 items-center justify-center bg-gradient-to-b from-pink-500 via-red-500 to-yellow-400">
      <Image
        priority={index < 5}
        loading="eager"
        src={data}
        alt="Avatar image"
        height={200}
        width={200}
        quality={index > 5 && index < 90 ? 1 : 75}
        className="rounded-full border-4 border-teal-950 bg-teal-950"
      />
    </div>
  );
}

export default AvatarStoreRouletteItem;
