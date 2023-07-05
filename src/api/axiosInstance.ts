import axios from 'axios';

/** 2023/07/04 - Axios instance 생성 - by sineTlsl */
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
  },
});

/** 2023/07/04 - Request interceptor 설정 - by sineTlsl */
instance.interceptors.request.use(
  config => {
    // 요청 하기 전 작업 수행

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
  err => {
    return Promise.reject(err);
  },
);

export default instance;
