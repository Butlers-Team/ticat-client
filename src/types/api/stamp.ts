// STAMP
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
