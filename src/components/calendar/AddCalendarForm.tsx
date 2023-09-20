import { useMemberStore } from '@store/useMemberStore';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { member } = useMemberStore();
  member?.memberId;

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  /** 2023-07-29 원하는 날짜를 픽스하고, 해당날짜 캘린더에 축제를 추가하는 함수 - parksubeom */
  const exitForm = () => {
    if (selectedDate === null) {
      return alert('날짜를 선택해주세요.');
    }

    if (member) {
      setDateForm(false);
      const startDate = new Date();
      startDate.setDate(selectedDate.getDate());
      const params: CalendarAddRequest = {
        festivalId: festivalId,
        startDate: `${startDate?.toJSON().split('T')[0]}`,
        endDate: `${startDate?.toJSON().split('T')[0]}`,
      };
      addCalendarRequest(params);
    }
    alert(`${selectedDate?.toLocaleDateString()}일에 일정이 추가되었습니다.`);
  };

  return (
    <DateBackground>
      <DateContainer>
        <label htmlFor="datePicker">캘린더 날짜 선택: </label>
        <DatePicker
          id="datePicker"
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={today > mindate ? today : mindate}
          maxDate={maxdate}
          dateFormat="yyyy-MM-dd"
          placeholderText="날짜를 선택하세요"
          todayButton="오늘"
          customInput={<input />}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
        {selectedDate && <p>선택한 날짜: {selectedDate.toLocaleDateString()}</p>}
        <Button onClick={exitForm}>선택</Button>
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
`;
