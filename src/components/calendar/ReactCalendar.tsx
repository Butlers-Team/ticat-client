import { color } from '@chakra-ui/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FcNext, FcPrevious } from 'react-icons/fc';

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
      const cellStyle = isCurrentDate ? { color: 'blue' } : {};

      calendar.push(
        <DateTh
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
    <div>
      <MonthSelect>{selecteMonth + 1}월</MonthSelect>
      <CalendarSection>
        <DateSelectBtn onClick={prevWeek}>
          <FcPrevious />
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

        <DateSelectBtn onClick={nextWeek}>
          <FcNext />
        </DateSelectBtn>
      </CalendarSection>
    </div>
  );
};

export default ReactCalendar;
const CalendarSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 20px;
`;

const MonthSelect = styled.h1`
  height: 30px;
  padding: 0 20px;
  font-size: 30px;
`;
const CalendarWeekTable = styled.table`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const CalendarWeekThead = styled.tbody`
  font-size: 18px;
  text-align: center;
`;
const CalendarWeekTr = styled.tr`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  > th {
    width: 30px;
    padding: 0 20px;
  }
`;

const CalendarDayTbody = styled.tbody`
  font-size: 18px;
  text-align: center;
`;
const CalendarDayTr = styled.tr`
  display: flex;
  flex-direction: row;
  > th {
    width: 30px;
    padding: 0 20px;
  }
`;

const DateSelectBtn = styled.button`
  border: none;
  font-size: 30px;
  font-weight: bold;
  background-color: transparent;
  cursor: pointer;
`;

const DateTh = styled.th`
  cursor: pointer;
`;

const SundayTh = styled.th`
  color: red;
`;
const SaturdayTh = styled.th`
  color: blue;
`;
