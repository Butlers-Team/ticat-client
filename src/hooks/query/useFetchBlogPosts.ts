//query
import { useQuery } from '@tanstack/react-query';

//key
import { QUERY_KEYS } from './queryKeys';

//api
import { apiFetchBlogPosts } from '@api/blogpost';

//type
import { ApiBlogPostsResponse } from 'types/api';

/** 2023/07/20 - 리뷰영역 블로그 게시글 리스트 패치하는 훅 - by leekoby */
const useFetchBlogPosts = (festivalName: string) => {
  const { data, isLoading, isError } = useQuery<ApiBlogPostsResponse>([QUERY_KEYS.blogPosts, festivalName], () => {
    return apiFetchBlogPosts({ festivalName });
  });
  return { data, isLoading, isError };
};

export { useFetchBlogPosts };
