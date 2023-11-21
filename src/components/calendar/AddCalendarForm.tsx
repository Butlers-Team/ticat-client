import { useMemberStore } from '@store/useMemberStore';
import React, { useState } from 'react';
import { ko } from 'date-fns/locale';
import { DateRange, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { addCalendarRequest } from '@api/calendar';
import { CalendarAddRequest } from 'types/api/addcalendar';
//hooks
import useCustomToast from '@hooks/useCustomToast';

interface AddCalendarProps {
  setDateForm: React.Dispatch<React.SetStateAction<boolean>>;
  festivalId: number;
  startdate: string;
  enddate: string;
}

const AddCalendar: React.FC<AddCalendarProps> = ({ setDateForm, festivalId, startdate, enddate }) => {
  const toast = useCustomToast();
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

  const [dateRange, setDateRange] = useState({
    startDate: today > mindate ? today : mindate,
    endDate: today > mindate ? today : mindate,
    key: 'selection',
  });

  /** 2023-09-21 사용자가 선택한 날짜를 시작날짜와 끝나는날짜에 저장하는 함수. - parksubeom */
  const handleDateChange = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    if (startDate && endDate) {
      setDateRange({ startDate, endDate, key: 'selection' });
    }
  };
  /** 2023-07-29 원하는 날짜를 픽스하고, 해당날짜 캘린더에 축제를 추가하는 함수 - parksubeom */
  const postForm = async () => {
    if (member) {
      setDateForm(false);
      const endDate = new Date(dateRange.endDate);
      endDate.setDate(endDate.getDate() + 1);
      const params: CalendarAddRequest = {
        festivalId: festivalId,
        startDate: `${dateRange.startDate?.toJSON().split('T')[0]}`,
        endDate: endDate.toISOString().split('T')[0] || '',
      };
      try {
        const data = await addCalendarRequest(params);
        console.log(data);
        if (data) {
          toast({
            title: `${dateRange.startDate?.toLocaleDateString()} ~ ${dateRange.endDate?.toLocaleDateString()} 일정이 성공적으로 등록되었습니다. `,
            status: 'success',
          });
        } else {
          toast({ title: '중복된 일정 입니다. 날짜를 다시 확인해주세요.', status: 'error' });
        }
      } catch (error) {
        console.log(error);
      }
    }
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
        <BtnGroup>
          <ButtonL onClick={postForm}>일정등록</ButtonL>
          <ButtonR onClick={exitForm} color="red">
            취소
          </ButtonR>
        </BtnGroup>
      </DateContainer>
    </DateBackground>
  );
};

export default AddCalendar;

const DateBackground = styled.div`
  position: fixed;
  z-index: 5;
  width: 100%;
  max-width: 500px;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);

  z-index: 10;
  width: 100%;
  animation: showModal 0.5s forwards;

  @keyframes showModal {
    0% {
      opacity: 0;
      transform: translateY(-40px);
    }

    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  label {
    color: #ccc;
  }

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

// 버튼 디자인 수정

const BtnGroup = styled.div`
  border: 1px solid #dbdbdb;
  display: flex;
  overflow: hidden;
  border-radius: 10px;

  > button:nth-child(1):hover {
    color: var(--color-sub);
    background-color: #f1f9ff;
  }

  > button:nth-child(2):hover {
    color: #d66767;
  }
`;

const ButtonL = styled.button`
  cursor: pointer;
  border: none;
  background-color: #fff;
  color: var(--color-main);
  width: 100%;
  height: 50px;
  font-size: 1.4rem;
  font-weight: 600;
`;

const ButtonR = styled(ButtonL)`
  border-left: 1px solid #dbdbdb;
  color: #aaaaaa;
  background-color: #f7f7f7;
`;
