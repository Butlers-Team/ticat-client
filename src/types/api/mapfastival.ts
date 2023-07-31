/** 2023/07/09 - 맵 리스트 축제 Type - by mscojl24 */
export interface MapFastivalType {
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
/**2023/07/23 - 맵 리스트 params (Reqeust) */

export interface MapFastivalRequest {
  keyword: string;
  categories: string;
  sortBy: string;
  page: number;
  size: number;
}

/** 2023/07/04 - 맵 리스트 Response   - by mscojl24 */
export interface MapFastivalResponse {
  data?: MapFastivalType[];
}
