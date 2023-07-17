import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { getCatergories } from '@api/category';
import { CategoriesRequest } from 'types/api/category';

// stores
import { useAreaFilterStore } from '@store/areaFilterStore';
import { useTabStore } from '@store/CategoryTabStore';

// components
import CatergoryTabNav from '@components/festival/CategoryTabNav';
import Festival from '@components/festival/Festival';

// icons
import { IoMdOptions } from 'react-icons/io';

const tabCategory = [
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
  const { currentTab, setCurrentTab } = useTabStore();
  const { selectedItems } = useAreaFilterStore();

  /** 2023/07/11 - 카테고리 클릭 시 API 요청하는 함수 (무한스크롤) - by sineTlsl */
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    ['categories', currentTab],
    ({ pageParam = 1 }) => {
      let params: CategoriesRequest = {
        page: pageParam,
        size: 10,
      };
      if (currentTab !== '전체' && selectedItems.length >= 1) {
        const areas = selectedItems.join(',');

        params = {
          category: currentTab,
          ...params,
          areas,
        };
      } else if (currentTab === '전체' && selectedItems.length >= 1) {
        const areas = selectedItems.join(',');

        params = {
          ...params,
          areas,
        };
      } else if (currentTab !== '전체') {
        params = {
          category: currentTab,
          ...params,
        };
      }

      return getCatergories(params);
    },
    {
      getNextPageParam: lastPage => {
        const { page, totalPages } = lastPage.pageInfo;
        const nextPage = page < totalPages ? page + 1 : undefined;

        return nextPage;
      },
    },
  );

  /** 2023/07/11 - 사용자가 화면에 얼마나 보여야
   *  inView가 true가 바뀔지를 결정하는 옵션 - by sineTlsl */
  const { ref, inView } = useInView({
    threshold: 0,
  });

  // inView가 true가 될 때 새로운 페이지를 가져옴
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  /** 2023/07/04 - 카테고리 탭 select 함수 - by sineTlsl */
  const HandlerSelectTab = (tabName: string): void => {
    setCurrentTab(tabName);
  };

  return (
    <FestivalListContainer>
      <CatergoryTabNav tabCategory={tabCategory} currentTab={currentTab} onClick={HandlerSelectTab} />
      <FestivalFilter>
        <h2 className="festival-list-title">축제 리스트</h2>
        <div className="festival-list-filter">
          <button className="filter-btn">
            <Link className="link-wrap" to="/festival/area">
              {selectedItems.length !== 0 ? (
                <span>
                  {selectedItems.length < 2 ? selectedItems : `${selectedItems[0]} 외 ${selectedItems.length - 1} 곳`}
                </span>
              ) : (
                <span>지역필터 선택</span>
              )}
              <IoMdOptions size="20px" color="var(--color-main)" />
            </Link>
          </button>
        </div>
      </FestivalFilter>
      <FestivalScrollWrap>
        <ul>
          {data &&
            data.pages.map(page =>
              page.data.map(festival => (
                <li key={festival.festivalId}>
                  <Link to={`/detail/${festival.festivalId}`}>
                    <Festival item={festival} />
                  </Link>
                </li>
              )),
            )}
          <div ref={ref}>{isLoading && <h3>Loading ...</h3>}</div>
        </ul>
      </FestivalScrollWrap>
    </FestivalListContainer>
  );
};

export default FestivalListPage;

/** 2023/07/04 - 축제 리스트 컨테이너 - by sineTlsl */
const FestivalListContainer = styled.section`
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

const FestivalFilter = styled.div`
  height: 7rem;
  width: calc(100% - 4rem);
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 400px) {
    height: 5rem;
  }

  > .festival-list-title {
    color: var(--color-dark);
    font-size: 18px;
    font-weight: 700;
  }
  > .festival-list-filter > .filter-btn {
    font-size: 15px;
    font-weight: 500;
    border: none;
    background: none;
    color: var(--color-main);
    cursor: pointer;
  }
  > .festival-list-filter > .filter-btn > .link-wrap {
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }
`;

const FestivalScrollWrap = styled.div`
  height: calc(100% - 13rem);
  width: calc(100% - 4rem);
  overflow: auto;
  margin: 0 auto;

  // 스크롤바 없애기
  // chrome and safari
  ::-webkit-scrollbar {
    display: none;
  }
  // firefox
  scrollbar-width: none;

  @media screen and (max-width: 400px) {
    height: calc(100% - 11rem);
  }
`;
