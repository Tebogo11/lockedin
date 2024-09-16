import { create } from "zustand";

type Values = {
  dontShowBottomTab: boolean;
};
type Operations = {
  setDontShowBottomTab: (dontShowBottomTab: boolean) => void;
};

const usePageManagement = create<Values & Operations>()((set) => ({
  dontShowBottomTab: false,
  setDontShowBottomTab: (dontShowBottomTab) => set({ dontShowBottomTab }),
}));

export default usePageManagement;
