import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import Calendar from '@components/calendar/Calendar';

const CalendarPage: React.FC = (props): JSX.Element => {
  const now = new Date();
  const month = now.getMonth();
  const date = now.getDate();

  return (
    <CalendarContainer>
      <CalendarSection>
        <Calendar />
      </CalendarSection>
      <p className="today-date">
        <span>{month + 1}월</span> <span>{date}일</span> 축제리스트
      </p>
      <FestivalListSection>
        <EmptyListSection>
          <img src={'assets/images/ticat-logo-icon-gray.png'}></img>
          <span>추가된 축제 일정이 없어요.</span>
          <button className="add-calendar">일정 추가</button>
        </EmptyListSection>
      </FestivalListSection>
    </CalendarContainer>
  );
};
export default CalendarPage;
/** 2023/07/02 - 축제 캘린더 컨테이너  - by parksubeom */
const CalendarContainer = styled.div`
  position: relative;
  padding: 2rem 2rem;
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
  border: solid 1px red;
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
    color: var(--color-light-text);
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
  }
`;
