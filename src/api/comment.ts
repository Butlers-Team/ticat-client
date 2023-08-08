import instance from './axiosInstance';

//type
import type {
  ApiFetchCommentsHandler,
  ApiFetchCommentsRequest,
  ApiFetchCommentsResponse,
  ApiCreateCommentHandler,
  ApiCreateCommentRequest,
  ApiCreateCommentResponse,
  ApiDeleteCommentHandler,
  ApiDeleteCommentRequest,
  ApiDeleteCommentResponse,
  ApiUpdateCommentHandler,
  ApiUpdateCommentRequest,
  ApiUpdateCommentResponse,
} from 'types/api/';

/** 2023/08/07  - 댓글 패치 요청 - by leekoby */
export const apiFetchComments: ApiFetchCommentsHandler = async ({ reviewId, ...body }) => {
  const { data } = await instance.get<ApiFetchCommentsResponse>(`/reviews/${reviewId}/comments`, {
    params: body,
    headers: { 'No-Auth': true },
  });

  return data;
};

/** 2023/08/07 -  댓글 등록 post 요청 - by leekoby */
export const apiCreateComment: ApiCreateCommentHandler = async ({ reviewId, content }) => {
  const { data } = await instance.post<ApiCreateCommentResponse>(`/reviews/${reviewId}/comments`, { content });
  return data;
};
