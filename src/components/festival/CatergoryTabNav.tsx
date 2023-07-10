import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

interface TabCatergoryProps {
  tabCatergory: string[];
  currentTab: string;
  onClick: (tab: string) => void;
}

/** 2023/07/04 - 축제 카테고리 TabNav - by sineTlsl */
const CatergoryTabNav = ({ tabCatergory, currentTab, onClick }: TabCatergoryProps) => {
  const scrollRef = useRef<HTMLUListElement>(null); // 스크롤 가능한 요소 참조
  const [scrollPosition, setScrollPosition] = useState(0); // 스크롤의 현재 위치
  const [maxScrollLeft, setMaxScrollLeft] = useState(0); // 가능한 최대 위치

  useEffect(() => {
    /** 2023/07/08 - 스크롤이 이동할 때마다 현재 스크롤 위치를 계산하고 업데이트 하는 함수 - by sineTlsl */
    const onScroll = () => {
      if (scrollRef.current) {
        setScrollPosition(scrollRef.current.scrollLeft);
        setMaxScrollLeft(scrollRef.current.scrollWidth - scrollRef.current.clientWidth);
      }
    };
    scrollRef.current?.addEventListener('scroll', onScroll);

    return () => scrollRef.current?.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <CatergoryTabNavContainer>
      {scrollPosition > 0 && (
        <ArrowWrap>
          <MdArrowBackIosNew size="20px" color="var(--color-sub)" />
        </ArrowWrap>
      )}
      <ul ref={scrollRef}>
        {tabCatergory.map((tab, idx) => (
          <li key={idx} className={currentTab === tab ? 'select-tab' : ''} onClick={() => onClick(tab)}>
            {tab}
          </li>
        ))}
      </ul>
      <ArrowWrap>
        {scrollPosition < maxScrollLeft && <MdArrowForwardIos size="20px" color="var(--color-sub)" />}
      </ArrowWrap>
    </CatergoryTabNavContainer>
  );
};

export default CatergoryTabNav;

const CatergoryTabNavContainer = styled.div`
  height: 6rem;
  width: 100%;
  display: flex;
  gap: 0.3rem;
  align-items: center;
  border-bottom: 1px solid var(--color-light-gray);

  > ul {
    align-items: center;
    height: 100%;
    color: var(--color-dark);
    overflow-x: scroll;
    display: flex;
    justify-content: flex-start;
    gap: 2.4rem;
    cursor: pointer;

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
  }
  > ul > li.select-tab {
    color: var(--color-sub);
    font-weight: 700;
  }
`;

const ArrowWrap = styled.div`
  width: 3.5rem;
`;
