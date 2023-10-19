// TextArea /n 태그를 <br>로 바꾸는 함수
export const convertNewLinesToBr = (content: string): string => {
  return content.replace(/\n/g, '<br>');
};

// <br> 태그를 TextArea /n 으로 바꾸는 함수
export const contentBrtoNewLines = (content?: string): string => {
  if (!content) return '';

  return content.replace(/<br\s*\/?>/g, '\n');
};
