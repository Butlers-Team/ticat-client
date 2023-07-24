import create from 'zustand';
import { persist } from 'zustand/middleware';

export const mapOptions = [
  { optionName: '좋아요순', value: 'likeCount' },
  { optionName: '평점순', value: 'reviewRating' },
  { optionName: '리뷰순', value: 'reviewCount' },
];

export const tabCategory = [
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

interface OptionState {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

const useOptionStore = create<OptionState>(set => ({
  sortBy: '',
  setSortBy: (sortBy: string) => set({ sortBy }),
}));

type CategoryState = {
  category: string[];
  setCategory: (tab: string) => void;
};

const useCategoryStore = create<CategoryState>(set => ({
  category: [],
  setCategory: tab => {
    set(state => {
      if (tab === '전체') {
        return { category: [] };
      } else {
        if (state.category.includes(tab)) {
          return { category: state.category.filter(item => item !== tab) };
        } else {
          return state.category.length < 5 ? { category: [...state.category, tab] } : state;
        }
      }
    });
  },
}));

export { useOptionStore, useCategoryStore };
