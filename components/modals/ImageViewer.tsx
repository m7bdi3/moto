import Image from "next/image";

import { Modal } from "../modal";
import { useModalStore } from "@/hooks/store/use-store-modal";

export const ImageViewer = () => {
  const { isImageViewerOpen, closeImageViewer, imageViewerId } =
    useModalStore();
  return (
    <Modal
      isOpen={isImageViewerOpen}
      onClose={closeImageViewer}
      classname="max-w-3xl"
    >
      <div className="flex w-full h-full items-center justify-center">
        <Image
          src={imageViewerId!}
          alt="src"
          width={800}
          height={800}
          className="rounded-md object-cover object-center"
        />
      </div>
    </Modal>
  );
};
