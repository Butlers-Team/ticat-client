import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMapFastival } from '@api/mapfastival';

//component
import Festival from '@components/festival/Festival';

//type
import { MapFastivalType } from 'types/api/mapfastival';
import { useOptionStore, useCategoryStore } from '@store/mapListStore';

const FastivalList = () => {
  const [mapListData, setMapListData] = useState<MapFastivalType[]>([]);
  const { sortBy } = useOptionStore();
  const { category } = useCategoryStore();

  const categoryJoin = category.join();

  /** 2023/07/12 - 축제 상세 데이터 요청 함수 - by parksubeom */
  const fetchDetailList = async () => {
    const params = {
      categories: categoryJoin,
      sortBy: sortBy,
      page: 1,
      size: 10,
    };

    const res = await getMapFastival(params);
    if (res.data) {
      setMapListData(res.data);
    }
  };
  useEffect(() => {
    fetchDetailList();
  }, [sortBy, category]);

  return (
    <FastivalListBox>
      {mapListData.map(list => (
        <Link to={`/detail/${list.festivalId}`} key={list.festivalId}>
          <Festival item={list} />
        </Link>
      ))}
    </FastivalListBox>
  );
};

export default FastivalList;

const FastivalListBox = styled.article`
  width: 100%;
  height: calc(100% - 100px);
  padding: 20px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
