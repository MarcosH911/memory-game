import { BiSolidCoinStack } from "react-icons/bi";

const CoinsNavItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-w-[8rem] items-center justify-between rounded-full border-2 border-yellow-600 px-2 py-1">
      <span className="ml-1 font-bold text-yellow-600">{children}</span>
      <BiSolidCoinStack className="text-lg text-yellow-600" />
    </div>
  );
};

export default CoinsNavItem;
