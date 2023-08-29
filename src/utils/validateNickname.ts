/** 2023/08/12 - 닉네임 유효성 검사 - by leekoby */
// 빈칸없음, 완전한 한글, 최소 5자, 최대 8자
export const validateNickname = (name: string): string => {
  if (name.length > 0) {
    if (/\s/.test(name)) {
      return '닉네임에 공백을 포함할 수 없습니다.';
    }
    if (!/^[가-힣a-zA-Z0-9]+$/.test(name)) {
      return '닉네임은 한글, 영문, 숫자만 가능합니다.';
    }
    if (name.length < 2) {
      return '닉네임은 최소 2자 이상이어야 합니다.';
    }
    if (name.length > 8) {
      return '닉네임은 최대 8자까지 가능합니다.';
    }
  }

  return ''; // 유효한 닉네임인 경우, 빈 문자열을 반환
};
