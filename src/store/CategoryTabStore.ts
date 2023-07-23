import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const categoriesTab = [
  '전체',
  '음악',
  '미술',
  '영화',
  '문화',
  '국제',
  '역사',
  '과학',
  '스포츠',
  '요리',
  '주류',
  '정원',
  '종교',
  '전통',
  '기타',
];

interface TabStore {
  categoryTab: string;
  categoriesTab: string[];
  setCategoryTab: (items: string) => void;
}

const useCategoryTabStore = create(
  persist<TabStore>(
    set => ({
      categoryTab: categoriesTab[0],
      setCategoryTab: (tab: string) => set({ categoryTab: tab }),
      categoriesTab: categoriesTab,
    }),
    {
      name: 'useCategoryTabStore',
      getStorage: () => sessionStorage,
    },
  ),
);

export { useCategoryTabStore };
