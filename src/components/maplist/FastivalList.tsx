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
  title: string;
  category: string;
}

const FastivalList = () => {
  const [mapListData, setMapListData] = useState<MapFastivalType[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const { sortBy } = useOptionStore();
  const { category } = useCategoryStore();
  const { keyword } = useKeywordStore();
  const { setLocationData } = useLocationStore();
  const [size, setSize] = useState<number>(15);

  const categoryJoin = category.join();

  const fetchDetailList = async () => {
    const params = {
      keyword: keyword,
      categories: categoryJoin,
      sortBy: sortBy,
      page: 1,
      size: size,
    };

    const res = await getMapFastival(params);
    if (res.data) {
      setMapListData(res.data);

      if (res.pageInfo) {
        const page = res.pageInfo;
        setTotalPages(page.totalElements);
      }
      // 변환된 값을 저장할 스테이트 변수
      const transformedData: transformed[] = [];

      // 주어진 데이터에서 "mapx"와 "mapy" 값을 추출하여 변환 후 스테이트에 저장
      res.data.forEach(item => {
        const latitude = item.mapy;
        const longitude = item.mapx;
        const title = item.title;
        const category = item.category;
        transformedData.push({ latitude, longitude, title, category });
      });

      setLocationData(transformedData);
    }
  };
  useEffect(() => {
    fetchDetailList();
  }, [sortBy, category, keyword, size]);

  const handleLoadMore = () => {
    setSize(prevSize => prevSize + 10); // Increase size by 10
  };

  return (
    <FastivalListBox>
      {mapListData.map(list => (
        <Link to={`/detail/${list.festivalId}`} key={list.festivalId}>
          <Festival item={list} />
        </Link>
      ))}
      {mapListData.length === 0 && (
        <DataUndefined className="flex-all-center column">
          <img src="/assets/images/ticat-logo-icon-undefined.png" alt="ticat-logo-icon-undefined" />
          <p>검색된 축제가 없어요</p>
          <p>{`다른 검색어를 입력해주세요 :(`}</p>
        </DataUndefined>
      )}
      <button onClick={handleLoadMore} className={`${totalPages === mapListData.length && 'disabled'}`}>
        축제 더보기
      </button>
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

  button {
    background: var(--color-main);
    border: none;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    color: #fff;
    margin: 10px 0px;
    cursor: pointer;
  }

  .disabled {
    background: #eee;
    cursor: auto;
  }
`;

const DataUndefined = styled.div`
  margin-bottom: 20px;

  img {
    width: 150px;
    height: 150px;
    opacity: 0.1;
  }

  :nth-child(2) {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-dark-gray);
  }
  :nth-child(3) {
    font-size: 1.3rem;
    color: var(--color-dark-gray);
  }
`;
