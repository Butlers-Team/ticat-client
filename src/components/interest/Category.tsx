import Button from '@components/Button';
import CommonCategoryList from '@components/CommonCategoryList';
import { CheckCategory } from '@utils/categories';
import React from 'react';
import styled from 'styled-components';

interface Props {
  category: string[];
  setCategory: React.Dispatch<React.SetStateAction<string[]>>;
  onSubmit: () => void;
}

/** 2023/07/15 - 관심 카테고리 등록 컴포넌트 - by leekoby */
const CategoryComponent: React.FC<Props> = ({ category, setCategory, onSubmit }): JSX.Element => {
  const maxLength = 5;

  // 카테고리 선택함수
  const handleCategory = (item: string) => {
    setCategory(prevState => CheckCategory(prevState, item, maxLength));
  };

  return (
    <>
      <CommonCategoryList category={category} handleCategory={handleCategory} width={'300px'} />
      <ButtonContainer>
        <Button fontSize="1.6rem" disabled={category.length < 1} onClick={onSubmit}>
          <span>확인</span>
          <span>
            {category.length}/{maxLength}
          </span>
        </Button>
      </ButtonContainer>
    </>
  );
};

export const Category = React.memo(CategoryComponent);

/** 2023/07/15 - 버튼 컨테이너  - by leekoby */
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  text-align: center;
  flex-direction: column;
  margin: 5px auto;
  width: 300px;

  Button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;

    span:first-child {
      flex-grow: 1;
      text-align: center;
    }
  }
`;
