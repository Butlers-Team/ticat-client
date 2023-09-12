import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useCategoryTabStore } from '@store/useCategoryTabStore';

import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

/** 2023/07/04 - 축제 카테고리 TabNav - by sineTlsl */
const CategoryTabNav = () => {
  const { categoryTab, setCategoryTab, categoriesTab } = useCategoryTabStore();
  const scrollRef = useRef<HTMLUListElement>(null); // 스크롤 가능한 요소 참조
  const scrollAmount = 100; // 한 번에 스크롤할 양
  const [scrollPosition, setScrollPosition] = useState(0); // 스크롤의 현재 위치
  const [maxScrollLeft, setMaxScrollLeft] = useState(0); // 가능한 최대 위치

  /** 2023/07/04 - 카테고리 탭 select 함수 - by sineTlsl */
  const handlerSelectTab = (tabName: string): void => {
    setCategoryTab(tabName);
  };

  /** 2023/07/11 - left 화살표 클릭 시 왼쪽 스크롤 함수 - by sineTlsl */
  const handlerScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= scrollAmount;
    }
  };
  /** 2023/07/11 - right 화살표 클릭 시 오른쪽 스크롤 함수 - by sineTlsl */
  const handlerScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollAmount;
    }
  };

  /** 2023/07/11 - 컴포넌트가 마운트 or 언마운트 되었을 때, 스크롤 이벤트 리스너 추가 및 제거하는 함수 - by sineTlsl */
  useEffect(() => {
    const onScroll = () => {
      if (scrollRef.current) {
        setScrollPosition(scrollRef.current.scrollLeft);
      }
    };
    scrollRef.current?.addEventListener('scroll', onScroll);

    return () => scrollRef.current?.removeEventListener('scroll', onScroll);
  }, []);

  /** 2023/07/08 - 스크롤이 이동할 때마다 현재 스크롤 위치를 계산하고 업데이트 하는 함수 - by sineTlsl */
  useEffect(() => {
    if (scrollRef.current) {
      setMaxScrollLeft(scrollRef.current.scrollWidth - scrollRef.current.clientWidth);
    }
  }, [categoriesTab]); // 탭 카테고리가 변경될 때마다 maxScrollLeft 업데이트

  /** 2023/08/29 - 메인에서 카테고리 아이콘 클릭 시 tabNav 스크롤 위치 조정 - by sineTlsl */
  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      const selectedTab = scrollRef.current.querySelector('.select-tab') as HTMLElement;
      if (selectedTab) {
        const centerPosition = selectedTab.offsetLeft - scrollRef.current.clientWidth / 2 + selectedTab.offsetWidth / 2;

        scrollRef.current.scrollLeft = centerPosition;
      }
    }
  }, [categoryTab]);

  return (
    <CategoryTabNavContainer>
      {scrollPosition > 0 && (
        <ArrowWrap onClick={handlerScrollLeft}>
          <MdArrowBackIosNew size="20px" color="var(--color-sub)" />
        </ArrowWrap>
      )}
      <ul ref={scrollRef}>
        {categoriesTab.map((tab, idx) => (
          <li key={idx} className={categoryTab === tab ? 'select-tab' : ''} onClick={() => handlerSelectTab(tab)}>
            {tab}
          </li>
        ))}
      </ul>
      <ArrowWrap onClick={handlerScrollRight}>
        {scrollPosition < maxScrollLeft && <MdArrowForwardIos size="20px" color="var(--color-sub)" />}
      </ArrowWrap>
    </CategoryTabNavContainer>
  );
};

export default CategoryTabNav;

const CategoryTabNavContainer = styled.div`
  height: 6rem;
  display: flex;
  padding: 0 2rem;
  width: 100%;
  gap: 0.3rem;
  align-items: center;
  border-bottom: 1px solid var(--color-light-gray);

  > ul {
    align-items: center;
    height: 100%;
    color: var(--color-dark);
    overflow: auto;
    display: flex;
    justify-content: flex-start;
    gap: 2.4rem;

    // 스크롤바 없애기
    // chrome and safari
    ::-webkit-scrollbar {
      display: none;
    }
    // firefox
    scrollbar-width: none;
  }
  > ul > li {
    white-space: nowrap;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    cursor: pointer;
  }
  > ul > li.select-tab {
    color: var(--color-sub);
    font-weight: 700;
  }
`;

const ArrowWrap = styled.div`
  width: 3.5rem;
  cursor: pointer;
`;
