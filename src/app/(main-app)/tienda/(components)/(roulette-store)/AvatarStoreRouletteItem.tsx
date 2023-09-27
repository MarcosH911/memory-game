import Image from "next/image";

interface Props {
  data: string;
  index: number;
}

function AvatarStoreRouletteItem({ data, index }: Props) {
  if (!data) return null;

  return (
    <div className="h-[calc((100vw-1rem)/3)] w-[calc((100vw-1rem)/3)] md:h-[calc((100vw-1rem)/5)] md:w-[calc((100vw-1rem)/5)] p-2 xs:p-3 xl:p-4 flex xl:h-64 xl:w-64 flex-shrink-0 items-center justify-center bg-gradient-to-b from-pink-500 via-red-500 to-yellow-400">
      <div className="relative h-full w-full">
        <Image
          priority={index < 5}
          loading="eager"
          src={data}
          alt="Avatar image"
          fill
          // TODO: sizes
          sizes="(max-width: 768px) 100px, 200px"
          quality={index > 5 && index < 90 ? 1 : 75}
          className="rounded-full border-2 xs:border-4 border-teal-950 bg-teal-950"
        />
      </div>
    </div>
  );
}

export default AvatarStoreRouletteItem;
