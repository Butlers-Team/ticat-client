import { useState } from 'react';
import styled from 'styled-components';

const tabList = [
  { idx: 0, name: '전체' },
  { idx: 1, name: '음악' },
  { idx: 2, name: '미술' },
  { idx: 3, name: '영화' },
  { idx: 4, name: '문화' },
  { idx: 5, name: '국제' },
  { idx: 6, name: '역사' },
  { idx: 7, name: '과학' },
  { idx: 8, name: '스포츠' },
  { idx: 9, name: '요리' },
  { idx: 10, name: '주류' },
  { idx: 11, name: '정원' },
  { idx: 12, name: '종교' },
  { idx: 13, name: '전통' },
  { idx: 14, name: '기타' },
];

const CatergoryTabNav = () => {
  const [currentTab, setCurrentTab] = useState(tabList[0].name);

  /** 2023/07/04 - 카테고리 탭 select 함수 - by sineTlsl */
  const HandlerSelectTab = (tabName: string): void => {
    setCurrentTab(tabName);
  };

  return (
    <CatergoryTabNavContainer>
      <ul>
        {tabList.map(tab => (
          <li
            key={tab.idx}
            className={currentTab === tab.name ? 'select-tab' : ''}
            onClick={() => HandlerSelectTab(tab.name)}>
            {tab.name}
          </li>
        ))}
      </ul>
    </CatergoryTabNavContainer>
  );
};

export default CatergoryTabNav;

/** 2023/07/04 - 축제 카테고리 TabNav - by sineTlsl */
const CatergoryTabNavContainer = styled.div`
  height: 6rem;
  width: 100%;
  display: flex;

  > ul {
    align-items: center;
    height: 100%;
    color: var(--color-dark);
    overflow-x: scroll;
    display: flex;
    justify-content: flex-start;
    gap: 2.4rem;
    padding: 0 2rem;
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
