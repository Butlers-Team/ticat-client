import Button from '@components/Button';
import { CategoryOption, CheckCategory } from '@utils/categories';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

interface Props {
  category: string[];
  setCategory: React.Dispatch<React.SetStateAction<string[]>>;
  onSubmit: () => void;
}

/** 2023/07/15 - 관심 카테고리 등록 컴포넌트 - by leekoby */
const CategoryComponent: React.FC<Props> = ({ category, setCategory, onSubmit }): JSX.Element => {
  const maxLength = 5;

  const handleCategory = (item: string) => {
    setCategory(prevState => CheckCategory(prevState, item, maxLength));
  };

  return (
    <>
      <FastivalCategory>
        {CategoryOption.map(item => (
          <li
            key={item}
            className={`tab-section flex-all-center ${category.includes(item) && 'selected-category'}`}
            onClick={() => {
              handleCategory(item);
            }}>
            {item}
          </li>
        ))}
      </FastivalCategory>
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

const FastivalCategory = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  overflow: hidden;
  border-radius: 10px;
  cursor: auto;

  .tab-section {
    margin: 0.5rem;
    height: 5.5rem;
    border: 1px solid var(--color-dark-gray);
    width: calc(30%);
    padding: 15px 0px;
    font-size: 1.4rem;
    background-color: #fff;
    color: var(--color-dark);
    cursor: pointer;
    border-radius: 1rem;
    :hover {
      color: var(--color-main);
    }
  }

  .selected-category {
    font-weight: bold;
    background-color: #f5f7ff;
    color: var(--color-main);
    border: 2px solid var(--color-main);
  }
`;
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
