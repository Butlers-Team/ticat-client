export interface CommentResponse {
  content: string;
  createdAt: string;
  displayName: string;
  memberId: number;
  modifiedAt?: string;
  profileUrl?: string;
  reviewCommentId: number;
}

// ============== 댓글 패치 요청 ===========================

import { PageInfoType } from '.';

/** 2023/08/07- 댓글 패치 요청 타입 - by leekoby */
export interface ApiFetchCommentsRequest {
  reviewId: number;
  page: number;
  size: number;
}

/** 2023/08/07- 댓글 패치 수신 타입 - by leekoby */
export interface ApiFetchCommentsResponse {
  data: CommentResponse[];
  pageInfo: PageInfoType;
}
/** 2023/08/07- 댓글 패치 핸들러 타입 - by leekoby */
export interface ApiFetchCommentsHandler {
  (body: ApiFetchCommentsRequest): Promise<ApiFetchCommentsResponse>;
}
// ==============댓글 등록 ===========================

/** 2023/08/07- 댓글 등록 요청 타입  - by leekoby */
export interface ApiCreateCommentRequest {
  reviewId: number;
  content: string;
}
/** 2023/08/07- 댓글 등록 수신 타입  - by leekoby */

export interface ApiCreateCommentResponse {}

/** 2023/08/07- 댓글 등록 요청 핸들러  - by leekoby */
export interface ApiCreateCommentHandler {
  (body: ApiCreateCommentRequest): Promise<ApiCreateCommentResponse>;
}

// ==============댓글 수정 요청 ===========================

/** 2023/08/07- 댓글 수정 요청 타입  - by leekoby */
export interface ApiUpdateCommentRequest {}
/** 2023/08/07- 댓글 수정 수신 타입  - by leekoby */
export interface ApiUpdateCommentResponse {}
/** 2023/08/07- 댓글 수정 핸들러  - by leekoby */
export interface ApiUpdateCommentHandler {
  (body: ApiUpdateCommentRequest): Promise<ApiUpdateCommentResponse>;
}
// ==============댓글 삭제 요청 ===========================
/** 2023/08/07- 댓글 삭제 요청 타입  - by leekoby */
export interface ApiDeleteCommentRequest {}
/** 2023/08/07- 댓글 삭제 수신 타입  - by leekoby */
export interface ApiDeleteCommentResponse {}
/** 2023/08/07- 댓글 삭제 핸들러  - by leekoby */
export interface ApiDeleteCommentHandler {
  (body: ApiDeleteCommentRequest): Promise<ApiDeleteCommentResponse>;
}
