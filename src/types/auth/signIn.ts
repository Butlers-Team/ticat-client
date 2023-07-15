// ============================== 로그인 ==============================
/** 2023/07/07 - 로그인 요청 타입 - by leekoby */
export interface ApiSignInRequest {
  id: string;
  password: string;
}
/** 2023/07/14 - 로그인 성공 응답 타입 - by leekoby */
export type ApiSignInSuccess =
  | {
      data: ApiSignInResponse;
      accessToken: string;
      refreshToken: string;
    }
  | unknown;

/** 2023/07/07 - 로그인 응답 타입 - by leekoby */
export interface ApiSignInResponse {
  message?: string;
}
/** 2023/07/07 - 로그인 핸들러 - by leekoby */
export interface ApiSignInHandler {
  (body: ApiSignInRequest): Promise<ApiSignInSuccess>;
}
