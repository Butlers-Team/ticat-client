import styled from 'styled-components';
import Button from '../Button';
import { useEffect } from 'react';
import { FestivalDetailType } from 'types/api/catergory';

/** 2023/07/12 - 카카오맵api 타입스크립트 설정 -parksubeom */
declare global {
  interface Window {
    kakao: any;
  }
}
interface FestivalCoverProps {
  detailList: FestivalDetailType;
}
const FestivalLocation: React.FC<FestivalCoverProps> = ({ detailList }) => {
  const { kakao } = window;

  useEffect(() => {
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const position = new window.kakao.maps.LatLng(detailList.mapy, detailList.mapx);
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: position, //지도의 중심좌표.
      level: 4, //지도의 레벨(확대, 축소 정도)
    };
    /** 2023/07/12 - 카카오맵 마커 -parksubeom */
    const MapMarker = new window.kakao.maps.Marker({
      position: position, // 위치
    });
    /** 2023/07/12 - 카카오지도 생성 및 객체 리턴 -parksubeom */
    const map = new window.kakao.maps.Map(container, options);

    const content = `<div class="marker-info">${detailList.address}</div>`;
    new kakao.maps.CustomOverlay({
      map,
      position,
      content,
    });
    MapMarker.setMap(map);
  }, []);
  return (
    <>
      <LocationContainer>
        <h2>위치 안내</h2>
        <div id="map"></div>
        <Button>내 위치에서 경로찾기</Button>
      </LocationContainer>
    </>
  );
};

const LocationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2rem;

  > h2 {
    color: var(--color-dark);
    font-size: 24px;
    font-weight: bold;
  }
  > p {
    font-size: 16px;
    color: var(--color-dark);
    margin-top: 2rem;
    margin-bottom: 2rem;
    font-weight: 400;
    letter-spacing: 1px;
    line-height: 25px;
  }
  > #map {
    margin-top: 2rem;
    margin-bottom: 1rem;
    border-radius: 1rem;
    width: 100%;
    height: 20rem;
    .marker-info {
      font-size: 14px;
      font-weight: bold;
      padding: 3px;
      background-color: aliceblue;
      border: 1px solid var(--color-main);
      margin-bottom: 11rem;
    }
  }
`;
export default FestivalLocation;
