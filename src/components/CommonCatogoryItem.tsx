import React from 'react';

type Props = {
  item: string;
  category: string[];
  handleCategory: (item: string) => void;
};

/** 2023/07/19 - 카테고리 버튼 공통 컴포넌트 - by leekoby */
const CommonCategoryItem: React.FC<Props> = ({ item, category, handleCategory }) => (
  <li
    className={`tab-section flex-all-center ${category.includes(item) && 'selected-category'}`}
    onClick={() => {
      handleCategory(item);
    }}>
    {item}
  </li>
);

export default CommonCategoryItem;
