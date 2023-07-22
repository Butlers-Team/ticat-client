import instance from './axiosInstance';

// type
import { MapFastivalResponse, MapFastivalRequest } from 'types/api/mapfastival';

/** 2023/07/04 - map 페스티벌 리스트 GET 요청 - by mscojl24 */
export const getMapFastival = async (params: MapFastivalRequest) => {
  const { data } = await instance.get<MapFastivalResponse>('/festivals/map', {
    params,
  });

  return data;
};
