/** 2023/07/09 - 메인 축제 데이터 Type - by mscojl24 */
export interface MainFastivalType {
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

/** 2023/07/04 - 메인 축제 Response   - by mscojl24 */
export interface MainFastivalResponse {
  data?: MainFastivalType[];
}
