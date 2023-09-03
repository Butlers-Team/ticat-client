import instance from '@api/axiosInstance';

//type
import { CalendarAddRequest } from 'types/api/addcalendar';

export const addCalendarRequest = async ({ ...params }: CalendarAddRequest) => {
  const { data } = await instance.post<string>(`/calendar/save`, { ...params });

  return data;
};
