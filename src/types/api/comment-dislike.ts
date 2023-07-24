// ============================== 댓글 싫어요 생성 ==============================
/** 2023/07/22 - 댓글 싫어요 생성 송신 타입 - by leekoby */
export interface ApiCreateDislikeRequest {
  reviewId: number;
}
/** 2023/07/22 - 댓글 싫어요 생성 수신 타입 - by leekoby */
export interface ApiCreateDislikeResponse {}
/** 2023/07/22 - 댓글 싫어요 생성 핸들러 - by leekoby */
export interface ApiCreateDislikeHandler {
  (body: ApiCreateDislikeRequest): Promise<ApiCreateDislikeResponse>;
}

// ============================== 댓글 싫어요 제거 ==============================
/** 2023/07/22 - 댓글 싫어요 제거 송신 타입 - by leekoby */
export interface ApiDeleteDislikeRequest {
  reviewId: number;
}
/** 2023/07/22 - 댓글 싫어요 제거 수신 타입 - by leekoby */
export interface ApiDeleteDislikeResponse {}
/** 2023/07/22 - 댓글 싫어요 제거 핸들러 - by leekoby */
export interface ApiDeleteDislikeHandler {
  (body: ApiDeleteDislikeRequest): Promise<ApiDeleteDislikeResponse>;
}
