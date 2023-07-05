import instance from './axiosInstance';

// type
import { CatergoriesRequest, CatergoriesResponse } from '../types/api/catergory';

/** 2023/07/04 - 축제 리스트 카테고리별 GET 요청 - by sineTlsl */
export const getCatergories = (params: CatergoriesRequest) => {
  return instance.get<CatergoriesResponse>('/festivals/list', {
    params,
  });
};
