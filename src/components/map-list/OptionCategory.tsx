import styled from 'styled-components';

//icon
import { IoIosArrowDown, IoIosOptions } from 'react-icons/io';
import { useState } from 'react';

const OptionCategory = () => {
  const [sortBy, setSortBy] = useState<string>('');

  const handleEnableOptions = (value: string) => {
    setSortBy(value);
  };

  const Options = [
    { optionName: '좋아요순', value: 'likeCount' },
    { optionName: '리뷰평점순', value: 'reviewRating' },
    { optionName: '리뷰수순', value: 'reviewCount' },
  ];

  return (
    <OptionList className="flex-h-center">
      <button>
        <IoIosOptions /> 카테고리
        <IoIosArrowDown className="icon-style" />
      </button>
      {Options.map(option => (
        <button
          onClick={() => {
            handleEnableOptions(option.value);
          }}
          data-value={option.value}
          className={sortBy === option.value ? 'selected' : ''}>
          {option.optionName}
          <IoIosArrowDown className="icon-style" />
        </button>
      ))}
    </OptionList>
  );
};

export default OptionCategory;

const OptionList = styled.aside`
  display: flex;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid rgba(173, 173, 173, 0.2);
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 20px;
  ::-webkit-scrollbar {
    display: none;
  }

  > * {
    margin: 0px 2px;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--color-main);
    border-radius: 20px;
    padding: 7px 12px;
    font-size: 1.4rem;
    color: var(--color-main);
    background: none;

    .icon-style {
      transform: translate(2px, 1px);
    }
  }

  .selected {
    background-color: var(--color-main);
    color: #fff;
  }
`;
