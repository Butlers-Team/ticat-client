// 회원정보 조회
/** 2023/07/21 - 회원정보 데이터 Tyoe - by sineTlsl */
export interface MyInfoType {
  memberId: number;
  displayName: string;
  email: string;
  image: string;
}

/** 2023/07/21 - 회원정보 (Response) - by sineTlsl */
export interface MyInfoTypeResponse {
  data: MyInfoType[];
}
