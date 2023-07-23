// 회원정보 조회
/** 2023/07/21 - 회원정보 데이터 Type - by sineTlsl */
export interface MyInfoType {
  memberId: number;
  displayName: string;
  email: string;
  profileUrl: string;
  pureProfileUrl: string;
}

// 최근 축제목록 조회
/** 2023/07/23 - 최근 축제 Type - by sineTlsl */
export interface RecentListType {
  festivalId: number;
  title: string;
  address: string;
  eventStartDate: string;
  eventEndDate: string;
  imageUrl: string;
}
