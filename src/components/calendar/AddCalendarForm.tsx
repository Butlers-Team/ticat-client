import { useMemberStore } from '@store/useMemberStore';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

import { addCalendarRequest } from '@api/addcalendar';
import { CalendarAddRequest } from 'types/api/addcalendar';

interface AddCalendarProps {
  setDateForm: React.Dispatch<React.SetStateAction<boolean>>;
  festivalId: number;
}

const AddCalendar: React.FC<AddCalendarProps> = ({ setDateForm, festivalId }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { member } = useMemberStore();
  console.log(member?.memberId);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  /** 2023-07-29 원하는 날짜를 픽스하고, 해당날짜 캘린더에 축제를 추가하는 함수 - parksubeom */
  const exitForm = () => {
    if (member) {
      setDateForm(false);
      const params: CalendarAddRequest = {
        festivalId: festivalId,
        scheduleDate: `${selectedDate?.toJSON().split('T')[0]}`,
      };
      addCalendarRequest(params);
    }

    //festivalId , member?.memberId ,selectedDate 파람스롤 넣어서 http://localhost:8080/calendar/save에 포스트요청 고고

    alert(`${selectedDate?.toLocaleDateString()}일에 일정이 추가되었습니다.`);
  };

  console.log(selectedDate);
  return (
    <DateBackground>
      <DateContainer>
        <label htmlFor="datePicker">캘린더 날짜 선택: </label>
        <DatePicker
          id="datePicker"
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={today}
          dateFormat="yyyy-MM-dd"
          placeholderText="날짜를 선택하세요"
          todayButton="오늘"
          customInput={<input />}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
        {selectedDate && <p>선택한 날짜: {selectedDate.toLocaleDateString()}</p>}
        <AddBtn onClick={exitForm}>선택</AddBtn>
      </DateContainer>
    </DateBackground>
  );
};

export default AddCalendar;

const DateBackground = styled.div`
  z-index: 5;
  width: 100%;
  height: 100%;
  background-color: gray;

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

const AddBtn = styled.button`
  border: none;
  background-color: #1692fe;
  width: 50px;
  height: 30px;
`;
