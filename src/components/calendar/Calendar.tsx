import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

const Calendar = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  return (
    <>
      <DatePicker selected={startDate} onChange={date => setStartDate(date)} inline locale={ko} />
    </>
  );
};
export default Calendar;
