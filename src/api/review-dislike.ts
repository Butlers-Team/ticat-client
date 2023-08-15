import instance from './axiosInstance';

//type
import type {
  ApiCreateDislikeHandler,
  ApiCreateDislikeRequest,
  ApiCreateDislikeResponse,
  ApiDeleteDislikeHandler,
  ApiDeleteDislikeRequest,
  ApiDeleteDislikeResponse,
} from 'types/api';

/** 2023/07/22 - 리뷰 싫어요 등록 POST 요청 - by leekoby */
export const apiCreateReviewDislike: ApiCreateDislikeHandler = async ({ reviewId }) => {
  return await instance.post<ApiCreateDislikeResponse>(`/reviews/${reviewId}/disliked`);
};

/** 2023/07/22 - 리뷰 싫어요 등록 POST 요청 - by leekoby */
export const apiDeleteReviewDislike: ApiDeleteDislikeHandler = async ({ reviewId }) => {
  return await instance.delete<ApiDeleteDislikeResponse>(`/reviews/${reviewId}/disliked`);
};
