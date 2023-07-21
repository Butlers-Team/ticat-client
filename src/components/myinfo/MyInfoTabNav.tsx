import { useState } from 'react';
import styled from 'styled-components';

// icons
import { RxCounterClockwiseClock } from 'react-icons/rx';
import { BsTicketPerforated, BsPersonGear } from 'react-icons/bs';
import { GoCodeReview } from 'react-icons/go';

// tabItem Props
interface TabItemProps {
  IconComponent: React.ComponentType<any>;
  label: string;
  isCurrentTab: boolean;
  onClick: () => void;
}

// TabNav Data (label, icon)
const MypageTabNav = [
  { label: '최근목록', icon: RxCounterClockwiseClock },
  { label: '티켓스탬프', icon: BsTicketPerforated },
  { label: '나의리뷰', icon: GoCodeReview },
  { label: '정보수정', icon: BsPersonGear },
];

/** 2023/07/21 - 하나의 탭메뉴 아이템을 생성하는 컴포넌트 - by sineTlsl */
const TabItem = ({ IconComponent, label, isCurrentTab, onClick }: TabItemProps) => {
  return (
    <TabNavWrap onClick={onClick}>
      <IconComponent size="25px" color={isCurrentTab ? 'var(--color-main)' : 'var(--color-dark)'} />
      <label className={isCurrentTab ? 'select-tab' : ''}>{label}</label>
    </TabNavWrap>
  );
};

/** 2023/07/21 - 마이페이지 navBar 컴포넌트 - by sineTlsl */
const MyInfoTabNav = () => {
  const [currentTab, setCurrentTab] = useState<string>(MypageTabNav[0].label);

  /** 2023/07/21 - tabNav를 선택하고 변경하는 함수 - by sineTlsl */
  const HandlerSelectTab = (tab: string) => {
    setCurrentTab(tab);
    console.log(currentTab);
  };

  return (
    <MyInfoTabNavContainer>
      {MypageTabNav.map((item, idx) => (
        <TabItem
          key={idx}
          IconComponent={item.icon}
          label={item.label}
          isCurrentTab={currentTab === item.label}
          onClick={() => HandlerSelectTab(item.label)}
        />
      ))}
    </MyInfoTabNavContainer>
  );
};

export default MyInfoTabNav;

// tabNav 컨테이너
const MyInfoTabNavContainer = styled.div`
  display: flex;
  height: 90px;
  width: 100%;
`;

// 각 요소 박스
const TabNavWrap = styled.div`
  flex: 0 1 calc(100% / 4);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: var(--color-dark);
  gap: 0.3rem;
  border-right: 1px solid var(--color-light-gray);
  cursor: pointer;

  &:last-child {
    border-right: none;
  }
  > .select-tab {
    color: var(--color-main);
  }
`;
