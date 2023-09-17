import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

import type { IconType } from "react-icons";

interface Props {
  href: string;
  Icon: IconType;
  text: string;
  onClick?: () => void;
}

function MenuNavbarItem({ href, Icon, text, onClick }: Props) {
  const pathname = usePathname();

  return (
    <Link href={href}>
      <li
        onClick={onClick}
        className={twMerge(
          "flex items-center gap-1.5 border-b-2 border-transparent py-1 pr-2 lg:pl-2 lg:pr-3 text-lg font-semibold text-teal-950 transition hover:text-teal-600 cursor-pointer",
          pathname === href && "border-teal-950 hover:border-teal-600",
        )}
      >
        <Icon />
        <span>{text}</span>
      </li>
    </Link>
  );
}

export default MenuNavbarItem;
