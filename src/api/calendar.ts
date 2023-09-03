import instance from '@api/axiosInstance';

// type
import { CalendarListRequest, CalendarListResponse } from 'types/api/calendar';

/** 2023/08/04 - 캘린더 축제 GET 요청 - by sineTlsl */
export const getCalendarList = async (params: CalendarListRequest) => {
  const { data } = await instance.get<CalendarListResponse>('/members/calendar', {
    params,
  });

  return data;
};
