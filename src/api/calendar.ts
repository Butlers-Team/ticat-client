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
  try {
    const { data } = await instance.post<string>(`/calendar/save`, { ...params });
    alert('성공적으로 추가되었습니다.');
    return data;
  } catch (error: any) {
    if (error.response && error.response.status === 409) {
      console.error('409 에러: 중복된 일정입니다.');
      alert('중복된 일정입니다. 캘린더를 확인 부탁드립니다.');
    } else {
      throw new Error('일정 추가 중 오류가 발생했습니다.');
    }
  }
};

/** 2023/09/12 - 캘린더 축제 POST 요청 - by parksubeom */
export const deleteCalendarRequest = async (festivalId: number) => {
  const { data } = await instance.delete<string>(`/calendar/${festivalId}`, {});

  return data;
};
