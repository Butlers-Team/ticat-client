import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Token {
  accessToken: string;
  refreshToken: string;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
}

/** 2023/07/10 - 로그인 응답 헤더 토큰 저장소 - by leekoby */
const useTokenStore = create<Token>(set => ({
  accessToken: '',
  refreshToken: '',
  setAccessToken: accessToken => set(() => ({ accessToken })),
  setRefreshToken: refreshToken => set(() => ({ refreshToken })),
}));

export { useTokenStore };
