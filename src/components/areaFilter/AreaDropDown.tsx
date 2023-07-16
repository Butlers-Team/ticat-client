import { areaData } from '@data/areaData';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

// icon
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

interface AreaProps {
  area: string; // 지역
  selectedItems: string[]; // 선택한 지역 및 지역별 자치구 list
  // onSelectedItem: (item: string) => void; // 지역별 자치구 선택
}

const AreaDropDown = ({ area, selectedItems }: AreaProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [itemSelect, setItemSelect] = useState<{ [key: string]: boolean }>({});

  /** 2023/07/13 - areaData가 변경될 때마다 itemSelect 상태 업데이트 - by sineTlsl */
  useEffect(() => {
    // 각 아이템마다 초기 상태 다르게 지정
    const initalItemState =
      areaData[area].reduce((obj, item) => {
        return { ...obj, [item]: false };
      }, {}) || {};

    setItemSelect(initalItemState);
  }, [area]);

  return (
    <DropDownContainer>
      <div className="area-title-box">
        <div>{area}</div>
        <button className="dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
          {!isOpen ? (
            <IoMdArrowDropdown size="24px" color="var(--color-dark-gray)" />
          ) : (
            <IoMdArrowDropup size="24px" color="var(--color-dark)" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="area-item-box">
          {areaData[area].map((data, idx) => (
            <button key={idx} className={itemSelect[data] ? 'area-btn selected-btn' : 'area-btn'}>
              {data}
            </button>
          ))}
        </div>
      )}
    </DropDownContainer>
  );
};

export default AreaDropDown;

const DropDownContainer = styled.div`
  height: 100%;
  width: 100%;

  > .area-title-box {
    margin: 0 auto;
    width: 100%;
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--color-dark);
    font-size: 15px;
    font-weight: 500;
    border-bottom: 1px solid var(--color-light-gray);
  }
  > .area-title-box > .dropdown-btn {
    background: none;
    border: none;
    cursor: pointer;
  }
  > .area-item-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
    gap: 1rem;
    margin: 0 auto;
  }

  > .area-item-box > .area-btn {
    font-size: 14px;
    height: 4rem;
    width: calc((100% - 2rem) / 3);
    white-space: nowrap;
    border: none;
    cursor: pointer;
    color: var(--color-dark);
    background: #ececec;
  }

  > .area-item-box > .selected-btn {
    font-weight: 400;
    color: var(--color-light);
    background: var(--color-main);
  }
`;
