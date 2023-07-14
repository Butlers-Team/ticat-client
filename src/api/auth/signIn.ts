import instance from '@api/axiosInstance';

//type
import { ApiSignInResponse, ApiSignInHandler } from 'types/auth';

//로그인 요청
/** 2023/07/09 - 로그인 - by leekoby */
export const apiSignIn: ApiSignInHandler = async ({ id, password }) => {
  const { data, headers } = await instance.post<ApiSignInResponse>(`/login`, { id, password });

  return { data, accessToken: headers['authorization'], refreshToken: headers['refresh'] };
};
