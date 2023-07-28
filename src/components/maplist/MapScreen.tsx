import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useKeywordStore } from '@store/mapListStore';

//component
import Button from '@components/Button';

//icon
import { FaSearch } from 'react-icons/fa';

export interface LatLngType {
  latitude: number;
  longitude: number;
}

const MapScreen = () => {
  const [inputText, setInputText] = useState<string>('');
  const { setKeyword } = useKeywordStore();
  const [markerPositions, setMarkerPositions] = useState<LatLngType[]>([
    { latitude: 37.0, longitude: 127.0 }, // 예시로 두 개의 마커 위치를 초기화
    { latitude: 37.0, longitude: 127.1 },
  ]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setKeyword(inputText);
    }
  };

  useEffect(() => {
    // 카카오 지도 API 스크립트가 로드된 후 실행되도록 함
    window.kakao.maps.load(() => {
      // 카카오 지도 생성
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울시청 좌표를 기준으로 설정
        level: 12, // 지도 확대 레벨
      };
      const map = new window.kakao.maps.Map(container, options);

      // 마커들 생성 및 추가
      markerPositions.forEach(position => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(position.latitude, position.longitude),
        });
        marker.setMap(map);
      });
    });
  }, []);

  return (
    <MapView>
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
      <div className="map-search flex-v-center">
        <input
          type="text"
          placeholder="검색할 축제 이름 및 지역명"
          value={inputText}
          onChange={e => {
            setInputText(e.target.value);
          }}
          onKeyDown={e => {
            handleKeyPress(e);
          }}
        />
        <Button
          margin="0px"
          height="40px"
          width="70px"
          onClick={() => {
            setKeyword(inputText);
          }}>
          <FaSearch className="icon-margin" />
          검색
        </Button>
      </div>

      {/* <div className="map-guide"></div> */}
    </MapView>
  );
};

export default MapScreen;

const MapView = styled.article`
  position: relative;
  height: 400px;
  background-color: var(--color-light-gray);

  .map-search {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 30px;
    padding: 20px;
    z-index: 99;

    input {
      width: 100%;
      height: 40px;
      margin-right: 10px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      padding: 0px 20px;
      color: var(--color-dark);

      ::placeholder {
        color: var(--color-dark-gray);
        font-weight: 300;
      }
    }

    .icon-margin {
      margin: 5px 3px 3px 0px;
      font-size: 1.2rem;
    }
  }
  .map-guide {
    width: 100%;
    height: 100%;
    background: url('https://i.imgur.com/LcydlQy.png');
  }
`;
