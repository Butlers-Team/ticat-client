import styled from 'styled-components';
import { useState } from 'react';
import ReactCalendar from '@components/calendar/ReactCalendar';

import { CalendarListListType, CalendarListRequest } from 'types/api/calendar';
import { getCalendarList } from '@api/calendar';

const CalendarPage: React.FC = (props): JSX.Element => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();
  const [selecteDate, setSelectedDate] = useState<number>(date);
  const [selecteMonth, setSelectedMonth] = useState<number>(month);
  const [selecteYears, setSelectedYears] = useState<number>(year);
  /** 2023/08/20 - 캘린더 페이지 진입 시, 해당 날짜의 등록된 스케쥴 리스트 불러오는 함수 - parksubeom */
  const fetchCalendarList = async () => {
    const params: CalendarListRequest = {
      page: 1,
      year: selecteYears,
      mouth: selecteMonth,
      day: selecteDate,
    };
  };
  /** 2023/08/20 - 등록된 일정이 없다면 축제목록으로 경로이동시켜준다. - parksubeom */
  const addSchedule = () => {
    window.location.href = '/festival';
  };

  return (
    <CalendarContainer>
      <CalendarSection>
        <ReactCalendar
          startDate={new Date()}
          setSelectedYears={setSelectedYears}
          setSelectedDate={setSelectedDate}
          setSelectedMonth={setSelectedMonth}
        />
      </CalendarSection>
      <p className="today-date">
        <span>{selecteYears}년</span> <span>{selecteMonth + 1}월</span> <span>{selecteDate}일</span> 축제리스트
      </p>
      <FestivalListSection>
        <EmptyListSection>
          <img src={'assets/images/ticat-logo-icon-gray.png'}></img>
          <span>추가된 축제 일정이 없어요.</span>
          <button className="add-calendar" onClick={addSchedule}>
            일정 추가
          </button>
        </EmptyListSection>
      </FestivalListSection>
    </CalendarContainer>
  );
};
export default CalendarPage;
/** 2023/07/02 - 축제 캘린더 컨테이너  - by parksubeom */
const CalendarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  .today-date {
    font-size: 16px;
    margin: 2rem 2rem;
    > span {
      font-weight: bold;
    }
  }
`;
/** 2023/07/02 - 축제 캘린더 섹션  - by parksubeom */
const CalendarSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 25%;
  box-shadow: 4px 10px 15px -10px gray;
  border-radius: 35px;
  text-align: center;
  justify-content: center;
`;
/** 2023/07/02 - 축제 리스트 섹션  - by parksubeom */
const FestivalListSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 75%;
  overflow: hidden;
`;
/** 2023/07/02 - 추가된 축제리스트가 없을 때 보여지는 섹션  - by parksubeom */
const EmptyListSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    width: 10.8rem;
    height: 10.8rem;
    opacity: 20%;
  }
  > span {
    font-size: 16px;
    color: var(--color-light-gray);
    font-weight: bold;
    margin: 1rem;
  }
  > .add-calendar {
    width: 10.8rem;
    height: 3rem;
    border-radius: 10px;
    font-weight: bold;
    color: var(--color-sub);
    border-color: var(--color-sub);
    background-color: var(--background-color);
    margin-top: 1rem;
    &:hover {
      background-color: #b2d9fa;
      color: var(--color-light);
    }
  }
`;
