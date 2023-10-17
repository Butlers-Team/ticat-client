import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '@api/myinfo';

// icons
import { RxCounterClockwiseClock } from 'react-icons/rx';
import { BsTicketPerforated, BsPersonGear } from 'react-icons/bs';
import { GoCodeReview } from 'react-icons/go';

// components
import MyInfoDescription from '@components/myinfo/MyInfoDescription';
import MyInfoTabNav from '@components/myinfo/MyInfoTabNav';
import RecentList from '@components/myinfo/RecentList';
import MyReview from '@components/post/reviews/MyReview';

// TabNav Data (label, icon)
const myInfoTabNav = [
  { label: '최근목록', icon: RxCounterClockwiseClock },
  { label: '티켓스탬프', icon: BsTicketPerforated },
  { label: '나의리뷰', icon: GoCodeReview },
  { label: '정보수정', icon: BsPersonGear },
];

/** 2023/07/21 - 마이 페이지 - by sineTlsl */
const MyPage = () => {
  const { data } = useQuery(['userInfo'], getMyInfo);
  const [currentTab, setCurrentTab] = useState<string>(myInfoTabNav[0].label);
  const navigate = useNavigate();

  /** 2023/07/21 - tabNav를 선택하고 변경하는 함수 - by sineTlsl */
  const handlerSelectTab = (tab: string) => {
    setCurrentTab(tab);

    if (tab === '티켓스탬프') {
      navigate('/stamp/list');
    } else if (tab === '정보수정') {
      navigate('/profile', {
        state: { data },
      });
    }
  };

  return (
    <MyPageContainer>
      <MyInfoTopWrap>
        {data && <MyInfoDescription memberInfo={data} />}
        <MyInfoTabNav myInfoTabNav={myInfoTabNav} currentTab={currentTab} onSelectTab={handlerSelectTab} />
      </MyInfoTopWrap>
      {currentTab === '최근목록' && <RecentList textTitle={currentTab} />}
      {currentTab === '나의리뷰' && <MyReview textTitle={currentTab} />}
    </MyPageContainer>
  );
};

export default MyPage;

// 마이페이지 컨테이너
const MyPageContainer = styled.section`
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

const MyInfoTopWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 100%;
  border-bottom: 1px solid var(--color-light-gray);
`;
