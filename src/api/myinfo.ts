import instance from '@api/axiosInstance';

// type
import { MyInfoType, RecentListType } from 'types/api/myinfo';

/** 2023/07/21 - 회원정보 GET 요청 - by sineTlsl */
export const getMyInfo = async () => {
  const { data } = await instance.get<MyInfoType>('/members');

  return data;
};

/** 2023/07/23 - 축제 최근목록 GET 요청 - by sineTlsl */
export const getRecentList = async () => {
  const { data } = await instance.get<RecentListType[]>('/recent');

  return data;
};
