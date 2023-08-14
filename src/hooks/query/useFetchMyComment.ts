import { useQuery } from '@tanstack/react-query';
//api
import { apiFetchMyComments } from '@api/comment';

//key
import { QUERY_KEYS } from './queryKeys';

//type
import type { ApiFetchMyCommentsHandler, ApiFetchMyCommentsRequest, ApiFetchMyCommentsResponse } from 'types/api';

/** 2023/08/15- 마이페이지 댓글 패칭 쿼리  - by leekoby */
const useFetchMyCommentsList = ({ page, size }: ApiFetchMyCommentsRequest) => {
  const { data, isFetching } = useQuery<ApiFetchMyCommentsResponse>([QUERY_KEYS.mycomment, page], () =>
    apiFetchMyComments({ page, size }),
  );
  return { data, isFetching };
};

export { useFetchMyCommentsList };
