import instance from '@api/axiosInstance';

//type
import { ApiSignUpResponse, ApiSignUpHandler } from 'types/auth';

//회원가입 요청
/** 2023/07/09 - 회원가입 - by leekoby */
export const apiSignUp: ApiSignUpHandler = async ({ id, email, password, confirmPassword }) => {
  const { data } = await instance.post<ApiSignUpResponse>(`/signup`, {
    id,
    email,
    password,
    confirmPassword,
  });

  return data;
};
