import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface Props {
  width?: string;
}

/** 2023/07/19 - 카테고리 버튼 공통 컴포넌트 - by leekoby */
const CommonCategoryButton: React.FC<PropsWithChildren<Props>> = ({ children, width }): JSX.Element => {
  return <FastivalCategory width={width}>{children}</FastivalCategory>;
};
export default CommonCategoryButton;

const FastivalCategory = styled.ul<{ width?: string }>`
  display: flex;
  flex-wrap: wrap;
  /* width: 300px; */
  width: ${({ width }) => width};
  overflow: hidden;
  border-radius: 10px;
  cursor: auto;

  .tab-section {
    margin: 0.5rem;
    height: 5.5rem;
    border: 1px solid var(--color-dark-gray);
    width: calc(30%);
    /* width: ${({ width }) => (width ? width : 'calc(30%)')}; */
    padding: 15px 0px;
    font-size: 1.4rem;
    background-color: #fff;
    color: var(--color-dark);
    cursor: pointer;
    border-radius: 0.5rem;
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
