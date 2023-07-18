import { getToken } from '@store/authStore';
import axios from 'axios';
import { refreshAccessToken } from './auth/authApi';

/** 2023/07/04 - Axios instance 생성 - by sineTlsl */
export const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 1000,
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
    // console.log(accessToken, refreshToken);
    // No-Auth 헤더가 없는 경우에만 토큰을 추가
    if (!config.headers['No-Auth']) {
      if (refreshToken && accessToken) {
        config.headers['Refresh'] = refreshToken;
        config.headers['Authorization'] = accessToken;
      }
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

/** 2023/07/04 - Response interceptor 설정- by sineTlsl */
instance.interceptors.response.use(
  res => {
    // 응답 데이터로 작업 수행

    return res;
  },

  /** 2023/07/09 - refresh 로직 추가  - by leekoby */
  async error => {
    const originalRequest = error.config;
    // 에러 상태가 401 (Unauthorized)이고, 아직 재시도를 하지 않았다면
    if (
      error.response &&
      (error.response.status === 404 || error.response.status === 401) &&
      !originalRequest._retry &&
      originalRequest.url !== '/refresh'
    ) {
      originalRequest._retry = true; // 재시도 플래그를 true로 설정

      // 새로운 액세스 토큰을 얻기
      const newToken = await refreshAccessToken();
      console.log('newToken:', newToken);
      if (newToken) {
        // 새로운 액세스 토큰을 헤더에 설정하고 요청을 다시 보내기
        instance.defaults.headers.common['Authorization'] = newToken.newAccessToken;
        originalRequest.headers['Authorization'] = newToken.newAccessToken;
        instance.defaults.headers.common['Refresh'] = newToken.newRefreshToken;
        originalRequest.headers['Refresh'] = newToken.newRefreshToken;
        return instance(originalRequest);
      }
    }

    // 위의 경우가 아닌 경우 에러를 그대로 반환
    return Promise.reject(error);
  },
);

export default instance;
