/** 2023/07/15 - 공용 카테고리 옵션 - by leekoby */
export const CategoryOption = [
  '음악',
  '미술',
  '영화',
  '문화',
  '국제',
  '역사',
  '과학',
  '스포츠',
  '요리',
  '주류',
  '정원',
  '종교',
  '전통',
  '기타',
];

/** 2023.07.13 선택된 카테고리 저장 - by mscojl24 */
/** 2023/07/15 - 기존 카테고리 저장 함수 분리 및 재사용 가능하도록 수정 - by leekoby */
export const CheckCategory = (category: string[], item: string, maxLength: number) => {
  if (category.includes(item)) {
    return category.filter(selectedItem => selectedItem !== item);
  } else {
    if (category.length < maxLength) {
      return [...category, item];
    } else {
      // 이미 최대 선택된 상태라면, 처음 선택된 카테고리를 삭제하고 새로운 카테고리 추가
      // return category;
      return [...category.slice(1), item];
    }
  }
};
