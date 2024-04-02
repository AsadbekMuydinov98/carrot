import { create } from "zustand";

interface EditProductStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditProduct = create<EditProductStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditProduct;