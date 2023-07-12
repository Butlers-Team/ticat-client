/** 2023.07.13 특정 length 이상일때 말 줄임표 형식지정 함수 */
export const truncatedText = (text: string, maxLength: number) => {
  const reText = text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return reText;
};
