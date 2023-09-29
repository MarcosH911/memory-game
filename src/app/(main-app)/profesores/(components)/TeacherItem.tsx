import getAvatarImage from "@/utils/getAvatarImage";
import Image from "next/image";

interface Props {
  data: {
    full_name: string;
    avatar_path: string;
    diamonds: number;
  };
}

function TeacherItem({ data }: Props) {
  const avatarUrl = getAvatarImage(data.avatar_path);
  const timePlayed = {
    hours: Math.floor(data.diamonds / 60),
    minutes: data.diamonds % 60,
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-slate-300 rounded-lg w-full h-fit py-8 px-4">
        <div className="relative h-24 w-24 rounded-full shadow-sm">
          <Image
            src={avatarUrl}
            alt={data.full_name}
            fill
            // TODO: sizes
          />
        </div>
        <div className="font-bold mt-1.5 mb-4 text-xl text-center">
          {data.full_name}
        </div>
        <div className="mb-1 text-center">
          <span className="font-bold">{data.diamonds}</span> partidas jugadas
        </div>
        <div className="text-slate-800 text-sm text-center">
          (<span className="font-bold">{timePlayed.hours}</span> horas y{" "}
          <span className="font-bold">{timePlayed.minutes}</span> minutos)
        </div>
      </div>
    </div>
  );
}

export default TeacherItem;
