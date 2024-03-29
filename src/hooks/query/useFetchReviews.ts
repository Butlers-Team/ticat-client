import { useInfiniteQuery } from '@tanstack/react-query';

//api
import { apiFetchReviews } from '@api/reviews';

//key
import { QUERY_KEYS } from './queryKeys';

//type
import type { ApiFetchReviewsResponse } from 'types/api';

interface Props {
  festivalId: number;
  page: number;
  size: number;
}

/** 2023/07/21 - 상세페이지의 리뷰들 패치하는 훅 - by leekoby */
const useFetchReviews = ({ festivalId, page, size }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError } =
    useInfiniteQuery<ApiFetchReviewsResponse>(
      [QUERY_KEYS.review, festivalId],
      ({ pageParam = page }) => apiFetchReviews({ festivalId, page: pageParam, size }),
      {
        getNextPageParam: lastPage => {
          const { page, totalPages } = lastPage.pageInfo;
          const nextPage = page + 1;
          if (nextPage <= totalPages) {
            return nextPage;
          } else {
            return null;
          }
        },
      },
    );

  return { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError };
};
export { useFetchReviews };
