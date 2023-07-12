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

// 축제 리스트 카테고리별
/** 2023/07/04 - 축제 리스트 카테고리별 params (Reqeust) - by sineTlsl */
export interface CategoriesRequest {
  category?: string;
  page: number;
  size: number;
}
/** 2023/07/04 - 축제 리스트 카테고리별 (Response) - by sineTlsl */
export interface CategoriesResponse {
  data: FestivalListType[];
  pageInfo: PageInfoType;
}
