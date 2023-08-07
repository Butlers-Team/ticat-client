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
  location: { latitude: 0, longitude: 0 }, // 초기값 설정
  setLocation: location => set({ location }),
}));
