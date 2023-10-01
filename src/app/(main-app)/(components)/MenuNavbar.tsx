"use client";

import {
  HiOutlinePlay,
  HiOutlineShoppingBag,
  HiOutlineShoppingCart,
} from "react-icons/hi2";
import { MdOutlineLeaderboard } from "react-icons/md";

import MenuNavbarItem from "./MenuNavbarItem";

interface Props {
  onClick?: () => void;
}

function MenuNavbar({ onClick }: Props) {
  return (
    <>
      <MenuNavbarItem
        href="/jugar"
        Icon={HiOutlinePlay}
        text="Jugar"
        onClick={onClick}
      />
      <MenuNavbarItem
        href="/ranking"
        Icon={MdOutlineLeaderboard}
        text="Ranking"
        onClick={onClick}
      />
      <MenuNavbarItem
        href="/tienda"
        Icon={HiOutlineShoppingCart}
        text="Tienda"
        onClick={onClick}
      />
      <MenuNavbarItem
        href="/coleccion"
        Icon={HiOutlineShoppingBag}
        text="Colección"
        onClick={onClick}
      />
      <MenuNavbarItem
        href="/profesores"
        Icon={HiOutlineShoppingBag}
        text="Profesores"
        onClick={onClick}
      />
    </>
  );
}

export default MenuNavbar;
