import { useQuery } from '@tanstack/react-query';
//key
import { QUERY_KEYS } from '.';

//api
import { apiFetchBlogPosts } from '@api/blogpost';

//type
import { ApiBlogPostsHandler, ApiBlogPostsRequest, ApiBlogPostsResponse } from 'types/api';

/** 2023/07/20 - 리뷰영역 블로그 게시글 리스트 패치하는 훅 - by leekoby */
const useFetchBlogPosts = (festivalName: string) => {
  const { data, isLoading } = useQuery<ApiBlogPostsResponse>([QUERY_KEYS.blogPosts], () => {
    return apiFetchBlogPosts({ festivalName });
  });

  return { data, isLoading };
};

export { useFetchBlogPosts };
