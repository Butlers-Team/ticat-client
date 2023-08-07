import create from 'zustand';

interface Location {
  latitude: number;
  longitude: number;
}

interface LocationState {
  location: Location;
  setLocation: (location: Location) => void;
}

export const useLocationStore = create<LocationState>(set => ({
  location: { latitude: 126.98834145916423, longitude: 37.54810058003352 }, // 초기값 설정
  setLocation: location => set({ location }),
}));
