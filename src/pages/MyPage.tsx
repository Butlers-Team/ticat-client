import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// icons
import { RxCounterClockwiseClock } from 'react-icons/rx';
import { BsTicketPerforated, BsPersonGear } from 'react-icons/bs';
import { GoCodeReview } from 'react-icons/go';

// components
import MyInfoDescription from '@components/myinfo/MyInfoDescription';
import MyInfoTabNav from '@components/myinfo/MyInfoTabNav';
import RecentList from '@components/myinfo/RecentList';
import { useExpStore } from '@store/useExpStore';
import { refreshApi } from '@api/auth';

// TabNav Data (label, icon)
const myInfoTabNav = [
  { label: '최근목록', icon: RxCounterClockwiseClock },
  { label: '티켓스탬프', icon: BsTicketPerforated },
  { label: '나의리뷰', icon: GoCodeReview },
  { label: '정보수정', icon: BsPersonGear },
];

/** 2023/07/21 - 마이 페이지 - by sineTlsl */
const MyPage = () => {
  const [currentTab, setCurrentTab] = useState<string>(myInfoTabNav[0].label);
  const navigate = useNavigate();

  /** 2023/08/02 - 토큰 만료 요청 TEST - by leekoby */
  /**
   * TODO: 현재 서버 시간에 문제가 있습니다. 서버에서 응답으로 오는 만료시간이 현재시간보다 9시간 정도 빨라요. 서버에 수정사항이 반영되기 전에 이 주석을 해제하시면 무한요청이 실행되면서 브라우저가 정지되고 서버터질 위험이 있습니다.
   
   async function handleExpCheck() {
    const currentDate = new Date();
    const currentDateNum = Math.floor(currentDate.getTime() / 1000);
    const expDataNum = useExpStore().exp;
    if (expDataNum && expDataNum <= currentDateNum) {
      const res = await refreshApi({});
      if (res.status === 200) console.log(res); //성공적으로 갱신되었을때 하고싶은거
      else navigate('/signin'); // 갱신 실패 로그인 페이지로
    }
  }
  handleExpCheck();
  
  */

  /** 2023/07/21 - tabNav를 선택하고 변경하는 함수 - by sineTlsl */
  const HandlerSelectTab = (tab: string) => {
    setCurrentTab(tab);

    if (tab === '티켓스탬프') {
      navigate('/stamp/list');
    }
  };

  return (
    <MyPageContainer>
      <MyInfoTopWrap>
        <MyInfoDescription />
        <MyInfoTabNav myInfoTabNav={myInfoTabNav} currentTab={currentTab} onSelectTab={HandlerSelectTab} />
      </MyInfoTopWrap>
      {currentTab === '최근목록' && <RecentList textTitle={currentTab} />}
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
