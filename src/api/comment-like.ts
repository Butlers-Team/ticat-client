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

/** 2023/07/22 - 댓글 좋아요 등록 POST 요청 - by leekoby */
export const apiCreateCommentLike: ApiCreateLikeHandler = async ({ reviewId }) => {
  return await instance.post<ApiCreateLikeResponse>(`/reviews/${reviewId}/bad`);
};

/** 2023/07/22 - 댓글 좋아요 등록 POST 요청 - by leekoby */
export const apiDeleteCommentLike: ApiDeleteLikeHandler = async ({ reviewId }) => {
  return await instance.delete<ApiDeleteLikeResponse>(`/reviews/${reviewId}/bad`);
};
