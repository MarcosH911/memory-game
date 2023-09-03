import { IoDiamond } from "react-icons/io5";

const DiamondsNavItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-w-[8rem] items-center justify-between rounded-full border-2 border-purple-600 px-2 py-1">
      <span className="ml-1 font-semibold text-purple-600">{children}</span>
      <IoDiamond className="text-lg text-purple-600" />
    </div>
  );
};

export default DiamondsNavItem;
