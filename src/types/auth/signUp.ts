// ============================== 회원가입 ==============================
/** 2023/07/09 - 회원가입 요청 타입 - by leekoby */
export interface ApiSignUpRequest {
  id: string;
  email: string;
  password: string;
  confirmPassword: string;
}
/** 2023/07/09 - 회원가입 응답 타입 - by leekoby */
export interface ApiSignUpResponse {}
/** 2023/07/09 - 회원가입 핸들러 - by leekoby */
export interface ApiSignUpHandler {
  (body: ApiSignUpRequest): Promise<ApiSignUpResponse>;
}
