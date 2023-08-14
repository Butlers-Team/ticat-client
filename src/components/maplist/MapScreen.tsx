import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useKeywordStore, useLocationStore } from '@store/mapListStore';

//component

import Button from '@components/Button';

//icon
import { FaSearch } from 'react-icons/fa';

export interface LatLngType {
  latitude: number;
  longitude: number;
  title: string;
  category: string;
}

const MapScreen = () => {
  const [inputText, setInputText] = useState<string>('');
  const { setKeyword } = useKeywordStore();
  const { locationData } = useLocationStore();
  const [markerPositions, setMarkerPositions] = useState<LatLngType[]>(locationData);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setKeyword(inputText);
    }
  };

  useEffect(() => {
    // This useEffect hook will run whenever locationData changes
    setMarkerPositions(locationData);
  }, [locationData]);

  useEffect(() => {
    // 카카오 지도 API 스크립트가 로드된 후 실행되도록 함
    window.kakao.maps.load(() => {
      // 카카오 지도 생성
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(locationData[0].latitude, locationData[0].longitude), // 맨 첫번째 좌표를 기준
        level: 8, // 지도 확대 레벨
      };
      const map = new window.kakao.maps.Map(container, options);

      // 각 위치에 정보를 표시할 HTML 요소 생성 및 배치
      markerPositions.forEach(position => {
        const infoElement = document.createElement('div');
        infoElement.className = 'position-info';
        infoElement.innerHTML = `
          <div class="info-marker">
            <img src='https://i.imgur.com/YIVVwVH.png' alt='marker-icon'>
          </div>
          <div class="info-text">
            <p class="position-title">${position.title}</p>
            <p class="position-category">${position.category}</p>
          </div>
        `;

        const infoOverlay = new window.kakao.maps.CustomOverlay({
          content: infoElement,
          position: new window.kakao.maps.LatLng(position.latitude, position.longitude),
          xAnchor: 0.5,
          yAnchor: 1.0,
        });

        infoOverlay.setMap(map);
      });
    });
  }, [markerPositions]);

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

  .position-info {
    display: flex;
    position: relative;
    padding: 0px;
    background: #ffffff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 100px;
    border-radius: 100px;
    border: var(--color-main) solid 1px;
    padding: 3px 3px;

    .info-marker {
      position: relative;
      max-width: 30px;
      max-height: 30px;
      background-color: var(--color-main);
      overflow: hidden;
      border-radius: 30px;
      margin: 2px 3px;
    }
    .position-title {
      width: 120px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 1.5rem;
      font-weight: 700;
    }
    .position-category {
      margin-top: -5px;
    }
  }

  .position-info::after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 7px 7px 0;
    border-color: #ffffff transparent;
    display: block;
    width: 0;
    z-index: 1;
    bottom: -7px;
    left: 45%;
  }

  .position-info::before {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 7px 7px 0;
    border-color: var(--color-main) transparent;
    display: block;
    width: 0;
    z-index: 0;
    bottom: -8px;
    left: 45%;
  }

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
