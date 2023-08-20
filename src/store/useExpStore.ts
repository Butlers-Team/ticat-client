import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ExpInfo {
  exp: number | null;
  setExp: (exp: number | null) => void;
  clearExp: () => void;
}

// 초기값 설정
const initialState = {
  exp: null,
  setExp: () => {},
  clearExp: () => {},
};

const clearExp = () => {
  const { clearExp } = useExpStore.getState();
  clearExp();
};

const getExp = () => {
  const { exp } = useExpStore.getState();
  return exp;
};

/** 2023/08/02 - 토큰만료시간 저장소 - by leekoby */
const useExpStore = create(
  persist<ExpInfo>(
    set => ({
      ...initialState,
      setExp: exp => set(state => ({ ...state, exp })),
      clearExp: () => set(() => initialState),
    }),
    { name: 'exp', getStorage: () => localStorage },
  ),
);

export { useExpStore, clearExp, getExp };
