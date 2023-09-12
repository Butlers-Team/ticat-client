import styled from 'styled-components';

// icons
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

interface StampDateProps {
  year: number;
  month: number;
  onLastMonth: () => void;
  onNextMonth: () => void;
  onCurrentMonth: () => void;
  canGoToLastMonth: boolean;
  canGoToNextMonth: boolean;
}

/**  2023/07/24 - 스탬프 리스트 날짜 컴포넌트 - by sineTlsl */
const StampDate = ({
  year,
  month,
  onLastMonth,
  onNextMonth,
  onCurrentMonth,
  canGoToLastMonth,
  canGoToNextMonth,
}: StampDateProps) => {
  return (
    <StampDateContainer>
      <button className="month-arrow" onClick={onLastMonth}>
        <BiChevronLeft size="30px" color={canGoToLastMonth ? '#878787' : '#dbdbdb'} />
      </button>
      <button className="current-date-btn" onClick={onCurrentMonth}>
        <p className="cal-month">
          {year}년 {month}월
        </p>
      </button>
      <button className="month-arrow" onClick={onNextMonth}>
        <BiChevronRight size="30px" color={canGoToNextMonth ? '#878787' : '#dbdbdb'} />
      </button>
    </StampDateContainer>
  );
};

export default StampDate;

const StampDateContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 2.5rem;
  justify-content: space-around;

  > button {
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
  }
  > .month-arrow {
    width: 30px;
  }
  > .current-date-btn {
    display: flex;
    width: calc;
  }
  > .current-date-btn > .cal-month {
    font-size: 16px;
    font-weight: 700;
    color: var(--color-dark);
  }
`;
