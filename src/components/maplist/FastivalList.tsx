import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMapFastival } from '@api/mapfastival';

//component
import Festival from '@components/festival/Festival';

//type
import { MapFastivalType } from 'types/api/mapfastival';
import { useOptionStore, useCategoryStore, useKeywordStore, useLocationStore } from '@store/mapListStore';

interface transformed {
  latitude: number;
  longitude: number;
}

const FastivalList = () => {
  const [mapListData, setMapListData] = useState<MapFastivalType[]>([]);
  const { sortBy } = useOptionStore();
  const { category } = useCategoryStore();
  const { keyword } = useKeywordStore();
  const { locationData, setLocationData } = useLocationStore();

  const categoryJoin = category.join();

  /** 2023/07/12 - 축제 상세 데이터 요청 함수 - by parksubeom */
  const fetchDetailList = async () => {
    const params = {
      keyword: keyword,
      categories: categoryJoin,
      sortBy: sortBy,
      page: 1,
      size: 10,
    };

    const res = await getMapFastival(params);
    if (res.data) {
      setMapListData(res.data);

      // 변환된 값을 저장할 스테이트 변수
      const transformedData: transformed[] = [];

      // 주어진 데이터에서 "mapx"와 "mapy" 값을 추출하여 변환 후 스테이트에 저장
      res.data.forEach(item => {
        const latitude = item.mapy;
        const longitude = item.mapx;
        transformedData.push({ latitude, longitude });
      });

      setLocationData(transformedData);
    }
  };
  useEffect(() => {
    fetchDetailList();
  }, [sortBy, category, keyword]);

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
