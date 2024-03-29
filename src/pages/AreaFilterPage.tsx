import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { areas } from '@data/areaData';
import { useAreaFilterStore } from '@store/useAreaFilterStore';

// components
import Button from '@components/Button';
import AreaDropDown from '@components/area-filter/AreaDropDown';
import TopHistoryBackNav from '@components/TopHistoryBackNav';

// icons
import { AiFillCloseCircle } from 'react-icons/ai';

const AreaFilterPage = () => {
  const navigate = useNavigate();
  const { selectedItems, setSelectedItems } = useAreaFilterStore();
  const [tempSelectedItems, setTempSelectedItems] = useState<string[]>(selectedItems);

  /** 2023/07/14 - 이전 페이지 이동 함수 - by sineTlsl */
  const goBackPage = () => {
    navigate('/festival');
  };

  /** 2023/07/14 - 선택된 지역들을 목록에 업데이트하는 함수 - by sineTlsl */
  const handlerAddItem = (item: string) => {
    setTempSelectedItems(prevItems => [...prevItems, item]);
  };

  /** 2023/07/14 - 특정 지역 or 자치구 삭제 함수 - by sineTlsl */
  const handlerRemoveItem = (removeItem: string) => {
    const filterItems = tempSelectedItems.filter(item => item !== removeItem);
    setTempSelectedItems(filterItems);
  };

  /** 2023/07/17 - 지역의 전체 버튼을 클릭 시 그 지역의 자치구 전체 삭제 함수 - by sineTlsl */
  const handlerRemoveAreaItems = (items: string[]) => {
    const newSelectedItems = tempSelectedItems.filter(item => !items.includes(item));
    setTempSelectedItems(newSelectedItems);
  };

  /** 2023/09/28 - 지역 선택 완료 버튼 - by sineTlsl */
  const handlerSelectComplete = () => {
    setSelectedItems(tempSelectedItems);
    navigate('/festival');
  };

  /** 2023/09/28 - 지역 선택 초기화 버튼 - by sineTlsl */
  const handlerReset = () => {
    setTempSelectedItems([]);
    setSelectedItems([]);
  };

  return (
    <AreaFilterContainer>
      <TopHistoryBackNav textTitle={'지역설정'} onNavigation={goBackPage} />
      <AreaWrap>
        <p className="area-description">지역은 5개까지만 선택이 가능합니다</p>
        <ul className="select-items ">
          {tempSelectedItems.map((item, idx) => (
            <li className="area-tag" key={idx}>
              <span className="tag-title">{item}</span>
              <span className="tag-remove-btn" onClick={() => handlerRemoveItem(item)}>
                <AiFillCloseCircle size="15px" color="var(--color-light)" />
              </span>
            </li>
          ))}
        </ul>
        <div className="area-list">
          {areas.map((area, idx) => (
            <div key={idx}>
              <AreaDropDown
                area={area}
                tempSelectedItems={tempSelectedItems}
                onAddItem={handlerAddItem}
                onRemoveItem={handlerRemoveItem}
                onAllRemoveItem={handlerRemoveAreaItems}
              />
            </div>
          ))}
        </div>
      </AreaWrap>
      <SelectedBtnWrap>
        <BtnWrap>
          <Button onClick={handlerSelectComplete} width="70%">
            선택 완료
          </Button>
          <button className="reset-btn" onClick={handlerReset}>
            지역 초기화
          </button>
        </BtnWrap>
      </SelectedBtnWrap>
    </AreaFilterContainer>
  );
};

export default AreaFilterPage;

/** 2023/07/17 - 축제 리스트 지역별 카테고리 컨테이너 - by sineTlsl */
const AreaFilterContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
`;

/** 2023/07/17 - 지역 드롭다운 리스트 - by sineTlsl */
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
  }
  > .select-items > .area-tag > .tag-remove-btn {
    display: flex;
    align-items: center;
  }
  > .area-list {
    flex: 1;
    padding-bottom: 10rem;
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

const SelectedBtnWrap = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  bottom: 0rem;
  width: calc(100% - 4rem);
  isolation: isolate;
`;

const BtnWrap = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;

  > .reset-btn {
    width: 30%;
    height: 4.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    border-radius: 5px;
    border: 1.5px solid var(--color-main);
    margin: 1rem 0;
    background: var(--background-color);
    color: var(--color-main);
    font-weight: 600;
    cursor: pointer;

    &:hover,
    &:active {
      background: #f5f7ff;
    }
  }
`;
