/** 2023/08/02- 토큰 만료시간 변환 함수 - by leekoby */
export const dateToSeconds = (dateString: string) => {
  const date = new Date(dateString);
  const seconds = Math.floor(date.getTime() / 1000);

  return `${seconds}`;
};
