import instance from './axiosInstance';

// type
import type {
  ApiCreateReviewHandler,
  ApiCreateReviewRequest,
  ApiCreateReviewResponse,
  ApiFetchReviewsHandler,
  ApiFetchReviewsResponse,
  ApiUpdateReviewHandler,
  ApiDeleteReviewHandler,
} from 'types/api/';

//utils
import { createFormData } from '@utils/createFormData';

/** 2023/07/21  - 리뷰 패치 요청 - by leekoby */
export const apiFetchReviews: ApiFetchReviewsHandler = async ({ festivalId, ...body }) => {
  const { data } = await instance.get<ApiFetchReviewsResponse>(`/festivals/${festivalId}/reviews`, {
    params: body,
  });

  return data;
};

/** 2023/07/21 -  리뷰 등록 post 요청 - by leekoby */
export const apiCreateReview: ApiCreateReviewHandler = async body => {
  const formData = createFormData({ request: body });
  const { data } = await instance.post<ApiCreateReviewResponse>(`/festivals/${body.festivalId}/reviews`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

/** 2023/07/21 - 리뷰 수정 API 요청 by leekoby */
export const apiUpdateReview: ApiUpdateReviewHandler = async body => {
  const formData = createFormData({ request: body });
  const { data } = await instance.patch(`/reviews/${body.reviewId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

/** 2023/07/21 - 리뷰 삭제 API 요청 by leekoby */
export const apiDeleteReview: ApiDeleteReviewHandler = async ({ reviewId }) => {
  const { data } = await instance.delete(`/reviews/${reviewId}`);
  return data;
};
