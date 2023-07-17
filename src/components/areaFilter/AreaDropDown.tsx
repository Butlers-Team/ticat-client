import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { areaData } from '@data/areaData';
import { useAreaFilterStore } from '@store/areaFilterStore';

// icon
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

interface AreaProps {
  area: string; // 지역
  tempSelectedItems: string[]; // 선택한 지역 및 지역별 자치구 list
  onAddItem: (item: string) => void; // 지역별 자치구 선택
  onRemoveItem: (item: string) => void; // 선택된 지역별 자치구 삭제
  onAllRemoveItem: (item: string[]) => void; // 선택된 지역의 자치구 모두 삭제
}

const AreaDropDown = ({ area, tempSelectedItems, onAddItem, onRemoveItem, onAllRemoveItem }: AreaProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [itemSelect, setItemSelect] = useState<{ [key: string]: boolean }>({});

  const { selectedItems } = useAreaFilterStore();

  /** 2023/07/17 - 지역마다 각 자치별 초기 상태 지정 및 업데이트 될 때마다 전역 관리 - by sineTlsl */
  useEffect(() => {
    const updatedItemSelect =
      areaData[area].reduce((obj, item) => {
        const formattedItem = item === '전체' ? `(${area})` : `(${area})${item}`;
        return { ...obj, [item]: tempSelectedItems.includes(formattedItem) };
      }, {}) || {};

    setItemSelect(updatedItemSelect);
  }, [area, selectedItems, tempSelectedItems]);

  /** 2023/07/17 - 각 자치구가 선택되어있는지 확인하고, 그 지역의 맞게 업데이트 하는 함수 - by sineTlsl */
  const HandlerSelectItem = (data: string) => {
    const strItem = data === '전체' ? `(${area})` : `(${area})${data}`;

    if (data === '전체') {
      if (tempSelectedItems.length >= 5) return;

      const itemsToRemove = Object.keys(itemSelect).map(key => `(${area})${key}`);
      onAllRemoveItem(itemsToRemove);

      // 모든 자치구를 선택하지 않은 상태로 업데이트
      setItemSelect(prevItem => {
        const newItemSelect = { ...prevItem };
        for (const key in newItemSelect) {
          newItemSelect[key] = false;
        }

        // 전체만 선택된 상태로 업데이트
        newItemSelect[data] = true;

        return newItemSelect;
      });
      // 현재 지역의 전체가 항목에 있는 지 확인하고, 없는 경우에만 추가
      if (!tempSelectedItems.includes(strItem)) {
        onAddItem(strItem);
      }
    } else {
      if (tempSelectedItems.length < 5 && !itemSelect[data]) {
        setItemSelect({ ...itemSelect, [data]: !itemSelect[data] });

        // 이 지역의 전체가 항목에 포함되어 있는지 확인하고 있다면 '전체' 삭제
        if (tempSelectedItems.includes(`(${area})`)) {
          onRemoveItem(`(${area})`);

          const firstKey = Object.keys(itemSelect)[0];
          setItemSelect(prevItem => ({ ...prevItem, [firstKey]: false }));
        }
        onAddItem(strItem);
      } else {
        setItemSelect({ ...itemSelect, [data]: false });
        onRemoveItem(strItem);
      }
    }
  };

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
            <button
              key={idx}
              className={itemSelect[data] ? 'area-btn selected-btn' : 'area-btn'}
              onClick={() => HandlerSelectItem(data)}>
              {data}
            </button>
          ))}
        </div>
      )}
    </DropDownContainer>
  );
};

export default AreaDropDown;

/** 2023/07/17 - 드롭다운 컨테이너 - by sineTlsl */
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
