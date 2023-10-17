export interface ReviewLikeTypes {
  festivalId: number;
  reviewId: number;
}

// ============================== 리뷰 좋아요 생성 ==============================
/** 2023/07/22 - 리뷰 좋아요 생성 송신 타입 - by leekoby */
export interface ApiCreateLikeRequest {
  reviewId: number;
}
/** 2023/07/22 - 리뷰 좋아요 생성 수신 타입 - by leekoby */
export interface ApiCreateLikeResponse {}
/** 2023/07/22 - 리뷰 좋아요 생성 핸들러 - by leekoby */
export interface ApiCreateLikeHandler {
  (body: ApiCreateLikeRequest): Promise<ApiCreateLikeResponse>;
}

// ============================== 리뷰 좋아요 제거 ==============================
/** 2023/07/22 - 리뷰 좋아요 제거 송신 타입 - by leekoby */
export interface ApiDeleteLikeRequest {
  reviewId: number;
}
/** 2023/07/22 - 리뷰 좋아요 제거 수신 타입 - by leekoby */
export interface ApiDeleteLikeResponse {}
/** 2023/07/22 - 리뷰 좋아요 제거 핸들러 - by leekoby */
export interface ApiDeleteLikeHandler {
  (body: ApiDeleteLikeRequest): Promise<ApiDeleteLikeResponse>;
}
