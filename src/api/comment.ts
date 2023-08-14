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
  ApiFetchMyCommentsHandler,
  ApiFetchMyCommentsResponse,
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
/** 2023/08/12 -  댓글 update 요청 - by leekoby */
export const apiUpdateComment: ApiUpdateCommentHandler = async ({ commentId, content }) => {
  const { data } = await instance.patch<ApiUpdateCommentResponse>(`/comments/${commentId}`, { content });
  return data;
};
/** 2023/08/12 -  댓글 delete 요청 - by leekoby */
export const apiDeleteComment: ApiDeleteCommentHandler = async ({ commentId }) => {
  const { data } = await instance.delete<ApiDeleteCommentResponse>(`/comments/${commentId}`);
  return data;
};

/** 2023/08/15  - 마이페이지 댓글 패치 요청 - by leekoby */
export const apiFetchMyComments: ApiFetchMyCommentsHandler = async ({ ...params }) => {
  const { data } = await instance.get<ApiFetchMyCommentsResponse>(`/mypage/comments`, {
    params,
  });

  return data;
};
