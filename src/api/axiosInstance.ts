import useCustomToast from '@hooks/useCustomToast';
import { resetMember, useMemberStore } from '@store/useMemberStore';
import { getToken, clearTokens, useTokenStore } from '@store/useTokenStore';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

/** 2023/07/04 - Axios instance 생성 - by sineTlsl */
export const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
  },
});

/** 2023/07/04 - Request interceptor 설정 - by sineTlsl */
instance.interceptors.request.use(
  /** 2023/07/09 - interceptor 설정 - by leekoby */

  async config => {
    const { accessToken, refreshToken } = getToken();
    // No-Auth 헤더가 없는 경우에만 토큰을 추가
    if (!config.headers['No-Auth']) {
      if (refreshToken && accessToken) {
        config.headers['Refresh'] = refreshToken;
        config.headers['Authorization'] = accessToken;
      }
    }
    return config;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  },
);
/** 2023/07/23 -  토큰갱신 - by leekoby */
async function refreshTokenAndUpdateRequest(error: AxiosError, originalRequest: AxiosRequestConfig) {
  if (error.response && error.response.data === '리프레시 토큰이 만료되었습니다.') {
    clearTokens(); // 로컬스토리지 토큰 초기화
    resetMember(); // 로컬스토리지 멤버 초기화
    localStorage.removeItem('exp');
    alert('로그인 필요: 다시 로그인해주세요.');
  }

  if (error.response && error.response.data === '액세스 토큰이 갱신되었습니다') {
    const newAccessToken = error.response.headers.authorization;

    //액세스 토큰 만료 시간 설정
    const dateToSeconds = (dateString: string) => {
      const date = new Date(dateString);
      const seconds = Math.floor(date.getTime() / 1000);

      return `${seconds}`;
    };
    localStorage.setItem('exp', dateToSeconds(error.response.headers.exp));

    if (originalRequest.headers && !originalRequest.headers['No-Auth']) {
      instance.defaults.headers.common['Authorization'] = newAccessToken;
      const { refreshToken } = getToken();
      instance.defaults.headers.common['Refresh'] = refreshToken;
      useTokenStore.getState().setAccessToken(newAccessToken);
    } else {
      delete instance.defaults.headers.common['Authorization'];
      delete instance.defaults.headers.common['Refresh'];
    }
  }

  if (originalRequest.data instanceof FormData) {
    originalRequest.headers && (originalRequest.headers['Content-Type'] = 'multipart/form-data');
  }

  return instance(originalRequest);
}
/** 2023/07/04 - Response interceptor 설정- by sineTlsl */
instance.interceptors.response.use(
  res => {
    // 응답 데이터로 작업 수행

    return res;
  },

  /** 2023/07/09 - refresh 로직 추가  - by leekoby */
  async error => {
    const originalRequest = error.config;
    if (error.response && (error.response.status === 404 || error.response.status === 401) && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 플래그를 true로 설정

      return refreshTokenAndUpdateRequest(error, originalRequest);
    }

    // 위의 경우가 아닌 경우 에러를 그대로 반환
    return Promise.reject(error);
  },
);

export default instance;
