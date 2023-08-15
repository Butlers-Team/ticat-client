//query
import { useQuery } from '@tanstack/react-query';

//key
import { QUERY_KEYS } from './queryKeys';

//api
import { apiFetchMyReviews } from '@api/reviews';

//type
import type { ApiFetchMyReviewsRequest, ApiFetchMyReviewsResponse } from 'types/api';

/** 2023/08/15- 마이페이지 리뷰 패칭 쿼리  - by leekoby */
const useFetchMyReviewList = ({ page, size }: ApiFetchMyReviewsRequest) => {
  const { data, isLoading, isError } = useQuery<ApiFetchMyReviewsResponse>([QUERY_KEYS.myreview, page], () =>
    apiFetchMyReviews({ page, size }),
  );
  return { data, isLoading, isError };
};

export { useFetchMyReviewList };
