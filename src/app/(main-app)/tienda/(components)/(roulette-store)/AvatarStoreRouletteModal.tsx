import sleep from "@/helpers/sleep";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useEffect } from "react";

interface Props {
  showAvatarModal: boolean;
  selectedAvatarUrl: string;
  setShowAvatarModal: React.Dispatch<React.SetStateAction<boolean>>;
  updateAvatarsUrls: () => void;
  handleAnimateRoulette: (type: "start" | "finish") => void;
}

function AvatarStoreRouletteModal({
  showAvatarModal,
  selectedAvatarUrl,
  setShowAvatarModal,
  updateAvatarsUrls,
  handleAnimateRoulette,
}: Props) {
  const handleModalChange = () => {
    setShowAvatarModal((show) => {
      if (show) {
        handleAnimateRoulette("finish");
        updateAvatarsUrls();
      }
      return !show;
    });
  };

  return (
    <Dialog.Root open={showAvatarModal} onOpenChange={handleModalChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 animate-show-modal-overlay bg-black/10 data-[state=closed]:animate-fade-out" />
        <Dialog.Content
          forceMount
          className="fixed left-1/2 top-1/2 z-40 flex origin-center -translate-x-1/2 -translate-y-1/2 animate-show-modal flex-col items-center justify-center rounded-xl border bg-gradient-to-br from-purple-200/70 via-teal-200/70 to-yellow-200/70 px-8 py-12 shadow-2xl backdrop-blur-lg data-[state=closed]:animate-fade-out"
        >
          <span className="pb-6 text-5xl font-bold text-slate-900">
            ¡Enhorabuena!
          </span>
          <Image
            priority
            src={selectedAvatarUrl}
            alt="Avatar image"
            height={400}
            width={400}
            quality={90}
            className="mb-8 rounded-full border-8 border-slate-900 bg-slate-900"
          />
          <Dialog.Close asChild>
            <button className="rounded-md bg-green-400/90 px-6 py-3 text-2xl font-bold text-green-950 shadow-md transition hover:bg-green-500/80 hover:shadow-lg">
              Reclamar
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default AvatarStoreRouletteModal;
