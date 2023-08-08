type settingDataType = {
  [key: string]: optionType[];
};

interface optionType {
  name: string;
  subtext: string;
}

/** 2023/07/13 - 전체 지역 데이터들 - by sineTlsl */
export const settingData: settingDataType = {
  계정관리: [
    { name: '로그아웃', subtext: '' },
    { name: '회원탈퇴', subtext: '' },
  ],
  고객지원: [
    { name: '버전정보', subtext: '1.0.0 v' },
    { name: `의견보내기:카카오톡 'TICAT' 검색`, subtext: '' },
    { name: '공지사항', subtext: '' },
  ],
  제작자: [{ name: '버틀러스', subtext: '' }],
};
