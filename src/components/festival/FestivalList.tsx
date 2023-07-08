import styled from 'styled-components';
import { FestivalListType } from 'types/api/catergory';
import { Link } from 'react-router-dom';

import Festival from './Festival';

interface FestivalListProps {
  data: FestivalListType[];
}

/** 2023/07/08 - 축제 리스트 컴포넌트 - by sineTlsl */
const FestivalList = ({ data }: FestivalListProps) => {
  return (
    <FestivalListContainer>
      {data && (
        <ul>
          {data.map(item => (
            <li key={item.festivalId}>
              <Link to="/detail">
                <Festival item={item} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </FestivalListContainer>
  );
};

export default FestivalList;

const FestivalListContainer = styled.ul`
  position: relative;
  /* top: 6rem; */
  width: 100%;
  height: calc(100% - 13rem);
  overflow-y: scroll;

  // 스크롤바 없애기
  // chrome and safari
  ::-webkit-scrollbar {
    display: none;
  }
  // firefox
  scrollbar-width: none;
`;
