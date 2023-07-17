import { create } from 'zustand';

const tabCategory = [
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
  currentTab: string;
  setCurrentTab: (items: string) => void;
}

const useTabStore = create<TabStore>(set => ({
  currentTab: tabCategory[0],
  setCurrentTab: (tab: string) => set({ currentTab: tab }),
}));

export { useTabStore };
