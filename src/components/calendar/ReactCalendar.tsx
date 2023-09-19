import { background, color } from '@chakra-ui/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md';
import { BiBorderRadius } from 'react-icons/bi';

interface CalendarProps {
  startDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  setSelectedYears: React.Dispatch<React.SetStateAction<number>>;
  selecteDate: number;
  selecteMonth: number;
}

const ReactCalendar: React.FC<CalendarProps> = ({
  startDate,
  setSelectedDate,
  setSelectedMonth,
  setSelectedYears,
  selecteDate,
  selecteMonth,
}) => {
  const [currentDate, setCurrentDate] = useState(startDate);

  const prevWeek = () => {
    setCurrentDate(prevDate => {
      const prevWeekDate = new Date(prevDate);
      prevWeekDate.setDate(prevWeekDate.getDate() - 7);
      setSelectedDate(prevWeekDate.getDate());
      setSelectedMonth(prevWeekDate.getMonth());
      setSelectedYears(prevWeekDate.getFullYear());
      return prevWeekDate;
    });
  };

  const nextWeek = () => {
    setCurrentDate(prevDate => {
      const nextWeekDate = new Date(prevDate);
      nextWeekDate.setDate(nextWeekDate.getDate() + 7);
      setSelectedDate(nextWeekDate.getDate());
      setSelectedMonth(nextWeekDate.getMonth());
      setSelectedYears(nextWeekDate.getFullYear());
      return nextWeekDate;
    });
  };

  const selectDay = (date: number, month: number, year: number) => {
    setCurrentDate(prevDate => {
      const nextWeekDate = new Date(prevDate);
      nextWeekDate.setDate(date);
      setSelectedDate(date);
      setSelectedMonth(month);
      setSelectedYears(year);
      return nextWeekDate;
    });
  };

  // 날짜 배열 생성 (일요일부터 토요일까지)
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  // 캘린더의 렌더링 로직
  const renderCalendar = (selecteDate: number) => {
    const weekStart = new Date(currentDate);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());

    const calendar = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);

      // 현재 날짜와 selectDate를 비교하여 스타일을 변경합니다.
      const isCurrentDate = date.getDate() === selecteDate;

      // 스타일을 파란색으로 변경합니다.
      const cellStyle = isCurrentDate
        ? { color: 'var(--color-main)', background: '#E4F4FF', borderRadius: '20px' }
        : {};

      calendar.push(
        <DateTh
          className="flex-all-center"
          key={i}
          style={cellStyle}
          onClick={() => selectDay(date.getDate(), date.getMonth(), date.getFullYear())}>
          {date.getDate()}
        </DateTh>,
      );
    }
    return calendar;
  };

  return (
    <CalendarBox>
      <MonthSelect>
        {selecteMonth + 1}월 <MdKeyboardArrowDown className="arr-icons-color2" />
      </MonthSelect>
      <CalendarSection>
        <DateSelectBtn onClick={prevWeek} className="arr-icons-color">
          <MdKeyboardArrowLeft />
        </DateSelectBtn>

        <CalendarWeekTable>
          <CalendarWeekThead>
            <CalendarWeekTr>
              {weekdays.map(day => {
                if (day === '일') {
                  return <SundayTh key={day}>{day}</SundayTh>;
                } else if (day === '토') {
                  return <SaturdayTh key={day}>{day}</SaturdayTh>;
                } else {
                  return <th key={day}>{day}</th>;
                }
              })}
            </CalendarWeekTr>
          </CalendarWeekThead>
          <CalendarDayTbody>
            <CalendarDayTr>{renderCalendar(selecteDate)}</CalendarDayTr>
          </CalendarDayTbody>
        </CalendarWeekTable>

        <DateSelectBtn onClick={nextWeek} className="arr-icons-color">
          <MdKeyboardArrowRight />
        </DateSelectBtn>
      </CalendarSection>
    </CalendarBox>
  );
};

export default ReactCalendar;

const CalendarBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 25%;
  box-shadow: 0px 10px 15px rgb(0, 0, 0, 0.1);
  border-radius: 35px;
  padding: 20px 0px;
  color: var(--color-dark);
  .arr-icons-color {
    color: #999;
  }

  .arr-icons-color2 {
    color: #999;
    font-size: 2rem;
  }
`;

//달력 날짜 및 주간표기
const CalendarSection = styled.div`
  display: flex;
  width: calc(100% - 20px);
  text-align: right;

  margin-bottom: 10px;
`;

// 달력 월별 표기
const MonthSelect = styled.h1`
  width: calc(100% - 40px);
  margin: 10px;
  padding: 0px 0px 0px 10px;
  font-size: 3rem;
  text-align: left;
`;
//요일 및 날짜 전체 컴포넌트 -mscojl24
const CalendarWeekTable = styled.table`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

// 달력 요일 표기 - mscojl24
const CalendarWeekThead = styled.tbody`
  width: 100%;
  text-align: center;
`;
const CalendarWeekTr = styled.tr`
  display: flex;
  justify-content: space-around;
  font-weight: 700;
  width: 100%;
  flex-direction: row;
  font-size: 1.5rem;
  > th {
    width: 35px;
  }
`;

// 달력 날짜 표기 - mscojl24
const CalendarDayTbody = styled.tbody`
  width: 100%;
  font-size: 1.5rem;
  text-align: center;
  color: var(--color-dark-gray);
`;
const CalendarDayTr = styled.tr`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  > th {
    width: 35px;
    height: 35px;
  }
`;

// 날짜 주간 변경 버튼 - mscojl24
const DateSelectBtn = styled.button`
  border: none;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-dark-gray);
  background-color: transparent;
  cursor: pointer;
`;

const DateTh = styled.th`
  cursor: pointer;
`;

//토요일 색상
const SundayTh = styled.th`
  color: #ff5454;
`;

//일요일 색상
const SaturdayTh = styled.th`
  color: var(--color-main);
`;
