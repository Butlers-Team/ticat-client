// ============================== 관심사등록 ==============================
/** 2023/07/15 - 관심사등록 요청 타입 - by leekoby */
export interface ApiInterestRequest {
  displayName: string;
  categories: string[];
}
/** 2023/07/15 - 관심사등록 응답 타입 - by leekoby */
export interface ApiInterestResponse {}
/** 2023/07/15 - 관심사등록 핸들러 - by leekoby */
export interface ApiInterestHandler {
  (body: ApiInterestRequest): Promise<ApiInterestResponse>;
}
