import { IoDiamond } from "react-icons/io5";

const DiamondsNavItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between border-2 border-purple-600 min-w-[8rem] px-2 py-1 rounded-full">
      <span className="text-purple-600 font-semibold ml-1">{children}</span>
      <IoDiamond className="text-purple-600 text-lg" />
    </div>
  );
};

export default DiamondsNavItem;
