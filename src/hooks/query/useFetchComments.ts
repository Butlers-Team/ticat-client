import { useInfiniteQuery } from '@tanstack/react-query';

//api
import { apiFetchComments } from '@api/comment';

//key
const QUERY_KEYS = { comment: 'comment' };

//type
import type { ApiFetchCommentsResponse } from 'types/api';

interface Props {
  festivalId: number;
  page: number;
  size: number;
}

/** 2023/07/21 - 상세페이지의 댓글들 패치하는 훅 - by leekoby */
const useFetchComments = ({ festivalId, page, size }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<ApiFetchCommentsResponse>(
    [QUERY_KEYS.comment, festivalId],
    ({ pageParam = page }) => apiFetchComments({ festivalId, page: pageParam, size }),
    {
      getNextPageParam: (lastPage, allPage) =>
        lastPage?.pageInfo?.size === size ? lastPage?.pageInfo?.page + 1 : null,
    },
  );

  return { data, fetchNextPage, hasNextPage, isFetching };
};
export { useFetchComments };
