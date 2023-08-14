import { useQuery } from '@tanstack/react-query';
//api
import { apiFetchMyReviews } from '@api/reviews';

//key
import { QUERY_KEYS } from './queryKeys';

//type
import type { ApiFetchMyReviewsHandler, ApiFetchMyReviewsRequest, ApiFetchMyReviewsResponse } from 'types/api';

/** 2023/08/15- 마이페이지 리뷰 패칭 쿼리  - by leekoby */
const useFetchMyReviewList = ({ page, size }: ApiFetchMyReviewsRequest) => {
  const { data, isFetching } = useQuery<ApiFetchMyReviewsResponse>([QUERY_KEYS.myreview, page], () =>
    apiFetchMyReviews({ page, size }),
  );
  return { data, isFetching };
};

export { useFetchMyReviewList };
