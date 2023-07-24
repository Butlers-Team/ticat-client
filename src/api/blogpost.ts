import instance from './axiosInstance';

//type
import type { ApiBlogPostsHandler, ApiBlogPostsRequest, ApiBlogPostsResponse } from 'types/api';

/** 2023/07/20 - 블로그 게시물 GET 요청 - by leekoby */
export const apiFetchBlogPosts: ApiBlogPostsHandler = async ({ festivalName }) => {
  const { data } = await instance.get<ApiBlogPostsResponse>(`/naverblog/?festival=${festivalName}`, {
    headers: {
      'No-Auth': true,
    },
  });

  return data;
};
