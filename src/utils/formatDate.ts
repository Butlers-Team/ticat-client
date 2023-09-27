/** 2023/07/08 - 'YYYYMMDD'에서 'YYYY.MM.DD'로 날짜 문자열 형식 지정 - by sineTlsl*/
export const formatDate = (date: string): string => {
  return date.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1.$2.$3');
};

/** 2023/09/22 - 'YYYY-MM-DD'에서 'YYYY.MM.DD'로 날짜 문자열 형식 지정 - by sineTlsl*/
export const convertDateFormat = (date: string): string => {
  return date.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$1.$2.$3');
};
