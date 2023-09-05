import Image from "next/image";

interface Props {
  data: string;
  index: number;
}

function AvatarStoreRouletteItem({ data, index }: Props) {
  if (!data) return null;

  return (
    <div className="h-64 w-64 flex items-center justify-center flex-shrink-0 bg-teal-600">
      <Image
        priority
        src={data}
        height={200}
        width={200}
        quality={index > 5 && index < 90 ? 1 : 75}
        alt="Avatar image"
        className="border-4 border-teal-950 rounded-full bg-teal-950"
      />
    </div>
  );
}

export default AvatarStoreRouletteItem;
