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
  selectYears: number;
}

const ReactCalendar: React.FC<CalendarProps> = ({
  startDate,
  setSelectedDate,
  setSelectedMonth,
  setSelectedYears,
  selecteDate,
  selecteMonth,
  selectYears,
}) => {
  const [currentDate, setCurrentDate] = useState(startDate);

  const prevWeek = () => {
    setCurrentDate(prevDate => {
      const prevWeekDate = new Date(prevDate);
      prevWeekDate.setDate(prevWeekDate.getDate() - 7);

      if (prevWeekDate.getMonth() !== selecteMonth) {
        setSelectedMonth(prevWeekDate.getMonth());
        if (prevWeekDate.getMonth() === 11) {
          setSelectedYears(prevWeekDate.getFullYear());
        }
      }

      // 날짜가 1일 이전으로 넘어갈 경우, 이전 달의 마지막 날짜로 설정합니다.
      if (prevWeekDate.getDate() === 31 && selecteDate === 1) {
        const lastDayOfMonth = new Date(prevWeekDate.getFullYear(), prevWeekDate.getMonth(), 0);
        setSelectedDate(lastDayOfMonth.getDate());
      } else {
        setSelectedDate(prevWeekDate.getDate());
      }

      return prevWeekDate;
    });
  };

  const nextWeek = () => {
    setCurrentDate(prevDate => {
      const nextWeekDate = new Date(prevDate);
      nextWeekDate.setDate(nextWeekDate.getDate() + 7);

      if (nextWeekDate.getMonth() !== selecteMonth) {
        setSelectedMonth(nextWeekDate.getMonth());
        if (nextWeekDate.getMonth() === 0) {
          setSelectedYears(nextWeekDate.getFullYear());
        }
      }
      // 날짜가 다음 달로 넘어갈 경우, 다음 달의 1일로 설정합니다.
      if (nextWeekDate.getDate() === 1 && selecteDate === 31) {
        setSelectedDate(selecteDate);
      } else {
        setSelectedDate(nextWeekDate.getDate());
      }

      return nextWeekDate;
    });
  };
  const selectDay = (date: number) => {
    setCurrentDate(prevDate => {
      const nextWeekDate = new Date(prevDate);
      nextWeekDate.setDate(date);

      if (selecteDate < 6 && date > 21) {
        // 현재날짜가 6일보다 작고, 클릭한 날짜가 21보다 클 떄 (현재달의 초반과 이전달의 후반부가 보이는 캘린더)
        if (selecteMonth === 0) {
          // 현재 월이 1월인 경우
          setSelectedYears(selectYears - 1); // 이전 연도로 변경
          setSelectedMonth(11); // 12월로 변경
        } else {
          setSelectedMonth(selecteMonth - 1); // 이전 달로 변경
        }
      } else if (selecteDate > 22 && date < 6) {
        //  현재날짜가 22일보다 크고, 클릭한 날짜가 6보다 클 떄 (현재달의 후반과 이전달의 초반부가 보이는 캘린더)
        if (selecteMonth === 11) {
          // 현재 월이 12월인 경우
          setSelectedYears(selectYears + 1); // 다음 연도로 변경
          setSelectedMonth(0); // 1월로 변경
        } else {
          setSelectedMonth(selecteMonth + 1); // 다음 달로 변경
        }
      }

      setSelectedDate(date);
      return nextWeekDate;
    });
  };

  const changeMonth = (newMonth: number) => {
    let newYear = selectYears;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    // 변경된 월의 첫 날짜와 해당 월의 첫 요일을 구합니다.
    const firstDayOfNewMonth = new Date(newYear, newMonth, 1);
    const firstDayOfWeek = firstDayOfNewMonth.getDay();

    // 변경된 월의 마지막 날짜를 구합니다.
    const lastDayOfCurrentMonth = new Date(selectYears, selecteMonth + 1, 0).getDate();

    // 변경된 월의 마지막 날짜를 구합니다.
    const lastDayOfNewMonth = new Date(newYear, newMonth + 1, 0).getDate();

    // 현재 날짜가 현재 월의 마지막 날짜인 경우에만 변경
    if (selecteDate === lastDayOfCurrentMonth) {
      setSelectedDate(lastDayOfNewMonth);
    } else if (selecteDate < firstDayOfWeek) {
      setSelectedDate(firstDayOfWeek + 1); // 변경된 월의 첫 날짜로 설정
    }
    setSelectedDate(1);
    setSelectedMonth(newMonth);
    setSelectedYears(newYear);

    // 첫 요일에 맞게 날짜를 조정
    const adjustedStartDate = new Date(currentDate);
    adjustedStartDate.setDate(1); // 1일로 설정
    adjustedStartDate.setMonth(newMonth); // 변경된 월로 설정
    adjustedStartDate.setFullYear(newYear); // 변경된 연도로 설정

    // 첫 요일까지 날짜를 조정
    adjustedStartDate.setDate(adjustedStartDate.getDate() - firstDayOfWeek);

    setCurrentDate(adjustedStartDate);
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

      // 현재 날짜와 selectDate를 비교하여 스타일을 변경.
      const isCurrentDate = date.getDate() === selecteDate;

      // 스타일을 파란색으로 변경합니다.
      const cellStyle = isCurrentDate ? { color: 'blue' } : {};

      calendar.push(
        <DateTh key={i} style={cellStyle} onClick={() => selectDay(date.getDate())}>
          {`${date.getDate()}`} {/* 날짜와 요일 출력 */}
        </DateTh>,
      );
    }
    return calendar;
  };

  return (
    <div>
      <MonthSelect>
        <MonthChangeButton onClick={() => changeMonth(selecteMonth - 1)}>
          <FcPrevious />
        </MonthChangeButton>
        {selecteMonth + 1}월
        <MonthChangeButton onClick={() => changeMonth(selecteMonth + 1)}>
          <FcNext />
        </MonthChangeButton>
      </MonthSelect>
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

const MonthChangeButton = styled.button`
  border: none;
  font-size: 30px;
  font-weight: bold;
  background-color: transparent;
  cursor: pointer;
`;
const CalendarWeekTable = styled.table`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const CalendarWeekThead = styled.tbody`
  font-size: 14px;
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
  font-size: 14px;
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
