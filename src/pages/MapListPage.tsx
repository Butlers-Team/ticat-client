import styled from 'styled-components';

import {
  useKeywordStore,
  useListAppearState,
  useMapLocationStore,
  useMapUpdateLocationStore,
} from '@store/mapListStore';

//component
import MapScreen from '@components/maplist/MapScreen';
import OptionButton from '@components/maplist/OptionButton';
import FastivalList from '@components/maplist/FastivalList';

//icon
import { MdOutlineFeaturedPlayList, MdOutlineMyLocation } from 'react-icons/md';
import { useLocationStore } from '@store/userLocation';

const MapListPage = () => {
  const { location } = useLocationStore();
  const { screenLocation, setScreenLocation } = useMapLocationStore();
  const { setKeyword } = useKeywordStore();
  const { setUpdateScreenLocation } = useMapUpdateLocationStore();

  const { listAppear, setListAppear } = useListAppearState();

  return (
    <MapListContainer>
      <MapScreen />
      <MapList display={listAppear ? 0 : 100}>
        <AccordionBtn
          className={`flex-all-center ${listAppear ?? 'clicked-btn'}`}
          onClick={() => {
            setListAppear(!listAppear);
          }}>
          <MdOutlineFeaturedPlayList className="icon-margin" />
          리스트 {listAppear ? '내리기' : '보기'}
        </AccordionBtn>
        {screenLocation !== location && (
          <MyLocationBtn
            className={`flex-all-center ${listAppear ?? 'clicked-btn'}`}
            onClick={() => {
              setKeyword('');
              setUpdateScreenLocation(screenLocation);
            }}>
            <MdOutlineMyLocation className="icon-margin" />현 위치에서 검색
          </MyLocationBtn>
        )}
        <OptionButton />
        <FastivalList />
      </MapList>
    </MapListContainer>
  );
};

export default MapListPage;

interface display {
  display: number;
}

const MapListContainer = styled.section`
  position: relative;

  height: calc(100vh - 70px);
  overflow: hidden;
`;

const MapList = styled.article<display>`
  position: absolute;
  bottom: 0px;
  background-color: var(--background-color);
  width: 100%;
  height: calc(100vh - 60% + 30px);
  border-radius: 30px 30px 0px 0px;
  display: block;
  transition: all ease-in-out 0.3s;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  transform: translateY(${props => props.display}%);
  z-index: 999;

  .icon-margin {
    margin-right: 5px;
  }
  .clicked-btn {
    border: 1px solid var(--color-sub);
    color: var(--color-main);
  }

  > button:nth-child(1):hover {
    color: var(--color-main);
  }

  > button:nth-child(2):hover {
    background-color: var(--color-sub);
  }
`;

const AccordionBtn = styled.button`
  position: absolute;
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.3rem;
  top: -60px;
  left: 20px;
  border: none;
  font-weight: 600;
  color: var(--color-dark);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  @media (max-width: 300px) {
    font-size: 1.3rem;
    padding: 7px 10px;
    top: -50px;
  }
`;

const MyLocationBtn = styled(AccordionBtn)`
  left: auto;
  right: 20px;
  background-color: var(--color-main);
  color: #fff;
`;
