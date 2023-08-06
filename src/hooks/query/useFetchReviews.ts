import { useInfiniteQuery } from '@tanstack/react-query';

//api
import { apiFetchReviews } from '@api/reviews';

//key
const QUERY_KEYS = { review: 'review' };

//type
import type { ApiFetchReviewsResponse } from 'types/api';

interface Props {
  festivalId: number;
  page: number;
  size: number;
}

/** 2023/07/21 - 상세페이지의 리뷰들 패치하는 훅 - by leekoby */
const useFetchReviews = ({ festivalId, page, size }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<ApiFetchReviewsResponse>(
    [QUERY_KEYS.review, festivalId],
    ({ pageParam = page }) => apiFetchReviews({ festivalId, page: pageParam, size }),
    {
      getNextPageParam: (lastPage, allPage) =>
        lastPage?.pageInfo?.size === size ? lastPage?.pageInfo?.page + 1 : null,
    },
  );

  return { data, fetchNextPage, hasNextPage, isFetching };
};
export { useFetchReviews };
