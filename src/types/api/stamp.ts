// ========================== 스탬프 리스트 ==========================
/** 2023/07/23 - 스탬프 데이터 Type - by sineTlsl */
export interface StampType {
  festivalId: number;
  stampId: number;
  category: string;
  status: string;
  stampDate: string;
  eventStartDate: string;
  eventEndDate: string;
  title: string;
  address: string;
}
/** 2023/07/23 - 스탬프 리스트 (Request) - by sineTlsl */
export interface StampListRequest {
  year: number;
  month: number;
}
/** 2023/07/23 - 스탬프 리스트 (Response) - by sineTlsl */
export interface StampListResponse {
  memberId: number;
  festivalList: StampType[];
}

// ========================== 스탬프를 찍기 위한 축제 찾기 ==========================
export interface StmapDistanceType {
  contentId: number;
  title: string;
  image: string;
  address: string;
  category: string;
  eventDate: string;
  reviewRating: number;
  reviewCount: number;
  likeCount: number;
  area: string;
  mapx: number;
  mapy: number;
}

/** 2023/08/14 - 스탬프 거리 안 축제 찾기 (Request) - by sineTlsl */
export interface StampDistanceRequest {
  mapX: number;
  mapY: number;
  distance: number;
}
/** 2023/08/14 - 스탬프 거리 안 축제 찾기  (Response) - by sineTlsl */
export interface StampDistanceResponse {
  data: StmapDistanceType[];
}
