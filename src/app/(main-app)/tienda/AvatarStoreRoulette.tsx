"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import * as Dialog from "@radix-ui/react-dialog";

import shuffleArray from "@/helpers/shuffleArray";
import getAvatarImage from "@/utils/getAvatarImage";
import AvatarStoreRouletteItem from "./AvatarStoreRouletteItem";
import Image from "next/image";
import { HiMiniXMark } from "react-icons/hi2";

const defaultAnimationTranslation = 1600;

function AvatarStoreRoulette() {
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const [avatarsUrls, setAvatarsUrls] = useState([""]);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const animationTranslation = useRef(0);

  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const getRemainingAvatarsUrls = async () => {
      const { data: allAvatarsData, error: allAvatarsError } =
        await supabase.storage.from("avatar_images").list();

      if (allAvatarsError || !allAvatarsData) {
        console.error("There was an error getting all the avatars");
        return;
      }

      const { data: userAvatarsData, error: userAvatarsError } = await supabase
        .from("user_avatars")
        .select("avatar_path");

      if (userAvatarsError || !userAvatarsData) {
        console.error("There was an error getting the user avatars");
        return;
      }

      const allAvatarsPaths = allAvatarsData.map(
        (avatarData) => avatarData.name,
      );

      const remainingAvatarsPaths = allAvatarsPaths.filter((avatarPath) => {
        if (avatarPath === ".emptyFolderPlaceholder") {
          return false;
        } else if (
          userAvatarsData.find(
            (userAvatarData) => userAvatarData.avatar_path === avatarPath,
          )
        ) {
          return false;
        } else {
          return true;
        }
      });

      const remainingAvatarsUrls = remainingAvatarsPaths.map((avatarPath) =>
        getAvatarImage(avatarPath),
      );

      while (remainingAvatarsUrls.length < 100) {
        remainingAvatarsUrls.push(...remainingAvatarsUrls);
      }
      shuffleArray(remainingAvatarsUrls);
      remainingAvatarsUrls.length = 106;

      setAvatarsUrls(remainingAvatarsUrls);
    };

    getRemainingAvatarsUrls();

    const randomTranslation = Math.random() * 16 - 8;

    animationTranslation.current =
      defaultAnimationTranslation + randomTranslation;
  }, [supabase]);

  useEffect(() => {
    if (!isAnimationPlaying) return;

    const timeout = setTimeout(() => {
      setShowAvatarModal(true);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [isAnimationPlaying]);

  return (
    <div className="absolute">
      <div className="h-64 max-w-7xl overflow-hidden relative rounded-lg">
        <div
          style={
            isAnimationPlaying
              ? { transform: `translateX(-${animationTranslation.current}rem)` }
              : {}
          }
          className={twMerge(
            "flex flex-row justify-start items-center flex-shrink-0 flex-nowrap rounded-lg divide-x-2",
            isAnimationPlaying &&
              `transition duration-[10s] ease-[cubic-bezier(0.25,1,0.25,1)]`,
          )}
        >
          {avatarsUrls.map((item, index) => (
            <AvatarStoreRouletteItem key={index} index={index} data={item} />
          ))}
        </div>
        <div className="absolute h-full w-0.5 bg-red-600 top-0 left-1/2 border-none -translate-x-1/2 z-20">
          <div className="absolute h-1 w-1 border-[1.25rem] border-transparent border-b-red-600 bottom-0 left-1/2 -translate-x-1/2"></div>
          <div className="absolute h-1 w-1 border-[1.25rem] border-transparent border-t-red-600 top-0 left-1/2 -translate-x-1/2"></div>
        </div>
      </div>
      <button onClick={() => setIsAnimationPlaying(true)}>Play</button>
      <Dialog.Root
        open={showAvatarModal}
        onOpenChange={() => setShowAvatarModal((show) => !show)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/10 fixed inset-0 z-50 animate-show-modal-overlay" />
          <Dialog.Content className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col py-12 px-8 rounded-xl border shadow-2xl backdrop-blur-lg bg-gradient-to-br from-purple-200/70 via-teal-200/70 to-yellow-200/70 z-50 origin-center animate-show-modal">
            <span className="text-5xl font-semibold pb-6 text-slate-900">
              ¡Enhorabuena!
            </span>
            <Image
              priority
              src={avatarsUrls[102]}
              height={400}
              width={400}
              quality={90}
              alt="Avatar image"
              className="border-slate-900 bg-slate-900 border-8 rounded-full mb-8"
            />
            <Dialog.Close asChild>
              <button>
                <HiMiniXMark className="text-4xl absolute top-4 right-4 p-1 rounded-lg hover:bg-slate-600/30 transition" />
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button className="bg-green-400/90 px-6 py-3 text-2xl font-semibold rounded-md shadow-md text-green-950 hover:shadow-lg hover:bg-green-500/80 transition">
                Aceptar
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default AvatarStoreRoulette;
