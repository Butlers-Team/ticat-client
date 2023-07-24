/** 2023/07/20 - naver blog 게시글 타입 - by leekoby */
export interface ApiBlogPost {
  title: string;
  link: string;
  description: string;
  bloggername: string;
  postdate: string;
}

/** 2023/07/20 - naver blog 게시글 요청 타입 - by leekoby */
export interface ApiBlogPostsRequest {
  festivalName: string;
}

/** 2023/07/20 - naver blog 게시글 응답 - by leekoby */
export type ApiBlogPostsResponse = ApiBlogPost[];

/** 2023/07/20 - naver blog 게시글 핸들러 - by leekoby */
export interface ApiBlogPostsHandler {
  (body: ApiBlogPostsRequest): Promise<ApiBlogPostsResponse>;
}
