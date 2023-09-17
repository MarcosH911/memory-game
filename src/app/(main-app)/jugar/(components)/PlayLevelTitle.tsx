interface Props {
  level: number;
}

function PlayLevelTitle({ level }: Props) {
  return (
    <h1 className="mb-4 mt-6 rounded-lg border border-teal-200 bg-teal-100 px-6 py-3 text-5xl 2xl:text-6xl font-bold text-teal-950 shadow-md shadow-teal-200/50">
      Level {level}
    </h1>
  );
}

export default PlayLevelTitle;
