import React from 'react';
import CommonCategoryButton from '@components/CommonCategoryButton';
import CommonCatogoryItem from '@components/CommonCatogoryItem';
import { CategoryOption } from '@utils/categories';

interface Props {
  category: string[];
  handleCategory: (item: string) => void;
  width?: string;
}
/** 2023/07/19 - 카테고리 리스트 공통 컴포넌트 - by leekoby */

const CommonCategoryList: React.FC<Props> = ({ category, handleCategory, width }): JSX.Element => {
  return (
    <CommonCategoryButton width={width}>
      {CategoryOption.map(item => (
        <CommonCatogoryItem key={item} item={item} category={category} handleCategory={handleCategory} />
      ))}
    </CommonCategoryButton>
  );
};

export default React.memo(CommonCategoryList);
