/** 2023/07/18 - 공백 2개를 기준으로 문자열 분리 - by sineTlsl */
export const splitAddress = (address: string): string => {
  const splitAddress = address.split(' ');

  switch (splitAddress.length) {
    case 1:
      return splitAddress[0];
    case 2:
      return splitAddress[0] + ' ' + splitAddress[1];
    default:
      return splitAddress[0] + ' ' + splitAddress[1] + ' ' + splitAddress[2];
  }
};
