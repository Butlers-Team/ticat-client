import { useEffect } from 'react';
import Router from './Router';
import { useLocationStore } from '@store/userLocation';

function App() {
  const setLocation = useLocationStore(state => state.setLocation);

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

    const updateHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <div className="app">
      <Router />
    </div>
  );
}

export default App;
