import instance from './axiosInstance';

// type
import { CategoriesRequest, CategoriesResponse } from '../types/api/category';
// import { CategoriesRequest, CatergoriesResponse } from '@types/api/category';

/** 2023/07/04 - 축제 리스트 카테고리별 GET 요청 - by sineTlsl */
export const getCatergories = async (params: CategoriesRequest) => {
  const { data } = await instance.get<CategoriesResponse>('/festivals/list', {
    params,
  });

  return data;
};
