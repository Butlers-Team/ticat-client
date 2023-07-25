import instance from './axiosInstance';

// type
import { MainFastivalResponse, MainFastivalType } from 'types/api/mainfastival';

/** 2023/07/04 - 메인 축제 배너 GET 요청 - by mscojl24 */
export const getMainFastival = async () => {
  const { data } = await instance.get<MainFastivalResponse>('/festivals/banner', {
    headers: {
      'No-Auth': true,
    },
  });

  return data;
};

/** 2023/07/04 - 관심사 축제 추천 배너 GET 요청 - by mscojl24 */
export const getMainRecommend = async () => {
  const { data } = await instance.get<MainFastivalType[]>('/festivals/mainrecommend');

  return data;
};
