import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ExpInfo {
  exp: number | null;
  setExp: (exp: number | null) => void;
  resetExp: () => void;
}

// 초기값 설정
const initialState = {
  exp: null,
  setExp: () => {},
  resetExp: () => {},
};

const resetExp = () => {
  const { resetExp } = useExpStore.getState();
  resetExp();
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
      resetExp: () => set(() => initialState),
    }),
    { name: 'exp', getStorage: () => localStorage },
  ),
);

export { useExpStore, resetExp, getExp };
