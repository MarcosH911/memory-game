import { BiSolidCoinStack } from "react-icons/bi";

const CoinsNavItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between border-2 border-yellow-600 min-w-[8rem] px-2 py-1 rounded-full">
      <span className="text-yellow-600 font-semibold ml-1">{children}</span>
      <BiSolidCoinStack className="text-yellow-600 text-lg" />
    </div>
  );
};

export default CoinsNavItem;
