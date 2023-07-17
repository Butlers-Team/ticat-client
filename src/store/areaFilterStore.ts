import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AreaFilterStore {
  selectedItems: string[]; // 선택한 지역 및 지역별 자치구 list
  setSelectedItems: (items: string[]) => void;
}

/** 2023/07/17 - 지역 선택 카테고리 상태 업데이트 - by sineTlsl */
const useAreaFilterStore = create(
  persist<AreaFilterStore>(
    set => ({
      selectedItems: [],
      setSelectedItems: (items: string[]) => set({ selectedItems: items }),
    }),
    {
      name: 'areaFilterStore',
      getStorage: () => sessionStorage,
    },
  ),
);

export { useAreaFilterStore };
