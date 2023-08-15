//query
import { useQuery } from '@tanstack/react-query';

//key
import { QUERY_KEYS } from './queryKeys';

//api
import { apiFetchMyComments } from '@api/comment';

//type
import type { ApiFetchMyCommentsRequest, ApiFetchMyCommentsResponse } from 'types/api';

/** 2023/08/15- 마이페이지 댓글 패칭 쿼리  - by leekoby */
const useFetchMyCommentsList = ({ page, size }: ApiFetchMyCommentsRequest) => {
  const { data, isFetching, isLoading, isError } = useQuery<ApiFetchMyCommentsResponse>(
    [QUERY_KEYS.mycomment, page],
    () => apiFetchMyComments({ page, size }),
  );
  return { data, isFetching, isLoading, isError };
};

export { useFetchMyCommentsList };
