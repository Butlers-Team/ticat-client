import instance from '@api/axiosInstance';
import { useTokenStore } from '@store/authStore';

/** 2023/07/09 - 토큰 새로고침 - by leekoby */
export const refreshAccessToken = async () => {
  // try {
  console.log('여기실행');
  const response = await instance.post('/refresh');
  console.log('refresh:', response);
  const newAccessToken = response.data.Authorization;
  const newRefreshToken = response.data.Refresh;
  console.log('newAccessToken:', newAccessToken);
  console.log('newRefreshToken:', newRefreshToken);

  // 새로운 액세스 토큰을 저장
  useTokenStore.getState().setAccessToken(newAccessToken);

  // 새로운 refresh 토큰 값을 확인하고, 존재할 경우 업데이트
  if (response.data.refresh_token) {
    useTokenStore.getState().setRefreshToken(newRefreshToken);
  }
  const newToken = { newAccessToken, newRefreshToken };
  return newToken;
  // } catch (error) {
  //   console.error('Error refreshing access token:', error);
  // return null;
  // }
};
