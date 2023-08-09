import React from 'react';
import FastivalCategoryButton from '@components/CommonCategoryButton';
import FastivalCategoryItem from '@components/CommonCatogoryItem';
import { CategoryOption } from '@utils/categories';

interface Props {
  category: string[];
  handleCategory: (item: string) => void;
  width?: string;
}
/** 2023/07/19 - 카테고리 리스트 공통 컴포넌트 - by leekoby */

const CommonCategoryList: React.FC<Props> = ({ category, handleCategory }): JSX.Element => {
  return (
    <FastivalCategoryButton>
      {CategoryOption.map(item => (
        <FastivalCategoryItem key={item} item={item} category={category} handleCategory={handleCategory} />
      ))}
    </FastivalCategoryButton>
  );
};

export default React.memo(CommonCategoryList);
