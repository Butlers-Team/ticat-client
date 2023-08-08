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
    const response = await instance.post<ApiRefreshResponse>(`/refresh`);
    useExpStore.getState().setExp(+dateToSeconds(response.headers.accesstokenexpiration));
    useTokenStore.getState().setAccessToken(response.headers.authorization);
    return response;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error;
  }
};
