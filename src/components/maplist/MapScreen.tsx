import styled from 'styled-components';
import { useState, useEffect } from 'react';
import {
  useKeywordStore,
  useMarkerDataStore,
  useMapLocationStore,
  useZoomLevelStore,
  useListAppearState,
} from '@store/mapListStore';
import { useLocationStore } from '@store/userLocation';

//component

import Button from '@components/Button';

//icon
import { FaSearch } from 'react-icons/fa';
import { MdRefresh } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TbKeyframeAlignCenter } from 'react-icons/tb';

export interface LatLngType {
  status: string;
  latitude: number;
  longitude: number;
  title: string;
  category: string;
}

const MapScreen = () => {
  const { location } = useLocationStore();
  const [inputText, setInputText] = useState<string>('');
  const { setKeyword } = useKeywordStore();
  const { zoomLv, setZoomLv } = useZoomLevelStore();
  const { markerData } = useMarkerDataStore();
  const { listAppear, setListAppear } = useListAppearState();
  const { screenLocation, setScreenLocation } = useMapLocationStore();
  const [markerPositions, setMarkerPositions] = useState<LatLngType[]>(markerData);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setKeyword(inputText);
    }
  };

  useEffect(() => {
    if (markerData.length > 0) {
      setMarkerPositions(markerData);
    }
  }, [markerData]);

  useEffect(() => {
    window.kakao.maps.load(() => {
      // 카카오 지도 생성
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(screenLocation.latitude, screenLocation.longitude), // 맨 첫번째 좌표를 기준
        level: zoomLv, // 지도 확대 레벨
      };
      const map = new window.kakao.maps.Map(container, options);

      // 드래그가 끝났을 때 중앙 좌표값을 얻는 이벤트 핸들러 추가
      window.kakao.maps.event.addListener(map, 'dragend', () => {
        const center = map.getCenter(); // 지도의 중앙 좌표값을 얻어옴
        const zoomLevel = map.getLevel(); //지도 확대 레벨을 저장함
        const mapLocation = {
          latitude: center.getLat(),
          longitude: center.getLng(),
        };
        setZoomLv(zoomLevel);
        setScreenLocation(mapLocation);
      });

      // 각 위치에 정보를 표시할 HTML 요소 생성 및 배치
      markerPositions.forEach(position => {
        const infoElement = document.createElement('div');
        infoElement.className = 'position-info';
        infoElement.innerHTML = `
        <div class="info-marker ${position.status === 'COMPLETED' && 'completed-marker'} ${
          position.status === 'EXPECTED' && 'expected-marker'
        }">
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

        // 클릭 이벤트 핸들러 추가
        infoElement.addEventListener('click', () => {
          // 마커를 클릭했을 때 원하는 동작을 수행하도록 코드 작성
          infoElement.classList.add('clicked');
          setKeyword(position.title);
          setInputText(position.title);
          setListAppear(true);
        });

        infoOverlay.setMap(map);
      });
    });
  }, [markerPositions, screenLocation]);

  return (
    <MapView>
      {listAppear ? null : (
        <MyPointer className="flex-all-center">
          <TbKeyframeAlignCenter />
        </MyPointer>
      )}
      {inputText && (
        <RemoveKeyword
          onClick={() => {
            setKeyword('');
            setInputText('');
            setListAppear(false);
          }}>
          <RiDeleteBin6Line className="refresh-icon" />
          검색 초기화
        </RemoveKeyword>
      )}
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
    </MapView>
  );
};

export default MapScreen;

const MapView = styled.article`
  position: relative;
  height: 100%;
  background-color: var(--color-light-gray);
  transition: ease-in-out 0.3s all;

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
    transform: scale(0.8);

    :hover {
      color: var(--color-main);
    }

    .info-marker {
      position: relative;
      max-width: 30px;
      max-height: 30px;
      background-color: var(--color-main);
      overflow: hidden;
      border-radius: 30px;
      margin: 2px 7px 2px 3px;
    }

    .completed-marker {
      background-color: #d4d7df;
    }

    .expected-marker {
      background-color: var(--color-sub);
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

const RemoveKeyword = styled.div`
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.3rem;
  font-weight: 700;
  padding: 7px 15px;
  border-radius: 50px;
  background: #fff;
  color: var(--color-main);

  z-index: 9;
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  .refresh-icon {
    font-size: 1.6rem;
    transform: translate(-3px, 3px);
  }

  :hover {
    background: var(--color-sub);
  }
`;

const MyPointer = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  color: rgba(0, 0, 0, 0.6);
`;
