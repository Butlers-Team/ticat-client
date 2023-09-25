import styled from 'styled-components';
import { StampType } from 'types/api/stamp';

interface StampCalendarProps {
  year: number;
  month: number;
  stampList: StampType[];
}

/** 2023/09/21 - 티캣 스템프 캘린더 컴포넌트 - by sineTlsl */
const StampCalendar = ({ year, month, stampList }: StampCalendarProps) => {
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const daysInMonth = new Date(year, month, 0).getDate(); // 해당 월의 마지막 날짜
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // 해당 월의 첫 날의 요일

  const calendarDays = [];

  const stampedDatesSet = new Set(stampList.map(({ stampDate }) => new Date(stampDate).getDate()));

  /** 2023/09/21 - 첫 주의 이전 달 날짜 추가 - by sineTlsl */
  const lastDayOfLastMonth = new Date(year, month - 1, 0).getDate();
  for (let i = 0; i < firstDayOfMonth; i++) {
    const day = lastDayOfLastMonth - firstDayOfMonth + i + 1;
    calendarDays.unshift(
      <Day key={`prev-${day}`} $isOtherMonth>
        {day}
      </Day>,
    );
  }

  /** 2023/09/21 - 현재 달의 날짜 추가 - by sineTlsl */
  for (let i = 1; i <= daysInMonth; i++) {
    const isStamped = stampedDatesSet.has(i);
    const dayOfWeek = (firstDayOfMonth + i - 1) % 7;
    const isSat = dayOfWeek === 6; // 6: 토요일
    const isSun = dayOfWeek === 0; // 0: 일요일

    calendarDays.push(
      <Day key={i} $isStamped={isStamped} $isSat={isSat} $isSun={isSun}>
        {i}
      </Day>,
    );
  }

  /** 2023/09/21 - 마지막 주의 다음 달 날짜 추가 - by sineTlsl */
  let nextMonthDay = 1;

  while (calendarDays.length % 7 !== 0) {
    calendarDays.push(
      <Day key={`next-${nextMonthDay}`} $isOtherMonth>
        {nextMonthDay}
      </Day>,
    );
    nextMonthDay += 1;
  }

  return (
    <CalendarContainer>
      <WeekdayGrid>
        {weekdays.map((day, idx) => (
          <Weekday key={idx} $isSat={idx === 6} $isSun={idx === 0}>
            {day}
          </Weekday>
        ))}
      </WeekdayGrid>
      <CalendarGrid>{calendarDays}</CalendarGrid>
    </CalendarContainer>
  );
};

export default StampCalendar;

const CalendarContainer = styled.div`
  width: calc(100% - 4rem);
  height: 100%;
`;

const WeekdayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin: 2rem 0 1rem 0;
  text-align: center;
`;

const Weekday = styled.div<{ $isSat?: boolean; $isSun?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: ${props => (props.$isSat ? 'var(--color-main)' : props.$isSun ? '#C72118' : 'var(--color-dark)')};
  font-weight: 700;
  padding-bottom: 1rem;
`;

const CalendarGrid = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  max-height: 230px;
  height: 100%;
  grid-template-columns: repeat(7, 1fr); // 7일, 일주일
`;

const Day = styled.div<{ $isOtherMonth?: boolean; $isStamped?: boolean; $isSat?: boolean; $isSun?: boolean }>`
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  background: ${props => (props.$isStamped ? 'var(--color-main)' : 'transparent')};
  color: ${props =>
    props.$isStamped
      ? 'var(--color-light)'
      : props.$isSat
      ? 'var(--color-main)'
      : props.$isSun
      ? '#C72118'
      : props.$isOtherMonth
      ? 'var(--color-light-gray)'
      : 'var(--color-dark)'};
  font-weight: 500;
  border-radius: 50%;
  font-size: 14px;
`;
