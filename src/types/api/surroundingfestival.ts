/** 2023/07/09 - 주변축제 Type - by mscojl24 */
export interface surroundType {
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
/** 2023/07/04 - 주변축제 params (Reqeust) - by mscojl24 */
export interface surroundTypeRequest {
  mapX?: number;
  mapY?: number;
  distance?: number;
}
/** 2023/07/04 - 주변축제 (Response) - by mscojl24 */
export interface surroundTypeResponse {
  data: surroundType[];
}
