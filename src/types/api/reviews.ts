import { Member } from 'types/auth';
import { PageInfoType } from '.';

interface ReviewType {
  commentCount: number;
  disliked?: boolean;
  dislikedCount: number;
  liked?: boolean;
  likedCount: number;
  pictures: string[] | [];
  reviewId: number;
  festivalId: number;
  createdAt: string;
  modifiedAt?: string;
}

export interface ReviewResponse extends Review, Member, ReviewType {}

export interface MyReviewResponse extends ReviewType, Review {
  festivalTitle: string;
  memberId: number;
}

// ==============리뷰 패치 요청 ===========================
/** 2023/07/21- 리뷰 패치 요청 타입 - by leekoby */
export interface ApiFetchReviewsRequest {
  festivalId: number;
  page: number;
  size: number;
}
/** 2023/07/21- 리뷰 패치 수신 타입 - by leekoby */
export interface ApiFetchReviewsResponse {
  data: ReviewResponse[];
  pageInfo: PageInfoType;
}
/** 2023/07/21- 리뷰 패치 핸들러 타입 - by leekoby */
export interface ApiFetchReviewsHandler {
  (body: ApiFetchReviewsRequest): Promise<ApiFetchReviewsResponse>;
}

// ==============리뷰 등록 ===========================

/** 2023/07/21- 리뷰 타입 - by leekoby */
export interface Review {
  content: string;
  rating: number;
}
/** 2023/07/21- 리뷰 등록 요청 타입  - by leekoby */
export interface ApiCreateReviewRequest {
  festivalId: number;
  review: Review;
  reviewImages: File[];
}
/** 2023/07/21- 리뷰 등록 수신 타입  - by leekoby */
export interface ApiCreateReviewResponse {
  success?: boolean;
  error?: string;
}
/** 2023/07/21- 리뷰 등록 요청 핸들러  - by leekoby */
export interface ApiCreateReviewHandler {
  (body: ApiCreateReviewRequest): Promise<ApiCreateReviewResponse>;
}

// ==============리뷰 수정 요청 ===========================

/** 2023/07/21- 리뷰 수정 요청 타입  - by leekoby */
export interface ApiUpdateReviewRequest {
  reviewId?: number;
  review: Review;
  reviewImages?: File[];
}
/** 2023/07/21- 리뷰 수정 수신 타입  - by leekoby */
export interface ApiUpdateReviewResponse {
  success?: boolean;
  error?: string;
}
/** 2023/07/21- 리뷰 수정 핸들러  - by leekoby */
export interface ApiUpdateReviewHandler {
  (body: ApiUpdateReviewRequest): Promise<ApiUpdateReviewResponse>;
}
// ==============리뷰 삭제 요청 ===========================
/** 2023/07/21- 리뷰 삭제 요청 타입  - by leekoby */
export interface ApiDeleteReviewRequest {
  reviewId: number;
}
/** 2023/07/21- 리뷰 삭제 수신 타입  - by leekoby */
export interface ApiDeleteReviewResponse {
  success?: boolean;
  error?: string;
}
/** 2023/07/21- 리뷰 삭제 핸들러  - by leekoby */
export interface ApiDeleteReviewHandler {
  (body: ApiDeleteReviewRequest): Promise<ApiDeleteReviewResponse>;
}

// ============== 마이페이지 리뷰 패치 요청 ===========================
/** 2023/08/14- 마이페이지 리뷰 패치 요청 타입 - by leekoby */
export interface ApiFetchMyReviewsRequest {
  page: number;
  size: number;
}
/** 2023/07/21- 마이페이지 리뷰 패치 수신 타입 - by leekoby */
export interface ApiFetchMyReviewsResponse {
  data: MyReviewResponse[];
  pageInfo: PageInfoType;
}
/** 2023/07/21- 마이페이지 리뷰 패치 핸들러 타입 - by leekoby */
export interface ApiFetchMyReviewsHandler {
  (body: ApiFetchMyReviewsRequest): Promise<ApiFetchMyReviewsResponse>;
}
