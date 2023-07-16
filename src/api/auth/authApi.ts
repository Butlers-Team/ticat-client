import instance from '@api/axiosInstance';

/** 2023/07/09 - 토큰 새로고침 - by leekoby */
export const refreshAccessToken = async () => {
  try {
    const response = await instance.post('/refresh');
    const newAccessToken = response.data.access_token;
    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
};
