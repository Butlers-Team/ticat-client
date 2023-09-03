import React, { useState } from 'react';
import styled from 'styled-components';

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
  const prevDay = () => {
    setCurrentDate(prevDate => {
      const prevWeekDate = new Date(prevDate);
      prevWeekDate.setDate(prevWeekDate.getDate() - 1);
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
  const nextDay = () => {
    setCurrentDate(prevDate => {
      const nextWeekDate = new Date(prevDate);
      nextWeekDate.setDate(nextWeekDate.getDate() + 1);
      setSelectedDate(nextWeekDate.getDate());
      setSelectedMonth(nextWeekDate.getMonth());
      setSelectedYears(nextWeekDate.getFullYear());
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
        <th key={i} style={cellStyle}>
          {date.getDate()}
        </th>,
      );
    }
    return calendar;
  };

  return (
    <div>
      <MonthSelect>{selecteMonth + 1}월</MonthSelect>
      <CalendarSection>
        <button onClick={prevWeek}>이전 주</button>
        <button onClick={prevDay}>이전 날</button>
        <CalendarWeekTable>
          <CalendarWeekThead>
            <CalendarWeekTr>
              {weekdays.map(day => (
                <th key={day}>{day}</th>
              ))}
            </CalendarWeekTr>
          </CalendarWeekThead>
          <CalendarDayTbody>
            <CalendarDayTr>{renderCalendar(selecteDate)}</CalendarDayTr>
          </CalendarDayTbody>
        </CalendarWeekTable>
        <button onClick={nextDay}>다음 날</button>
        <button onClick={nextWeek}>다음 주</button>
      </CalendarSection>
    </div>
  );
};

export default ReactCalendar;
const CalendarSection = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
`;

const MonthSelect = styled.h1`
  width: 200px;
  left: 0;
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
