import styled from 'styled-components';
import { useState, useEffect } from 'react'; // useState 추가
import { CalendarListType } from 'types/api/calendar';
import { useNavigate } from 'react-router-dom';

// utils
import { formatDate } from '@utils/formatDate';
import { splitAddress } from '@utils/address';
// icons
import { FaStar } from 'react-icons/fa';
import { TiHeartFullOutline } from 'react-icons/ti';
import { LuStamp } from 'react-icons/lu';

interface FestivalProps {
  item: CalendarListType;
  selectedCalendars: number[];
  setSelectedCalendars: React.Dispatch<React.SetStateAction<number[]>>;
  select: boolean;
}

const statusStlye = (state: string) => {
  if (state === 'ONGOING') {
    return { state: '진행중', style: 'ongoing' };
  } else if (state === 'COMPLETED') {
    return { state: '종료됨', style: 'completed' };
  } else if (state === 'EXPECTED') {
    return { state: '예정됨', style: 'expected' };
  }
  //상태가 명확하지 않을때 출력
  return { state: '미확인', style: 'completed' };
};

const CalendarFestival = ({ item, select, selectedCalendars, setSelectedCalendars }: FestivalProps) => {
  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();

  // 수정: 체크박스 클릭 핸들러
  const handleCheckboxChange = (clickedItem: CalendarListType) => {
    setSelected(prevSelected => {
      const isSelected = selectedCalendars.includes(clickedItem.calendarId);
      let updatedCalendars;
      if (isSelected) {
        // 이미 선택된 경우, 배열에서 해당 아이템을 제거합니다.
        updatedCalendars = selectedCalendars.filter(calendar => calendar !== clickedItem.calendarId);
      } else {
        // 선택되지 않은 경우, 배열에 해당 아이템을 추가합니다.
        updatedCalendars = [...selectedCalendars, clickedItem.calendarId];
      }
      setSelectedCalendars(updatedCalendars);
      return !prevSelected; // 체크박스 상태를 반전
    });
  };

  /** 2023/09/12 스탬프페이지로 축제데이터 넘겨주는 함수 - parksubeom */
  const routeStampPage = () => {
    navigate('/stamp/valid', { state: { item } });
  };

  const routeDetailPage = () => {
    navigate(`/detail/${item.festivalId}`);
  };

  useEffect(() => {
    setSelected(false);
  }, [select]);
  return (
    <FestivalContainer>
      <ImgBox>
        <div className={`festival-status flex-all-center ${statusStlye(item.status).style}`}>
          {statusStlye(item.status).state}
        </div>
        {item.image !== '' ? <img src={item.image} /> : <img src="/assets/images/ticat-cover-image.png" />}
      </ImgBox>
      <DescriptionWrap onClick={routeDetailPage}>
        <h3 className="festival-title">{item.title}</h3>
        <p className="festival-area">{splitAddress(item.address)}</p>
        <div className="icon-wrap">
          <div className="review-icon">
            <FaStar size="14px" color="#FFAD33" />
          </div>
          <p className="gap">|</p>
          <div className="review-icon">
            <TiHeartFullOutline size="14px" color="var(--color-sub)" />
          </div>
        </div>
        <p className="festival-date">
          {formatDate(item.eventStartDate)} ~ {formatDate(item.eventEndDate)}
        </p>
      </DescriptionWrap>
      {select ? (
        <CalendarRightContainer>
          <FestivalrCategoryWrap>
            <input type="checkbox" checked={selected} onChange={() => handleCheckboxChange(item)}></input>
          </FestivalrCategoryWrap>
        </CalendarRightContainer>
      ) : (
        <CalendarRightContainer>
          {item.status === 'EXPECTED' ? (
            <DisabledBtn className="disabled" onClick={routeStampPage} disabled>
              스탬프찍기
            </DisabledBtn>
          ) : (
            <StampAddBtn onClick={routeStampPage}>
              <LuStamp />
            </StampAddBtn>
          )}
        </CalendarRightContainer>
      )}
    </FestivalContainer>
  );
};

export default CalendarFestival;

/** 2023/07/08 - 축제 컨테이너 - by sineTlsl */
const FestivalContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 3px auto;
  padding: 0px 5px;
  width: 100%;
  height: 105px;
  color: var(--color-dark);
  font-size: 13px;
  border-radius: 5px;
`;

// 축제 정보 이미지
const ImgBox = styled.div`
  position: relative;
  flex: 0 0 95px;
  height: 100%;
  width: 100%;
  padding: 1rem 1rem 1rem 0;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }

  //축제 진행상태
  .festival-status {
    position: absolute;
    top: 10px;
    left: 0px;
    width: 50px;
    color: #fff;
    border-radius: 4px 0px 4px 0px;
  }

  .ongoing {
    background-color: var(--color-main);
  }

  .completed {
    background-color: var(--color-dark-gray);
  }

  .expected {
    background-color: #5597d4;
  }
`;

// 축제 정보 텍스트
const DescriptionWrap = styled.div`
  width: calc(100% - 115px - 35px);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0 1rem 0 0.3rem;

  > .festival-title {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--color-dark);
    font-weight: 700;
    line-height: 2rem;
    font-size: 16px;
  }

  > .festival-area {
    width: 100%;
    font-size: 12px;

    @media screen and (max-width: 400px) {
      font-size: 11px;
      line-height: 15px;
    }
  }
  > .icon-wrap {
    display: flex;
  }
  > .icon-wrap > .gap {
    display: inline-block;
    font-size: 0;
    width: 1px;
    height: 10px;
    background: var(--color-dark-gray);
    margin: 4px 6px 0 8px;
    vertical-align: top;
    box-sizing: border-box;
  }
  > .icon-wrap > .review-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
  }
  > .festival-date {
    color: var(--color-dark-gray);
  }
`;

const CalendarRightContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 수정 */
  align-items: flex-end; /* 수정 */
  margin-left: auto;
`;

// 축제 카테고리
const FestivalrCategoryWrap = styled.div`
  height: 100%;
  color: var(--color-dark-gray);
  font-size: 12px;
  width: 35px;
  display: flex;
  white-space: nowrap;
  align-items: flex-start;
  justify-content: flex-end;
  padding-top: 1.2rem;

  @media screen and (max-width: 400px) {
    font-size: 11px;
  }
`;

const StampAddBtn = styled.button`
  width: 50px;
  border: 1px solid #eee;
  background-color: #ffffff;
  color: #b8b8b8;
  border-radius: 5px;
  font-size: 1.6rem;
  margin-bottom: 15px;
  cursor: pointer;

  :hover {
    color: var(--color-main);
  }
`;

const DisabledBtn = styled.button`
  width: 60px;
  height: 20px;
  border: none;
  background-color: gray;
  color: #d2cfcf;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  padding: 0;
  margin-bottom: 20px;
`;
