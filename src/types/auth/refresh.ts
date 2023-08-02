// ============================== 토큰 갱신 ==============================
/** 2023/08/02 - 토큰 갱신 요청 타입 - by leekoby */
export interface ApiRefreshRequest {}

/** 2023/08/02 - 토큰 갱신 응답 타입 - by leekoby */
export interface ApiRefreshResponse {
  status: number;
}

/** 2023/08/02 - 토큰 갱신 핸들러 - by leekoby */
export interface ApiRefreshHandler {
  (body: ApiRefreshRequest): Promise<ApiRefreshResponse>;
}
