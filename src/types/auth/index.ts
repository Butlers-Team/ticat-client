import { AxiosError } from 'axios';

/** 2023/07/14 - Axios에러 타입  - by leekoby */
export interface CustomAxiosError extends Omit<AxiosError, 'response'> {
  response?: {
    status: number;
    data?: {
      message?: string;
    };
  };
}

export * from './signIn';
export * from './signUp';
