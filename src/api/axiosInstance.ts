import axios, { AxiosError, AxiosRequestConfig } from 'axios';

//utils
import { dateToSeconds } from '@utils/dateToSeconds';

//store
import { clearExp, useExpStore } from '@store/useExpStore';
import { clearMember } from '@store/useMemberStore';
import { getToken, clearTokens, useTokenStore } from '@store/useTokenStore';

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
    if (!!config.headers['No-Auth']) {
      delete instance.defaults.headers.common['Authorization'];
      delete instance.defaults.headers.common['Refresh'];
      delete config.headers['Authorization'];
      delete config.headers['Refresh'];
      return config;
    }
    const { accessToken, refreshToken } = getToken();
    // No-Auth 헤더가 없는 경우에만 토큰을 추가

    if (refreshToken && accessToken) {
      config.headers['Refresh'] = refreshToken;
      config.headers['Authorization'] = accessToken;
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
    clearExp();
    clearMember(); // 로컬스토리지 멤버 초기화

    alert('로그인 유지 만료 다시 로그인해주세요.');
    window.location.href = '/signin';
  }
  if (error.response && error.response.data === '액세스 토큰이 갱신되었습니다') {
    const newAccessToken = error.response.headers.authorization;
    const newExp = dateToSeconds(error.response.headers.accesstokenexpiration);
    if (originalRequest.headers && !originalRequest.headers['No-Auth']) {
      instance.defaults.headers.common['Authorization'] = newAccessToken;
      useExpStore.getState().setExp(+newExp);

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
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      error.response.data === '엑세스 토큰이 갱신되었습니다.'
    ) {
      console.log('error', error);
      originalRequest._retry = true; // 재시도 플래그를 true로 설정

      return refreshTokenAndUpdateRequest(error, originalRequest);
    } else if (error.response?.status === 401 && originalRequest._retry) {
      alert('다시 로그인해주세요.');
      clearTokens(); // 로컬스토리지 토큰 초기화
      clearExp();
      clearMember(); // 로컬스토리지 멤버 초기화
      window.location.href = '/signin';
    }
    // 위의 경우가 아닌 경우 에러를 그대로 반환
    return Promise.reject(error);
  },
);
export default instance;
