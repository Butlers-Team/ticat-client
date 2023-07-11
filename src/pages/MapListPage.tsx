import styled from 'styled-components';

//component
import MapScreen from '@components/map-list/MapScreen';
import OpstionCategory from '@components/map-list/OpstionCategory';
import FastivalList from '@components/map-list/FastivalList';

const MapListPage = () => {
  return (
    <MapListContainer>
      <MapScreen />
      <MapList>
        <OpstionCategory />
        <FastivalList />
      </MapList>
    </MapListContainer>
  );
};

export default MapListPage;

const MapListContainer = styled.section`
  position: relative;
  height: 100%;
`;

const MapList = styled.article`
  background-color: var(--background-color);
  height: calc(100% - 340px);
  border-radius: 30px 30px 0px 0px;
  margin-top: -60px;
  overflow: hidden;
  animation: showupLayout 0.5s forwards;

  @keyframes showupLayout {
    0% {
      opacity: 0;
    }
    80% {
      opacity: 1;
      transform: translateY(-40px);
    }
    100% {
      opacity: 1;
      transform: translateY(-30px);
    }
  }
`;
