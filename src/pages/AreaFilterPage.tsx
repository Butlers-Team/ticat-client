import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { areas } from '@data/areaData';

// components
import AreaDropDown from '@components/areaFilter/AreaDropDown';

// icons
import { MdArrowBackIosNew } from 'react-icons/md';
import { AiFillCloseCircle } from 'react-icons/ai';

const AreaFilterPage = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const navigate = useNavigate();

  /** 2023/07/14 - 이전 페이지 이동 함수 - by sineTlsl */
  const goBackPage = () => {
    navigate('/festival');
  };

  /** 2023/07/14 - 선택된 지역들을 목록에 업데이트하는 함수 - by sineTlsl */
  // const handlerSelectItem = (item: string) => {
  //   setSelectedItems(item);
  // };

  /** 2023/07/14 - 특정 지역 삭제 함수 - by sineTlsl */
  const handlerRemoveItem = (removeIdx: number) => {
    const filterItems = selectedItems.filter((_, idx) => idx !== removeIdx);

    setSelectedItems(filterItems);
  };

  return (
    <AreaFilterContainer>
      <TopWrap>
        <div className="top-left">
          <button className="back-btn" onClick={goBackPage}>
            <MdArrowBackIosNew size="18px" color="var(--color-dark-gray)" />
          </button>
        </div>
        <div className="area-filter-title">지역설정</div>
      </TopWrap>
      <AreaWrap>
        <p className="area-description">지역은 5개까지만 선택이 가능합니다.</p>
        <ul className="select-items ">
          {selectedItems.map((item, idx) => (
            <li className="area-tag" key={idx}>
              <span className="tag-title">{item}</span>
              <span onClick={() => handlerRemoveItem(idx)}>
                <AiFillCloseCircle size="15px" color="var(--color-light)" />
              </span>
            </li>
          ))}
        </ul>
        <div className="area-list">
          {areas.map((area, idx) => (
            <div key={idx}>
              <AreaDropDown area={area} selectedItems={selectedItems} />
            </div>
          ))}
        </div>
      </AreaWrap>
    </AreaFilterContainer>
  );
};

export default AreaFilterPage;

const AreaFilterContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
`;

const TopWrap = styled.div`
  position: relative;
  width: 100%;
  height: 5rem;
  margin: auto 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-light-gray);

  > .top-left {
    position: absolute;
    left: 1.5rem;
  }
  > .top-left > .back-btn {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > .area-filter-title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: var(--color-dark);
    font-size: 17px;
    font-weight: 700;
  }
`;

// 지역 드롭다운 리스트
const AreaWrap = styled.div`
  width: calc(100% - 4rem);
  height: calc(100% - 5rem);
  margin: 0 auto;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  > .area-description {
    padding: 1rem 0;
    color: var(--color-main);
    text-align: center;
    font-size: 13px;
  }
  > .select-items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    padding-bottom: 1rem;
  }
  > .select-items > .area-tag {
    display: flex;
    width: auto;
    gap: 0.4rem;
    height: 28px;
    padding: 0 0.5rem;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
    background: var(--color-sub);
    font-size: 13px;
    color: var(--color-light);
    /* background: #e38882; */
  }
  > .area-list {
    flex: 1;
    overflow: scroll;

    // 스크롤바 없애기
    // chrome and safari
    ::-webkit-scrollbar {
      display: none;
    }
    // firefox
    scrollbar-width: none;
  }
`;
