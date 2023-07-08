import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getCatergories } from '../api/catergory';
import { FestivalListType, CatergoriesRequest } from 'types/api/catergory';

import { IoMdOptions } from 'react-icons/io';

// components
import InfiniteScroll from '@components/festival/InfiniteScroll';
import FestivalList from '@components/festival/FestivalList';
import CatergoryTabNav from '@components/festival/CatergoryTabNav';

const tabCatergory = [
  '전체',
  '음악',
  '미술',
  '영화',
  '문화',
  '국제',
  '역사',
  '과학',
  '스포츠',
  '요리',
  '주류',
  '정원',
  '종교',
  '전통',
  '기타',
];

const FestivalListPage = () => {
  // const { data, status, error } = useQuery(['categories'], async () => {
  //   const response = await getCatergories(params);
  //   return response.data;
  // });
  const [currentTab, setCurrentTab] = useState(tabCatergory[0]);
  const [page, setPage] = useState<number>(1);
  const [FestivalData, setFestivalData] = useState<FestivalListType[]>([]);

  /** 2023/07/04 - 카테고리 탭 select 함수 - by sineTlsl */
  const HandlerSelectTab = (tabName: string): void => {
    setCurrentTab(tabName);
  };

  /** 2023/07/04 - 카테고리 클릭 시 API 요청하는 함수 - by sineTlsl */
  // 현재 instance만 사용함. 추후 react-query로 리팩토링 예정
  const fetchData = async () => {
    let params: CatergoriesRequest = {
      page,
      size: 10,
    };
    if (currentTab !== '전체') {
      params = {
        category: currentTab,
        ...params,
      };
    }

    const res = await getCatergories(params);
    setFestivalData(res.data.data);
    console.log(FestivalData);
  };

  useEffect(() => {
    fetchData();
  }, [currentTab, page]);

  // console.log('data >> ', data);
  // console.log('status >> ', status);
  // console.log('error >> ', error);

  return (
    <FestivalListContainer>
      <CatergoryTabNav tabCatergory={tabCatergory} currentTab={currentTab} onClick={HandlerSelectTab} />
      <FestivalFilter>
        <h2 className="festival-list-title">축제 리스트</h2>
        <div className="festival-list-filter">
          <span>서울 외 4곳 </span>
          <IoMdOptions size="20px" color="var(--color-sub)" />
        </div>
      </FestivalFilter>
      <FestivalList data={FestivalData} />
    </FestivalListContainer>
  );
};

export default FestivalListPage;

/** 2023/07/04 - 축제 리스트 컨테이너 - by sineTlsl */
const FestivalListContainer = styled.section`
  position: relative;
  margin: 0 auto;
  width: calc(100% - 4rem);
  height: 100%;
`;

const FestivalFilter = styled.div`
  height: 7rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .festival-list-title {
    color: var(--color-dark);
    font-size: 18px;
    font-weight: 700;
  }
  > .festival-list-filter {
    font-size: 14px;
    font-weight: 500;
    color: var(--color-sub);
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;
