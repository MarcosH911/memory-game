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
    hours: Math.floor((data.diamonds * 1.25) / 60),
    minutes: Math.floor(data.diamonds * 1.25) % 60,
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border border-slate-300 bg-slate-200 px-4 py-8 shadow-xl">
        <Image
          src={avatarUrl}
          alt={data.full_name}
          height={96}
          width={96}
          className="rounded-full border-2 border-slate-950 bg-slate-950 shadow-sm"
        />
        <div className="mb-4 mt-1.5 text-center text-xl font-bold">
          {data.full_name}
        </div>
        <div className="mb-1 text-center">
          <span className="font-bold">{data.diamonds}</span> partidas jugadas
        </div>
        <div className="text-center text-sm text-slate-800">
          (<span className="font-bold">{timePlayed.hours}</span> horas y{" "}
          <span className="font-bold">{timePlayed.minutes}</span> minutos)
        </div>
      </div>
    </div>
  );
}

export default TeacherItem;
