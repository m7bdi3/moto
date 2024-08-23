"use client";

import React from "react";
import { BillboardModal } from "@/components/modals/billboards/billboard-create-modal";
import { LoginModal } from "@/components/modals/LoginModal";
import { useModalStore } from "@/hooks/store/use-store-modal";
import { CategoryModal } from "@/components/modals/categories/category-create-modal";
import { ColorsModal } from "@/components/modals/colors/colors-create-modal";
import { SizesModal } from "@/components/modals/sizes/sizes-create-modal";
import { ColorAlertModal } from "@/components/modals/ColorAlertModal";
import { SizeAlertModal } from "@/components/modals/SizeAlertModal";
import { ImageViewer } from "@/components/modals/ImageViewer";

export const ModalProvider = () => {
  const [mounted, setIsMounted] = React.useState(false);
  const {
    isBillboardOpen,
    isLoginOpen,
    isCategoryOpen,
    isColorOpen,
    isSizeOpen,
    isColorAlertOpen,
    isSizeAlertOpen,
    colorAlertId,
    sizeAlertId,
    isImageViewerOpen,
  } = useModalStore();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {isBillboardOpen && <BillboardModal />}
      {isLoginOpen && <LoginModal />}
      {isCategoryOpen && <CategoryModal />}
      {isColorOpen && <ColorsModal />}
      {isSizeOpen && <SizesModal />}
      {isColorAlertOpen && <ColorAlertModal id={colorAlertId!} />}
      {isSizeAlertOpen && <SizeAlertModal id={sizeAlertId!} />}
      {isImageViewerOpen && <ImageViewer />}
    </>
  );
};
