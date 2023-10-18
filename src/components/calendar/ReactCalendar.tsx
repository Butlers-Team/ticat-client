// import { background, color } from '@chakra-ui/react';

import React, { useState } from 'react';
import styled from 'styled-components';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardArrowDown,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { BiBorderRadius } from 'react-icons/bi';

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
        if (prevWeekDate.getMonth() === 0) {
          // 0으로 변경
          setSelectedYears(prevWeekDate.getFullYear() - 1); // 1을 빼서 이전 연도로 변경
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
      } else if (selecteDate > 22 && date < 6 && selecteDate - date > 6) {
        //  현재날짜가 22일보다 크고, 클릭한 날짜가 6보다 작을 떄 (현재달의 후반과 이전달의 초반부가 보이는 캘린더)
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

    // 변경된 월의 마지막 날짜를 구합니다.
    const lastDayOfNewMonth = new Date(newYear, newMonth + 1, 0).getDate();

    let newDate = selecteDate;

    // 선택된 날짜가 변경된 월의 마지막 날짜보다 큰 경우, 가장 가까운 유효한 날짜로 변경합니다.
    if (newDate > lastDayOfNewMonth) {
      newDate = lastDayOfNewMonth;
    }

    // 변경된 월로 날짜 객체를 업데이트합니다.
    const adjustedStartDate = new Date(currentDate);
    adjustedStartDate.setMonth(newMonth); // 변경된 월로 설정
    adjustedStartDate.setFullYear(newYear); // 변경된 연도로 설정

    // 선택된 날짜를 업데이트합니다.
    adjustedStartDate.setDate(newDate);

    // state를 업데이트합니다.
    setSelectedDate(newDate);
    setSelectedMonth(newMonth);
    setSelectedYears(newYear);
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
      const cellStyle = isCurrentDate
        ? { color: 'var(--color-main)', background: '#E4F4FF', borderRadius: '20px' }
        : {};

      calendar.push(
        <DateTh key={i} style={cellStyle} onClick={() => selectDay(date.getDate())} className="date-hover-color">
          {`${date.getDate()}`} {/* 날짜와 요일 출력 */}
        </DateTh>,
      );
    }
    return calendar;
  };

  return (
    <Calendar>
      <MonthSelect>
        <MonthChangeButton onClick={() => changeMonth(selecteMonth - 1)}>
          <MdOutlineKeyboardDoubleArrowLeft />
        </MonthChangeButton>
        {selecteMonth + 1}월
        <MonthChangeButton onClick={() => changeMonth(selecteMonth + 1)}>
          <MdOutlineKeyboardDoubleArrowRight />
        </MonthChangeButton>
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
    </Calendar>
  );
};
export default ReactCalendar;

const Calendar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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

  .date-hover-color:hover {
    border-radius: 50px;
    background-color: #f7f7f7;
  }
`;

//달력 날짜 및 주간표기
const CalendarSection = styled.div`
  display: flex;
  width: calc(100% - 20px);
  text-align: right;
  margin-bottom: 10px;
`;

// 달력 월 표기
const MonthSelect = styled.div`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  letter-spacing: -1px;
`;

// 달력 월간 변경 버튼
const MonthChangeButton = styled.button`
  border: none;
  font-size: 3rem;
  font-weight: bold;
  background-color: transparent;
  cursor: pointer;
  border-radius: 100px;
  margin: 0px 10px;
  transform: scale(0.5);
  color: #999;
`;

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
  font-size: 14px;
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
  @media (max-width: 350px) {
    > th {
      width: 25px;
    }
  }
`;

// 달력 날짜 표기 - mscojl24
const CalendarDayTbody = styled.tbody`
  width: 100%;
  font-size: 1.5rem;
  text-align: center;
  color: var(--color-dark-gray);

  @media (max-width: 350px) {
    font-size: 1.3rem;
  }
`;

const CalendarDayTr = styled.tr`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  > th {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
  }

  @media (max-width: 350px) {
    > th {
      width: 25px;
      height: 25px;
    }
  }
`;

// 날짜 주간 변경 버튼 - mscojl24
const DateSelectBtn = styled.button`
  border: none;
  font-size: 2.5rem;
  font-weight: 800;
  background-color: transparent;
  cursor: pointer;
`;

const DateTh = styled.th`
  cursor: pointer;
  .date-hover-color {
  }
  :hover {
    border: 1px solid red;
    background-color: #efefef;
  }
`;

//토요일 색상
const SundayTh = styled.th`
  color: #ff5454;
`;

//일요일 색상
const SaturdayTh = styled.th`
  color: var(--color-main);
`;
