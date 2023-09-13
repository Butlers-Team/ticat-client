import instance from '@api/axiosInstance';

// type
import { CalendarListRequest, CalendarListListType } from 'types/api/calendar';
import { CalendarAddRequest } from 'types/api/addcalendar';
/** 2023/08/04 - 캘린더 축제 GET 요청 - by parksubeom */
export const getCalendarList = async (params: CalendarListRequest) => {
  const { data } = await instance.get<CalendarListListType>('/members/schedule', {
    params,
  });

  return data;
};
/** 2023/09/12 - 캘린더 축제 POST 요청 - by parksubeom */
export const addCalendarRequest = async ({ ...params }: CalendarAddRequest) => {
  const { data } = await instance.post<string>(`/calendar/save`, { ...params });

  return data;
};

/** 2023/09/12 - 캘린더 축제 POST 요청 - by parksubeom */
export const deleteCalendarRequest = async (festivalId: number) => {
  const { data } = await instance.delete<string>(`/calendar/${festivalId}`, {});

  return data;
};
