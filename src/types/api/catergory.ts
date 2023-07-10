import { PageInfoType } from './index';

/** 2023/07/04 - 축제 리스트 데이터 Type - by sineTlsl */
export interface FestivalListType {
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
export interface FestivalDetailType {
  address: string;
  eventenddate: string;
  eventhomepage: string;
  eventplace: string;
  eventstartdate: string;
  festivalId: number;
  image: string;
  mapx: number;
  mapy: number;
  overview: string;
  playtime: string;
  price: string;
  status: string;
  tel: string;
  title: string;
}

// 축제 리스트 카테고리별
/** 2023/07/04 - 축제 리스트 카테고리별 params (Reqeust) - by sineTlsl */
export interface CatergoriesRequest {
  category?: string;
  page: number;
  size: number;
}
/** 2023/07/04 - 축제 리스트 카테고리별 (Response) - by sineTlsl */
export interface CatergoriesResponse {
  data: FestivalListType[];
  pageInfo: PageInfoType;
}
