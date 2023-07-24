import instance from './axiosInstance';

// type
import type {
  ApiCreateCommentHandler,
  ApiCreateCommentResponse,
  ApiCreateCommentRequest,
  ApiFetchCommentsHandler,
  ApiFetchCommentsResponse,
  ApiUpdateCommentHandler,
  ApiDeleteCommentHandler,
} from 'types/api/';

//utils
import { createFormData } from '@utils/createFormData';

/** 2023/07/21  - 댓글 패치 요청 - by leekoby */
export const apiFetchComments: ApiFetchCommentsHandler = async ({ festivalId, ...body }) => {
  const { data } = await instance.get<ApiFetchCommentsResponse>(`/festivals/${festivalId}/reviews`, {
    params: body,
    headers: {
      'No-Auth': true,
    },
  });

  return data;
};

/** 2023/07/21 -  댓글 등록 post 요청 - by leekoby */
export const apiCreateComment: ApiCreateCommentHandler = async body => {
  const formData = createFormData({ request: body });
  const { data } = await instance.post<ApiCreateCommentResponse>(`/festivals/${body.festivalId}/reviews`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

/** 2023/07/21 - 댓글 수정 API 요청 by leekoby */
export const apiUpdateComment: ApiUpdateCommentHandler = async ({ commentId, review, reviewImages }) => {
  const formData = createFormData({ request: { commentId, review, reviewImages } });
  formData.append('review', JSON.stringify(review));

  const { data } = await instance.patch(`/reviews/${commentId}`, formData);
  return data;
};

/** 2023/07/21 - 댓글 삭제 API 요청 by leekoby */
export const apiDeleteComment: ApiDeleteCommentHandler = async ({ commentId }) => {
  const { data } = await instance.delete(`/reviews/${commentId}`);
  return data;
};
