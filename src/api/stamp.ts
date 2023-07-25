import { QueryFunctionContext } from '@tanstack/react-query';
import instance from '@api/axiosInstance';

import { StampListResponse } from 'types/api/stamp';

/** 2023/07/23 - 스탬프 목록 GET 요청 - by sineTlsl */
export const getStampList = async ({ queryKey }: QueryFunctionContext) => {
  const [_key, params] = queryKey;
  const { data } = await instance.get<StampListResponse>('/members/stamps', {
    params,
  });

  return data;
};
