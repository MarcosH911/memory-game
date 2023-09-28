interface Props {
  data: {
    full_name: string;
    avatar_path: string;
    diamonds: number;
  };
}

function TeacherItem({ data }: Props) {
  console.log(data);
  return <div></div>;
}

export default TeacherItem;
