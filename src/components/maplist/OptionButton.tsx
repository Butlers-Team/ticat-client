import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';

import { IoIosArrowDown, IoIosArrowUp, IoIosOptions } from 'react-icons/io';
import { BiSolidStar } from 'react-icons/bi';

import { mapOptions, tabCategory, useOptionStore, useCategoryStore } from '@store/mapListStore';

const OptionButton: React.FC = () => {
  // const [sortBy, setSortBy] = useState<string>('');
  // const [category, setCategory] = useState<string[]>([]);
  const [onCategoryList, setOnCategoryList] = useState<boolean>(false);

  const [scrollStartPosition, setScrollStartPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null); // CategoryScroll 컴포넌트의 ref
  const { sortBy, setSortBy } = useOptionStore();
  const { category, setCategory } = useCategoryStore();

  /** 2023.07.13 선택된 옵션 저장 - by mscojl24 */
  const handleEnableOptions = (value: string) => {
    value !== sortBy ? setSortBy(value) : setSortBy('');
  };

  const handleCategoryChange = (tab: string) => {
    setCategory(tab);
  };

  /**2023.07.13 버튼 가로 스크롤 이벤트 리스너 함수 - by mscojl24 */
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      setScrollStartPosition(event.clientX);
      setIsDragging(true);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging && scrollRef.current) {
        const scrollAmount = event.clientX - scrollStartPosition;
        scrollRef.current.scrollLeft -= scrollAmount;
        setScrollStartPosition(event.clientX);
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging, scrollStartPosition]);

  return (
    <OptionList className="flex-h-center">
      <CategoryScroll ref={scrollRef}>
        {onCategoryList && (
          <div
            className="onblur-event"
            onClick={() => {
              setOnCategoryList(false);
            }}>
            <FastivalCategory
              onClick={e => {
                e.stopPropagation();
              }}>
              {tabCategory.map(tab => (
                <li
                  key={tab}
                  className={`tab-section flex-all-center ${category.includes(tab) && 'selected-category'}`}
                  onClick={() => {
                    handleCategoryChange(tab);
                  }}>
                  {tab}
                </li>
              ))}
            </FastivalCategory>
          </div>
        )}
        <button
          onClick={() => {
            setOnCategoryList(!onCategoryList);
          }}
          className={category.length > 0 ? 'category-on' : 'category-off'}>
          <IoIosOptions className="icon-margin" /> 카테고리 {category.length > 0 && category.length}
          {onCategoryList ? (
            <IoIosArrowUp className="icon-position icon-margin" />
          ) : (
            <IoIosArrowDown className="icon-position icon-margin" />
          )}
        </button>
        {mapOptions.map(option => (
          <button
            key={option.value}
            onClick={() => {
              handleEnableOptions(option.value);
            }}
            data-value={option.value}
            className={sortBy === option.value ? 'selected-option' : ''}>
            {option.optionName} {sortBy === option.value && <BiSolidStar />}
          </button>
        ))}
      </CategoryScroll>
    </OptionList>
  );
};

export default OptionButton;

/** 2023.07.13 카테고리 버튼 디자인 - by mscojl24 */
const OptionList = styled.aside`
  position: relative;
  display: flex;
  width: 100%;
  height: 70px;
  border-bottom: 1px solid rgba(173, 173, 173, 0.2);
  padding: 20px;

  > * {
    margin-right: 2px;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 20px;
    padding: 7px 12px;
    font-size: 1.4rem;
    color: #777;
    background: none;
    cursor: pointer;

    .icon-position {
      transform: translate(2px, 1px);
    }
    .icon-margin {
      margin: 0px 3px;
    }
  }

  .category-off {
  }

  .category-on {
    color: var(--color-main);
    border-color: var(--color-main);
    background-color: #f4f7ff;
  }

  .selected-option {
    border-color: var(--color-main);
    background-color: var(--color-main);
    color: #fff;
  }
`;

/** 2023.07.13 카테고리 좌우 드래그앤 드롭 영역 - by mscojl24 */
const CategoryScroll = styled.div`
  display: flex;
  width: 100%;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  > * {
    margin: 0px 2px;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .onblur-event {
    top: 0px;
    left: 0px;
    position: absolute;
    width: 100%;
    height: 100vh;
  }
`;

/** 2023.07.13 모달 카테고리 목록 - by mscojl24 */
const FastivalCategory = styled.ul`
  display: flex;
  flex-wrap: wrap;
  top: 55px;
  left: 30px;
  position: absolute;
  width: 300px;
  border: 1px solid var(--color-light-gray);
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  background-color: #f7f7f7;
  cursor: auto;

  .tab-section {
    border-bottom: 1px solid var(--color-light-gray);
    border-right: 1px solid var(--color-light-gray);
    width: calc(100% / 3);
    padding: 15px 0px;
    font-size: 1.4rem;
    background-color: #fff;
    color: var(--color-dark);
    cursor: pointer;
    :hover {
      color: var(--color-main);
    }
  }

  .tab-section:nth-child(3n + 3) {
    border-right: none;
  }
  .tab-section:nth-last-child(-n + 2) {
    border-bottom: none;
  }

  .selected-category {
    background-color: #f5f7ff;
    color: var(--color-main);
  }
`;
