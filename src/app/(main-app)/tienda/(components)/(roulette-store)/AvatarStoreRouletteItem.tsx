import Image from "next/image";

interface Props {
  data: string;
  index: number;
}

function AvatarStoreRouletteItem({ data, index }: Props) {
  if (!data) return null;

  return (
    <div className="flex h-[calc((100vw-1rem)/3)] w-[calc((100vw-1rem)/3)] flex-shrink-0 items-center justify-center bg-gradient-to-b from-pink-500 via-red-500 to-yellow-400 p-2 xs:p-3 md:h-[calc((100vw-1rem)/5)] md:w-[calc((100vw-1rem)/5)] xl:h-64 xl:w-64 xl:p-4">
      <div className="relative h-full w-full">
        <Image
          priority={index < 6}
          loading="eager"
          src={data}
          alt="Avatar image"
          fill
          sizes="calc((100vw-1rem)/3, (min-width: 768px) h-[calc((100vw-1rem)/5)], (min-width: 1280px) 220px"
          quality={index > 5 && index < 90 ? 1 : 75}
          className="rounded-full border-2 border-teal-950 bg-teal-950 xs:border-4"
        />
      </div>
    </div>
  );
}

export default AvatarStoreRouletteItem;
