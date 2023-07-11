import styled from 'styled-components';

//component
import Button from '@components/Button';

//icon
import { FaSearch } from 'react-icons/fa';

const MapScreen = () => {
  return (
    <MapView>
      <div className="map-search flex-v-center">
        <input type="text" placeholder="검색할 축제 이름 및 지역명" />
        <Button margin="0px" height="40px" width="70px">
          <FaSearch className="icon-margin" />
          검색
        </Button>
      </div>
    </MapView>
  );
};

export default MapScreen;

const MapView = styled.article`
  height: 400px;
  background-color: var(--color-light-gray);

  .map-search {
    height: 30px;
    padding: 20px;
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
`;
