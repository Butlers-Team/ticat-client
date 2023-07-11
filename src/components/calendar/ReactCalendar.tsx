import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import

const ReactCalendar = () => {
  const [value, onChange] = useState<Date | null>(new Date());
  return <div></div>;
};
export default ReactCalendar;
