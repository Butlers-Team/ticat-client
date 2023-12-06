// ========================== 회원정보 ==========================
/** 2023/11/22 - 아이디 중복 확인 body Type - by sineTlsl */
export interface IdDuplicationPostBodyType {
  displayName: string;
}

/** 2023/07/21 - 회원정보 데이터 Type - by sineTlsl */
export interface MyInfoType {
  memberId: number;
  displayName: string;
  email: string;
  profileUrl: string;
  pureProfileUrl: string;
  social: string;
}

/** 2023/08/13 - 회원정보 수정 데이터 Type - by sineTlsl */
export interface MyInfoPatchBodyType {
  displayName: string;
}

// ========================== 최근 축제목록 조회 ==========================
/** 2023/07/23 - 최근 축제 Type - by sineTlsl */
export interface RecentListType {
  festivalId: number;
  title: string;
  address: string;
  eventStartDate: string;
  eventEndDate: string;
  imageUrl: string;
  favorite: boolean;
}

// ========================== 회원 관심사 조회 ==========================
/** 2023/08/09 - 관심사 Type - by sineTlsl */
export interface InterestType {
  categories: string[];
}

/** 2023/08/13 - 관심사 수정 데이터 Type - by sineTlsl */
export interface InterestPatchBodyType {
  categories: string[];
}
