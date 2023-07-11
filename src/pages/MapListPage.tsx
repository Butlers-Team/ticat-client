import styled from 'styled-components';

//component
import Button from '@components/Button';

const MapListPage = () => {
  return (
    <MapListContainer>
      <MapView>
        <div className="map-search flex-v-center">
          <input type="text" />
          <Button>검색</Button>
        </div>
      </MapView>
      <MapList>
        <OpstionCategory></OpstionCategory>
        <FastivalListBox></FastivalListBox>
      </MapList>
    </MapListContainer>
  );
};

export default MapListPage;

const MapListContainer = styled.section`
  position: relative;
  height: 100%;
`;

const MapView = styled.article`
  height: 300px;
  background-color: var(--color-light-gray);

  .map-search {
    height: 30px;
    border: 1px solid red;
    padding: 20px;
    input {
    }
  }
`;

const MapList = styled.article`
  background-color: var(--background-color);
  height: calc(100% - 240px);
  border-radius: 30px 30px 0px 0px;
  margin-top: -60px;
  overflow: hidden;
`;

const OpstionCategory = styled.aside`
  height: 60px;
  border-bottom: 1px solid rgba(173, 173, 173, 0.2);
`;

const FastivalListBox = styled.div``;
