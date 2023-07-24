import { Member } from 'types/auth';
import { PageInfoType } from '.';

interface CommentType {
  commentCount: number;
  disliked: boolean;
  dislikedCount: number;
  liked: boolean;
  likedCount: number;
  pictures: string[] | [];
  rating: number;
  reviewId: number;
}

export interface CommentResponse extends Comment, Member, CommentType {}

// ==============댓글 패치 요청 ===========================
/** 2023/07/21- 댓글 패치 요청 타입 - by leekoby */
export interface ApiFetchCommentsRequest {
  festivalId: number;
  page: number;
  size: number;
}
/** 2023/07/21- 댓글 패치 수신 타입 - by leekoby */
export interface ApiFetchCommentsResponse {
  data: CommentResponse[];
  pageInfo: PageInfoType;
}
/** 2023/07/21- 댓글 패치 핸들러 타입 - by leekoby */
export interface ApiFetchCommentsHandler {
  (body: ApiFetchCommentsRequest): Promise<ApiFetchCommentsResponse>;
}
// ==============댓글 등록 ===========================

/** 2023/07/21- 댓글 타입 - by leekoby */
export interface Comment {
  content: string;
  rating: number;
}
/** 2023/07/21- 댓글 등록 요청 타입  - by leekoby */
export interface ApiCreateCommentRequest {
  festivalId: number;
  review: Comment;
  reviewImages: File[];
}
/** 2023/07/21- 댓글 등록 수신 타입  - by leekoby */
export interface ApiCreateCommentResponse {
  success?: boolean;
  error?: string;
}
/** 2023/07/21- 댓글 등록 요청 핸들러  - by leekoby */
export interface ApiCreateCommentHandler {
  (body: ApiCreateCommentRequest): Promise<ApiCreateCommentResponse>;
}

// ==============댓글 수정 요청 ===========================

/** 2023/07/21- 댓글 수정 요청 타입  - by leekoby */
export interface ApiUpdateCommentRequest {
  commentId: number;
  review: Comment;
  reviewImages?: File[];
}
/** 2023/07/21- 댓글 수정 수신 타입  - by leekoby */
export interface ApiUpdateCommentResponse {
  success?: boolean;
  error?: string;
}
/** 2023/07/21- 댓글 수정 핸들러  - by leekoby */
export interface ApiUpdateCommentHandler {
  (body: ApiUpdateCommentRequest): Promise<ApiUpdateCommentResponse>;
}
// ==============댓글 삭제 요청 ===========================
/** 2023/07/21- 댓글 삭제 요청 타입  - by leekoby */
export interface ApiDeleteCommentRequest {
  festivalId: number;
  commentId: number;
}
/** 2023/07/21- 댓글 삭제 수신 타입  - by leekoby */
export interface ApiDeleteCommentResponse {
  success?: boolean;
  error?: string;
}
/** 2023/07/21- 댓글 삭제 핸들러  - by leekoby */
export interface ApiDeleteCommentHandler {
  (body: ApiDeleteCommentRequest): Promise<ApiDeleteCommentResponse>;
}
