import { useState } from 'react';
import styled from 'styled-components';
import { getStampList } from '@api/stamp';
import { useQuery } from '@tanstack/react-query';
import { StampListRequest } from 'types/api/stamp';

// components
import TopHistoryBackNav from '@components/TopHistoryBackNav';
import StampDate from '@components/stamp/StampDate';
import StampTicket from '@components/stamp/StampTicket';
import StampCalendar from '@components/stamp/StampCalendar';
import StampToggle from '@components/stamp/StampToggle';

/**  2023/07/24 - 스탬프 리스트 페이지 - by sineTlsl */
const StampListPage = () => {
  // 현재 날짜를 기준으로 캘린더 정의
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const [year, setYear] = useState<number>(currentYear);
  const [month, setMonth] = useState<number>(currentMonth);

  const params: StampListRequest = {
    year,
    month,
  };

  const { data } = useQuery(['stampList', params], getStampList);
  const [isSelectTicket, setIsSelectTicket] = useState<boolean>(true);

  /** 2023/07/22 - 이전 페이지 이동 함수 - by sineTlsl */
  const goBackPage = () => {
    window.history.back();
  };

  /** 2023/07/01 - 토글 클릭 시 상태 전환 - by sineTlsl */
  const HandlerToggle = () => {
    setIsSelectTicket(!isSelectTicket);
  };

  /** 2023/07/24 - 이전 달로 이동 - by sineTlsl */
  const HandlerLastMonth = () => {
    setMonth(prev => {
      if (prev === 1) {
        setYear(year => year - 1); // 1월인 경우 연도 줄이기
        return 12;
      } else {
        return prev - 1; // 그 외에는 달 -1
      }
    });
  };
  /** 2023/07/24 - 다음 달로 이동 - by sineTlsl */
  const HandlerNextMonth = () => {
    if (year === currentYear && month === currentMonth) {
      return;
    }
    setMonth(prev => {
      if (prev === 12) {
        setYear(year => year + 1); // 12월인 경우 연도 늘리기
        return 1;
      } else {
        return prev + 1; // 그 외에는 달 + 1
      }
    });
  };
  /** 2023/07/24 - 현재 달(날짜)로 이동 - by sineTlsl */
  const HandlerCurrentMonth = () => {
    setYear(currentYear);
    setMonth(currentMonth);
  };

  return (
    <StampListContainer>
      <TopHistoryBackNav textTitle="티켓 스탬프" onNavigation={goBackPage} />
      <TopDescriptionWrap>
        <div className="stamp-img-bg">
          <div className="stamp-img-inner" />
        </div>
        <div className="stamp-description-text">
          <p>
            나의 <span className="bold-text">티캣</span>을
          </p>
          <p>확인하세요</p>
        </div>
      </TopDescriptionWrap>
      <StampItemsWrap>
        <StampDate
          year={year}
          month={month}
          onLastMonth={HandlerLastMonth}
          onNextMonth={HandlerNextMonth}
          onCurrentMonth={HandlerCurrentMonth}
        />
        {data && (isSelectTicket ? <StampTicket stampList={data.festivalList} /> : <StampCalendar />)}
        <div className="toggle-wrap">
          <StampToggle isSelectTicket={isSelectTicket} onClick={HandlerToggle} />
        </div>
      </StampItemsWrap>
    </StampListContainer>
  );
};

export default StampListPage;

/** 2023/06/30 - 스탬프 리스트 컨테이너 - by sineTlsl */
const StampListContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
`;

/** 2023/06/30 - 상단 이미지 및 소개 - by sineTlsl */
const TopDescriptionWrap = styled.div`
  position: absolute;
  overflow: hidden;
  display: flex;
  width: 100%;
  height: 200px;
  background: var(--color-main);

  // 이미지
  > .stamp-img-bg {
    position: absolute;
    right: -45px;
    top: -23px;
    width: 150px;
    height: 150px;
  }
  > .stamp-img-bg > .stamp-img-inner {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    filter: invert(100%);
    background-image: url('/assets/images/ticat-logo-icon-black.png');
    background-size: 100% 100%;
  }

  // 텍스트
  > .stamp-description-text {
    position: absolute;
    top: 50px;
    left: 30px;
    font-size: 30px;
    font-weight: 300;
    line-height: 1.2;
    color: var(--color-light);
  }
  > .stamp-description-text > p > .bold-text {
    font-weight: 700;
  }
`;

/** 2023/06/30 - 스탬프 리스트 - by sineTlsl */
const StampItemsWrap = styled.div`
  z-index: 1;
  top: 150px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: calc(100% - 200px);
  width: 100%;
  background: #fff;
  border-radius: 30px 30px 0px 0px;
  padding-bottom: 3rem;

  // 캘린더 년도, 월
  > .cal-date {
    display: flex;
    width: 100%;
    margin-top: 2.5rem;
    justify-content: space-around;
  }
  > .cal-date .cal-month {
    font-size: 16px;
    font-weight: 700;
    color: var(--color-dark);
  }
  > .cal-date button {
    border: none;
    background: none;
  }

  // toggle box
  > .toggle-wrap {
    position: absolute;
    bottom: 3rem;
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;
