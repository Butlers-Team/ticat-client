import { useMemberStore } from '@store/useMemberStore';
import React, { useState } from 'react';
import { ko } from 'date-fns/locale';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import Button from '@components/Button';
import { addCalendarRequest } from '@api/calendar';
import { CalendarAddRequest } from 'types/api/addcalendar';

interface AddCalendarProps {
  setDateForm: React.Dispatch<React.SetStateAction<boolean>>;
  festivalId: number;
  startdate: string;
  enddate: string;
}

const AddCalendar: React.FC<AddCalendarProps> = ({ setDateForm, festivalId, startdate, enddate }) => {
  const minyear = startdate.substring(0, 4);
  const minmonth = startdate.substring(4, 6);
  const minday = startdate.substring(6, 8);
  const maxyear = enddate.substring(0, 4);
  const maxmonth = enddate.substring(4, 6);
  const maxday = enddate.substring(6, 8);
  const mindate = new Date(`${minyear}-${minmonth}-${minday}`);
  const maxdate = new Date(`${maxyear}-${maxmonth}-${maxday}`);
  const today = new Date();
  const { member } = useMemberStore();
  member?.memberId;

  const [dateRange, setDateRange] = useState<any>({
    startDate: today > mindate ? today : mindate,
    endDate: maxdate,
    key: 'selection',
  });
  /** 2023-09-21 사용자가 선택한 날짜를 시작날짜와 끝나는날짜에 저장하는 함수. - parksubeom */
  const handleDateChange = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;
    setDateRange({ startDate, endDate, key: 'selection' });
  };
  /** 2023-07-29 원하는 날짜를 픽스하고, 해당날짜 캘린더에 축제를 추가하는 함수 - parksubeom */
  const postForm = () => {
    if (member) {
      setDateForm(false);
      const params: CalendarAddRequest = {
        festivalId: festivalId,
        startDate: `${dateRange.startDate?.toJSON().split('T')[0]}`,
        endDate: `${dateRange.endDate?.toJSON().split('T')[0]}`,
      };
      addCalendarRequest(params);
    }
    alert(
      `${dateRange.startDate?.toLocaleDateString()}일 부터 ${dateRange.endDate?.toLocaleDateString()}일 까지의 일정이 추가합니다. `,
    );
  };
  const exitForm = () => {
    setDateForm(false);
  };
  return (
    <DateBackground>
      <DateContainer>
        <label htmlFor="datePicker">캘린더 일정을 선택해주세요. </label>
        <DateRange
          locale={ko}
          dateDisplayFormat="yyyy.MM.dd"
          editableDateInputs
          onChange={handleDateChange}
          moveRangeOnFirstSelection={false}
          ranges={[dateRange]}
          minDate={today > mindate ? today : mindate}
          maxDate={maxdate}
        />
        <Button onClick={postForm}>선택</Button>
        <Button onClick={exitForm} color="red">
          취소
        </Button>
      </DateContainer>
    </DateBackground>
  );
};

export default AddCalendar;

const DateBackground = styled.div`
  z-index: 5;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: absolute;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  z-index: 10;
  width: 100%;
  height: 100%;
  > .rdrCalendarWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    > .rdrMonths {
      align-items: center;
      > .rdrMonth {
        width: 100%;
      }
    }
  }
`;
