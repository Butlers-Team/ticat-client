import instance from '@api/axiosInstance';

// type
import { MyInfoTypeResponse, MyInfoType } from 'types/api/myinfo';

/** 2023/07/21 - 회원정보 GET 요청 - by sineTlsl */
export const getMyInfo = async () => {
  const { data } = await instance.get<MyInfoType>('/members');

  return data;
};
