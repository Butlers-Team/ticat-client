export * from './catergory';

/** 2023/07/04 - 페이지 데이터 타입 (Response) - by sineTlsl */
export interface PageInfoType {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
