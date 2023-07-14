import Button from '@components/Button';
import { useState } from 'react';
import styled from 'styled-components';

interface Props {}

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

const Category: React.FC<Props> = (props): JSX.Element => {
  const [category, setCategory] = useState<string[]>([]);

  /** 2023.07.13 선택된 카테고리 저장 - by mscojl24 */
  const CheckCategory = (item: string) => {
    if (category.includes(item)) {
      setCategory(prevState => prevState.filter(selectedItem => selectedItem !== item));
    } else {
      if (category.length < 5) {
        // 카테고리 5개 이상 선택시 추가 불가
        setCategory(prevState => [...prevState, item]);
      }
    }
  };

  console.log(category);
  return (
    <>
      <FastivalCategory>
        {CategoryOption.map(item => (
          <li
            key={item}
            className={`tab-section flex-all-center ${category.includes(item) && 'selected-category'}`}
            onClick={() => {
              CheckCategory(item);
            }}>
            {item}
          </li>
        ))}
      </FastivalCategory>
      <ButtonContainer>
        <Button fontSize="1.6rem">
          <span>확인</span>
          <span>{category.length}/5</span>
        </Button>
      </ButtonContainer>
    </>
  );
};

export default Category;

const FastivalCategory = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  overflow: hidden;
  border-radius: 10px;
  cursor: auto;

  .tab-section {
    margin: 0.5rem;
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
