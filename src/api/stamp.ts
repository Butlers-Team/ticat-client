import { QueryFunctionContext } from '@tanstack/react-query';
import instance from '@api/axiosInstance';

import { StampListResponse, StampDistanceResponse } from 'types/api/stamp';

/** 2023/07/23 - 스탬프 목록 GET 요청 - by sineTlsl */
export const getStampList = async ({ queryKey }: QueryFunctionContext) => {
  const [_key, params] = queryKey;
  const { data } = await instance.get<StampListResponse>('/members/stamps', {
    params,
  });

  return data;
};

/** 2023/08/14 - 스탬프 거리 안 축제 찾기 - by sineTlsl */
export const getStampDistance = async ({ queryKey }: QueryFunctionContext) => {
  const [_key, params] = queryKey;
  const { data } = await instance.get<StampDistanceResponse>('/festivals/distance', {
    params,
    headers: { 'No-Auth': true },
  });

  return data;
};
