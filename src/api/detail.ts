import instance from './axiosInstance';
// type
import { FestivalDetailType } from 'types/api/detail';

/** 2023/07/11 - 축제 상세리스트 GET 요청 - by parksubeom */
export const getDetailList = (contentId: string) => {
  return instance.get<FestivalDetailType>(`/festivals/${contentId}`, {
    headers: { 'No-Auth': 'True' },
  });
};
