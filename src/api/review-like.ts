import instance from './axiosInstance';

//type

import type {
  ApiCreateLikeHandler,
  ApiCreateLikeRequest,
  ApiCreateLikeResponse,
  ApiDeleteLikeHandler,
  ApiDeleteLikeRequest,
  ApiDeleteLikeResponse,
} from 'types/api';

/** 2023/07/22 - 리뷰 좋아요 등록 POST 요청 - by leekoby */
export const apiCreateReviewLike: ApiCreateLikeHandler = async ({ reviewId }) => {
  return await instance.post<ApiCreateLikeResponse>(`/reviews/${reviewId}/liked`);
};

/** 2023/07/22 - 리뷰 좋아요 등록 POST 요청 - by leekoby */
export const apiDeleteReviewLike: ApiDeleteLikeHandler = async ({ reviewId }) => {
  return await instance.delete<ApiDeleteLikeResponse>(`/reviews/${reviewId}/liked`);
};
