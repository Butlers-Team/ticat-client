import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { areaData } from '@data/areaData';
import { useAreaFilterStore } from '@store/useAreaFilterStore';

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

  /** 2023/07/17 - 지역마다 각 자치별 초기 상태 지정 및 업데이트 될 때마다  관리 - by sineTlsl */
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
      if (itemSelect[data]) {
        // 현재 그 지역의 '전체'가 클릭되어 있을 때
        onRemoveItem(strItem);
        setItemSelect(prevItem => ({ ...prevItem, [data]: false }));
      } else {
        const currentAreaItemsCount = tempSelectedItems.filter(item => item.startsWith(`(${area})`)).length;
        // 선택된 그 지역의 자치구가 5개 초과이거나 현재 선택된 지역이 5개 이상이고 그 지역이 하나도 포함이 안되어있을 때
        if (currentAreaItemsCount > 5 || (tempSelectedItems.length >= 5 && currentAreaItemsCount === 0)) return;

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
      <div className="area-title-box" onClick={() => setIsOpen(!isOpen)}>
        <button className="dropdown-btn">
          <div className="area-title">{area}</div>
          <div>
            {!isOpen ? (
              <IoMdArrowDropdown size="26px" color="var(--color-dark-gray)" />
            ) : (
              <IoMdArrowDropup size="26px" color="var(--color-dark)" />
            )}
          </div>
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
    height: 4.8rem;
    border-bottom: 1px solid var(--color-light-gray);
  }
  > .area-title-box > .dropdown-btn {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: none;
    border: none;
    cursor: pointer;
  }
  > .area-title-box > .dropdown-btn > .area-title {
    color: var(--color-dark);
    font-size: 14px;
    font-weight: 500;
  }

  > .area-item-box {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 1rem;
    gap: 1rem;
  }

  > .area-item-box > .area-btn {
    height: 4.2rem;
    width: calc((100% - 2rem) / 3);
    border: 1px solid var(--color-dark-gray);
    font-size: 13px;
    white-space: nowrap;
    background: var(--background-color);
    color: var(--color-dark);
    cursor: pointer;
    border-radius: 0.5rem;
  }

  > .area-item-box > .selected-btn {
    font-weight: bold;
    background-color: #f5f7ff;
    color: var(--color-main);
    border: 2px solid var(--color-main);
  }
`;
