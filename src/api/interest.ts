import instance from '@api/axiosInstance';

//type
import { ApiInterestResponse, ApiInterestHandler } from 'types/api';

/** 2023/07/15 - 닉네임, 관심사 등록 요청  - by leekoby */
export const apiRegisterInterest: ApiInterestHandler = async ({ displayName, categories }) => {
  const { data } = await instance.post<ApiInterestResponse>(`/interest`, { displayName, categories });

  return data;
};
