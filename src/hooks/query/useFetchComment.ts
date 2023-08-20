//query
import { useInfiniteQuery } from '@tanstack/react-query';

//key
import { QUERY_KEYS } from './queryKeys';

//api
import { apiFetchComments } from '@api/comment';

//type
import type { ApiFetchCommentsResponse, ApiFetchCommentsRequest } from 'types/api';

/** 2023/08/07 - 리뷰에 달린 댓글들 패치하는 훅 - by leekoby */
const useFetchComments = ({ reviewId, page, size }: ApiFetchCommentsRequest) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError } =
    useInfiniteQuery<ApiFetchCommentsResponse>(
      [QUERY_KEYS.comment, reviewId],
      ({ pageParam = page }) => apiFetchComments({ reviewId, page: pageParam, size }),
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

export { useFetchComments };
