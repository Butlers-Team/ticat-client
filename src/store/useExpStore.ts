import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ExpInfo {
  exp?: number | null;
  setExp: (exp: number | null) => void;
  clearExp: () => void;
}

const clearExp = () => {
  localStorage.removeItem('exp');
};

const getExp = () => {
  const { exp } = useExpStore.getState();
  return exp;
};

/** 2023/08/02 - 토큰만료시간 저장소 - by leekoby */
const useExpStore = create(
  persist<ExpInfo>(
    set => ({
      setExp: exp => set(state => ({ ...state, exp })),
      clearExp: () => {
        clearExp();
        set({ exp: null });
      },
    }),
    { name: 'exp', getStorage: () => localStorage },
  ),
);

export { useExpStore, clearExp, getExp };
