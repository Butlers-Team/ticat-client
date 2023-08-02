import instance from '@api/axiosInstance';
import { useExpStore } from '@store/useExpStore';
import { useTokenStore } from '@store/useTokenStore';
import { dateToSeconds } from '@utils/dateToSeconds';

//type
import { ApiRefreshResponse, ApiRefreshHandler } from 'types/auth';

//토큰갱신 요청
/** 2023/08/02 - 토근 갱신 요청 - by leekoby */
export const refreshApi: ApiRefreshHandler = async () => {
  try {
    const { headers } = await instance.post<ApiRefreshResponse>(`/refresh`);
    useExpStore.getState().setExp(+dateToSeconds(headers.accesstokenexpiration));
    useTokenStore.getState().setAccessToken(headers.authorization);
    return headers;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error;
  }
};
