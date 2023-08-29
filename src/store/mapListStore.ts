import { create } from 'zustand';

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

export const tabState = ['진행중', '예정됨', '종료됨'];

// 지도 리스트 정렬방식 저장 (sortBy,setSortBy)
interface OptionState {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

export const useOptionStore = create<OptionState>(set => ({
  sortBy: '',
  setSortBy: (sortBy: string) => set({ sortBy }),
}));

// 지도 리스트 카테고리 저장 (category,setCategory)
type CategoryState = {
  category: string[];
  setCategory: (tab: string) => void;
};

export const useCategoryStore = create<CategoryState>(set => ({
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

// 지도 리스트 축제상태 저장 (category,setCategory)
type statusState = {
  status: string[];
  setStatus: (tab: string) => void;
};

export const useStatusStore = create<statusState>(set => ({
  status: [],
  setStatus: tab => {
    set(state => {
      if (tab === '전체') {
        return { status: [] };
      } else {
        if (state.status.includes(tab)) {
          return { status: state.status.filter(item => item !== tab) };
        } else {
          return state.status.length < 5 ? { status: [...state.status, tab] } : state;
        }
      }
    });
  },
}));

// 지도 리스트 검색 키워드 저장 (keyword,setKeyword)
interface keywordState {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

export const useKeywordStore = create<keywordState>(set => ({
  keyword: '',
  setKeyword: (keyword: string) => set({ keyword }),
}));

// API 요청 파람스 저장 (locationData,setLocationData)
type Location = {
  latitude: number;
  longitude: number;
  title: string;
  category: string;
};

type LocationDataState = {
  locationData: Location[];
  setLocationData: (newData: Location[]) => void;
};

export const useLocationStore = create<LocationDataState>(set => ({
  locationData: [
    {
      latitude: 127.0,
      longitude: 25.0,
      title: '',
      category: '',
    },
  ],
  setLocationData: newData => set({ locationData: newData }), // updateData의 인자를 받아 state를 업데이트
}));

// 지도 화면 위치 저장 (screenLocation,setScreenLocation)
type mapScreenLocation = {
  latitude?: number;
  longitude?: number;
};

type mapScreenLocationState = {
  screenLocation: mapScreenLocation;
  setScreenLocation: (newData: mapScreenLocation) => void;
};

export const useMapLocationStore = create<mapScreenLocationState>(set => ({
  screenLocation: {
    latitude: 37.566761113473376,
    longitude: 126.97854474587949,
  },
  setScreenLocation: newData => set({ screenLocation: newData }),
}));

// 지도 확대레벨 저장
interface zoomLevelState {
  zoomLv: number;
  setZoomLv: (zoomLv: number) => void;
}

export const useZoomLevelStore = create<zoomLevelState>(set => ({
  zoomLv: 4,
  setZoomLv: (zoomLv: number) => set({ zoomLv }),
}));
