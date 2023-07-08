import { useState } from 'react';
import styled from 'styled-components';

interface TabCatergoryProps {
  tabCatergory: string[];
  currentTab: string;
  onClick: (tab: string) => void;
}

/** 2023/07/04 - 축제 카테고리 TabNav - by sineTlsl */
const CatergoryTabNav = ({ tabCatergory, currentTab, onClick }: TabCatergoryProps) => {
  return (
    <CatergoryTabNavContainer>
      <ul>
        {tabCatergory.map((tab, idx) => (
          <li key={idx} className={currentTab === tab ? 'select-tab' : ''} onClick={() => onClick(tab)}>
            {tab}
          </li>
        ))}
      </ul>
    </CatergoryTabNavContainer>
  );
};

export default CatergoryTabNav;

const CatergoryTabNavContainer = styled.div`
  height: 6rem;
  width: 100%;
  display: flex;
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
