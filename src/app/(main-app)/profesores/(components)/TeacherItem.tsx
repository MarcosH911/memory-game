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
    <div className="flex flex-col items-center justify-center">
      <Image
        src={avatarUrl}
        alt={data.full_name}
        width={48}
        height={48}
      ></Image>
      <span>{data.full_name}</span>
      <span>
        <span>{data.diamonds}</span> partidas jugadas
      </span>
      <span>
        <span>({timePlayed.hours}</span> horas <span>{timePlayed.minutes}</span>{" "}
        minutos)
      </span>
    </div>
  );
}

export default TeacherItem;
