import instance from './axiosInstance';

// type
import { RecommendListType, RecommendRequest } from 'types/api/recommend';

/** 2023/07/14 - 같은 카테고리 리스트 GET 요청 - by parksubeom */
export const getRecommendList = async (params: RecommendRequest) => {
  const { data } = await instance.get<RecommendListType[]>('/festivals/detailrecommend', {
    params,
  });

  return data;
};
