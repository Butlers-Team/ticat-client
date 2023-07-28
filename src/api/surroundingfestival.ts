import instance from './axiosInstance';

// type
import { surroundTypeResponse, surroundTypeRequest } from 'types/api/surroundingfestival';

/** 2023/07/14 - 같은 카테고리 리스트 GET 요청 - by parksubeom */
export const getSurroundingFestival = async (params: surroundTypeRequest) => {
  const { data } = await instance.get<surroundTypeResponse>('/festivals/distance', {
    params,
    headers: { 'No-Auth': 'True' },
  });

  return data;
};
