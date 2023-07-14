/** 2023/07/09 - 축제 상세 데이터 Type - by parksubeom */
export interface RecommendListType {
  festivalId: number;
  status: string;
  title: string;
  image: string;
  address: string;
  category: string;
  eventstartdate: string;
  eventenddate: string;
  reviewRating: number;
  reviewCount: number;
  likeCount: number;
  area: string;
  mapx: number;
  mapy: number;
}

// 축제 리스트 카테고리별
/** 2023/07/04 - 축제 리스트 카테고리별 params (Reqeust) - by sineTlsl */
export interface RecommendRequest {
  category?: string;
}
/** 2023/07/04 - 축제 리스트 카테고리별 (Response) - by sineTlsl */
export interface RecommendResponse {
  data: RecommendListType[];
}
