import styled from 'styled-components';

//icon
import { IoIosArrowDown, IoIosOptions } from 'react-icons/io';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';

const OptionCategory = () => {
  const [sortBy, setSortBy] = useState<string>('');
  const scrollRef = useRef<HTMLDivElement>(null); // 스크롤 가능한 요소 참조
  const scrollAmount = 100; // 한 번에 스크롤할 양
  const [scrollPosition, setScrollPosition] = useState(0); // 스크롤의 현재 위치
  const [maxScrollLeft, setMaxScrollLeft] = useState(0); // 가능한 최대 위치

  /** 2023/07/11 - left 화살표 클릭 시 왼쪽 스크롤 함수 - by sineTlsl */
  const HandlerScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= scrollAmount;
    }
  };
  /** 2023/07/11 - right 화살표 클릭 시 오른쪽 스크롤 함수 - by sineTlsl */
  const HandlerScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollAmount;
    }
  };

  /** 2023/07/11 - 컴포넌트가 마운트 or 언마운트 되었을 때, 스크롤 이벤트 리스너 추가 및 제거하는 함수 - by sineTlsl */
  useEffect(() => {
    const onScroll = () => {
      if (scrollRef.current) {
        setScrollPosition(scrollRef.current.scrollLeft);
      }
    };
    scrollRef.current?.addEventListener('scroll', onScroll);

    return () => scrollRef.current?.removeEventListener('scroll', onScroll);
  }, []);

  /** 2023/07/08 - 스크롤이 이동할 때마다 현재 스크롤 위치를 계산하고 업데이트 하는 함수 - by sineTlsl */
  useEffect(() => {
    if (scrollRef.current) {
      setMaxScrollLeft(scrollRef.current.scrollWidth - scrollRef.current.clientWidth);
    }
  }, []); // 탭 카테고리가 변경될 때마다 maxScrollLeft 업데이트

  /**2023.07.13 활성화된 옵션 값 저장 함수 */
  const handleEnableOptions = (value: string) => {
    const result = value !== sortBy ? setSortBy(value) : setSortBy('');
    return result;
  };

  const Options = [
    { optionName: '좋아요순', value: 'likeCount' },
    { optionName: '리뷰평점순', value: 'reviewRating' },
    { optionName: '리뷰수순', value: 'reviewCount' },
  ];

  return (
    <OptionList className="flex-h-center">
      {scrollPosition > 0 && (
        <ArrowWrap onClick={HandlerScrollLeft}>
          <MdArrowBackIosNew size="20px" color="var(--color-sub)" />
        </ArrowWrap>
      )}
      <CategoryScroll ref={scrollRef}>
        <button>
          <IoIosOptions className="icon-margin" /> 카테고리
          <IoIosArrowDown className="icon-position icon-margin" />
        </button>
        {Options.map(option => (
          <button
            onClick={() => {
              handleEnableOptions(option.value);
            }}
            data-value={option.value}
            className={sortBy === option.value ? 'selected' : ''}>
            {option.optionName}
          </button>
        ))}
      </CategoryScroll>
      <ArrowWrap onClick={HandlerScrollRight}>
        {scrollPosition < maxScrollLeft && <MdArrowForwardIos size="20px" color="var(--color-sub)" />}
      </ArrowWrap>
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

    .icon-position {
      transform: translate(2px, 1px);
    }
    .icon-margin {
      margin: 0px 2px;
    }
  }

  .selected {
    background-color: var(--color-main);
    color: #fff;
  }
`;
const CategoryScroll = styled.div`
  display: flex;
  width: 100%;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;

  > * {
    margin: 0px 2px;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;
const ArrowWrap = styled.div`
  width: 3.5rem;
  cursor: pointer;
`;
