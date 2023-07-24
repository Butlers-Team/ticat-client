import instance from './axiosInstance';
import type {
  ApiCreateDislikeHandler,
  ApiCreateDislikeRequest,
  ApiCreateDislikeResponse,
  ApiDeleteDislikeHandler,
  ApiDeleteDislikeRequest,
  ApiDeleteDislikeResponse,
} from 'types/api';

/** 2023/07/22 - 댓글 싫어요 등록 POST 요청 - by leekoby */
export const apiCreateCommentDislike: ApiCreateDislikeHandler = async ({ reviewId }) => {
  return await instance.post<ApiCreateDislikeResponse>(`/reviews/${reviewId}/good`);
};

/** 2023/07/22 - 댓글 싫어요 등록 POST 요청 - by leekoby */
export const apiDeleteCommentDislike: ApiDeleteDislikeHandler = async ({ reviewId }) => {
  return await instance.delete<ApiDeleteDislikeResponse>(`/reviews/${reviewId}/good`);
};
