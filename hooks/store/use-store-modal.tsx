import { create } from "zustand";

interface ModalState {
  isBillboardOpen: boolean;
  isLoginOpen: boolean;
  isCategoryOpen: boolean;
  isProductOpen: boolean;
  isColorOpen: boolean;
  isSizeOpen: boolean;
  isImageViewerOpen: boolean;
  isColorAlertOpen: boolean;
  isSizeAlertOpen: boolean;
  colorAlertId: string | null;
  sizeAlertId: string | null;
  imageViewerId: string | null;
  openImageViewer: (src: string) => void;
  closeImageViewer: () => void;
  openColorAlert: (id: string) => void;
  closeColorAlert: () => void;
  openSizeAlert: (id: string) => void;
  closeSizeAlert: () => void;
  openProduct: () => void;
  closeProduct: () => void;
  openCategory: () => void;
  closeCategory: () => void;
  openBillboard: () => void;
  closeBillboard: () => void;
  openLogin: () => void;
  closeLogin: () => void;
  openColor: () => void;
  closeColor: () => void;
  closeSize: () => void;
  openSize: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  imageViewerId: null,
  isBillboardOpen: false,
  isLoginOpen: false,
  isCategoryOpen: false,
  isProductOpen: false,
  isColorOpen: false,
  isSizeOpen: false,
  isColorAlertOpen: false,
  isSizeAlertOpen: false,
  isImageViewerOpen: false,
  colorAlertId: null,
  sizeAlertId: null,
  openImageViewer: (src) =>
    set({ isImageViewerOpen: true, imageViewerId: src }),
  closeImageViewer: () => set({ isImageViewerOpen: false }),
  openColorAlert: (id) => set({ isColorAlertOpen: true, colorAlertId: id }),
  closeColorAlert: () => set({ isColorAlertOpen: false, colorAlertId: null }),
  openSizeAlert: (id) => set({ isSizeAlertOpen: true, sizeAlertId: id }),
  closeSizeAlert: () => set({ isSizeAlertOpen: false, sizeAlertId: null }),
  openColor: () => set({ isColorOpen: true }),
  closeColor: () => set({ isColorOpen: false }),
  openSize: () => set({ isSizeOpen: true }),
  closeSize: () => set({ isSizeOpen: false }),
  openCategory: () => set({ isCategoryOpen: true }),
  closeCategory: () => set({ isCategoryOpen: false }),
  openBillboard: () => set({ isBillboardOpen: true }),
  closeBillboard: () => set({ isBillboardOpen: false }),
  openLogin: () => set({ isLoginOpen: true }),
  closeLogin: () => set({ isLoginOpen: false }),
  openProduct: () => set({ isProductOpen: true }),
  closeProduct: () => set({ isProductOpen: false }),
}));
