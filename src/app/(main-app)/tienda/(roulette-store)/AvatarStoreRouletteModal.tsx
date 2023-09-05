import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { HiMiniXMark } from "react-icons/hi2";

interface Props {
  showAvatarModal: boolean;
  handleModalChange: () => void;
  selectedAvatarUrl: string;
}

function AvatarStoreRouletteModal({
  showAvatarModal,
  handleModalChange,
  selectedAvatarUrl,
}: Props) {
  return (
    <Dialog.Root open={showAvatarModal} onOpenChange={handleModalChange}>
      <Dialog.Overlay className="bg-black/10 fixed inset-0 z-50 animate-show-modal-overlay" />
      <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col py-12 px-8 rounded-xl border shadow-2xl backdrop-blur-lg bg-gradient-to-br from-purple-200/70 via-teal-200/70 to-yellow-200/70 z-50 origin-center animate-show-modal">
        <span className="text-5xl font-semibold pb-6 text-slate-900">
          ¡Enhorabuena!
        </span>
        <Image
          priority
          src={selectedAvatarUrl}
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
    </Dialog.Root>
  );
}

export default AvatarStoreRouletteModal;
