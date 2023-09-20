import { useEffect, useRef } from 'react';
import Router from './Router';
import { useLocationStore } from '@store/userLocation';

function App() {
  const setLocation = useLocationStore(state => state.setLocation);
  const previousVH = useRef<number>(0); // 이전 화면 높이 저장용

  useEffect(() => {
    /**2023.07.25 사용자 위치정보 요청 - by mscojl24 */
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        error => {
          console.error('Error getting location:', error);
        },
        {
          timeout: 5000,
        },
      );
    }

    /** 2023/09/01 - 모바일 높이 설정 - by sineTlsl */
    const updateHeight = () => {
      const vh = window.innerHeight * 0.01;
      if (vh !== previousVH.current) {
        // 화면 높이가 변했을 때만 업데이트
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        previousVH.current = vh;
      }
    };

    // 초기 로드 시 설정
    updateHeight();

    const intervalId = setInterval(updateHeight, 150); // 150ms마다 화면 높이 확인

    // cleanup 함수에서 이벤트 리스너와 setInterval 제거
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="app">
      <Router />
    </div>
  );
}

export default App;
