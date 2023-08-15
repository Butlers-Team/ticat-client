/**2023.07.25 허용한 마크업 태그만 html 변환 - by mscojl24 */
/**2023.08.09 마크업 태그 html 변환 util에 추가 - by leekoby */

import sanitizeHtml from 'sanitize-html';

export const getSanitizedContent = (content: string): string => {
  return sanitizeHtml(content, {
    allowedTags: ['br', 'b'],
    allowedAttributes: {},
  });
};
