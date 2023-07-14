import { PageInfoType } from './index';
import { FestivalListType } from 'types/api/festival';

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
