import instance from './axiosInstance';

// type
import { MainFastivalResponse } from 'types/api/mainfastival';
// import { CategoriesRequest, CatergoriesResponse } from '@types/api/category';

/** 2023/07/04 - 메인 축제 배너 GET 요청 - by mscojl24 */
export const getMainFastival = async () => {
  const { data } = await instance.get<MainFastivalResponse>('/festivals/banner');

  return data;
};

/** 2023/07/04 - 관심사 축제 추천 배너 GET 요청 - by mscojl24 */
export const getMainRecommend = async () => {
  const { data } = await instance.get<MainFastivalResponse>('/festivals/mainrecommend');

  return data;
};
