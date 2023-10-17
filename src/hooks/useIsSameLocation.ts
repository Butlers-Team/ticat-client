import { useLocation } from 'react-router-dom';

/** 2023/10/16 현재 위치와 내가 입력한 경로가 같은 곳인지 확인하는 함수 - leekoby */
export const useIsSameLocation = (path: string) => {
  const location = useLocation();
  return location.pathname === path;
};
