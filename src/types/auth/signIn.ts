// ============================== 로그인 ==============================
/** 2023/07/07 - 로그인 요청 타입 - by leekoby */
export interface ApiSignInRequest {
  id: string;
  password: string;
}

export interface ApiSignInSuccess {
  data: ApiSignInResponse;
  accessToken: string;
  refreshToken: string;
}

/** 2023/07/07 - 로그인 응답 타입 - by leekoby */
export interface ApiSignInResponse {}
/** 2023/07/07 - 로그인 핸들러 - by leekoby */
export interface ApiSignInHandler {
  (body: ApiSignInRequest): Promise<ApiSignInSuccess>;
}
