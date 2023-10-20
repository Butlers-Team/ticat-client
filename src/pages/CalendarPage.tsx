import styled from 'styled-components';
import { useState, useEffect, useReducer } from 'react';
import ReactCalendar from '@components/calendar/ReactCalendar';
import { CalendarListRequest, CalendarListType } from 'types/api/calendar';
import { getCalendarList } from '@api/calendar';
import CalendarFestival from '@components/calendar/CalendarFestval';
import { deleteCalendarRequest } from '@api/calendar';
import Button from '@components/Button';

const CalendarPage: React.FC = (): JSX.Element => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();
  const [selectedCalendars, setSelectedCalendars] = useState<number[]>([]);
  const [select, setSelect] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>();
  const [selecteDate, setSelectedDate] = useState<number>(date);
  const [selecteMonth, setSelectedMonth] = useState<number>(month);
  const [selecteYears, setSelectedYears] = useState<number>(year);
  const [calendarDatailList, setCalendarDatailList] = useState<CalendarListType[]>([]);
  const [trigger, forceUpdate] = useReducer(x => x + 1, 0);

  /** 2023/08/20 - 등록된 일정이 없다면 축제목록으로 경로이동시켜준다. - parksubeom */
  const addSchedule = () => {
    window.location.href = '/festival';
  };
  useEffect(() => {
    setCalendarDatailList([]);
    /** 2023/08/20 - 캘린더 페이지 진입 시, 해당 날짜의 등록된 스케쥴 리스트 불러오는 함수 - parksubeom */
    const fetchCalendarList = async () => {
      const params: CalendarListRequest = {
        page: 1,
        year: selecteYears,
        month: selecteMonth + 1,
        day: selecteDate,
      };
      const res = await getCalendarList(params);
      setCalendarDatailList(res.data[0].festivalList);
      if (res.pageInfo) {
        setTotalPages(res.pageInfo.totalElements);
      }
    };
    setPage(1);
    fetchCalendarList();
    setSelectedCalendars([]);
    setSelect(false);
  }, [selecteDate, selecteMonth, selecteYears, trigger]);
  const selectDeleteList = () => {
    setSelect(!select);
    setSelectedCalendars([]);
  };
  /** 2023/09/12 캘린더 삭제요청 함수 - parksubeom */
  const deleteSelectedCalendars = async () => {
    if (selectedCalendars.length === 0) {
      alert('선택된 캘린더가 없습니다.');
      return;
    }
    // 여기에서 selectedCalendars 배열을 순회하면서 각 캘린더를 삭제하는 요청을 보냅니다.
    for (const calendar of selectedCalendars) {
      await deleteCalendarRequest(calendar);
    }
    // 삭제 후, 배열 초기화 및 갱신
    setSelectedCalendars([]);
    forceUpdate();
    alert('선택한 캘린더가 삭제되었습니다.');
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  useEffect(() => {
    const MoreCalendarList = async () => {
      const params: CalendarListRequest = {
        page: page,
        year: selecteYears,
        month: selecteMonth + 1,
        day: selecteDate,
      };
      const res = await getCalendarList(params);
      setCalendarDatailList([...calendarDatailList, ...res.data[0].festivalList]);
      if (res.pageInfo) {
        setTotalPages(res.pageInfo.totalElements);
      }
    };
    MoreCalendarList();
  }, [page]);
  return (
    <CalendarContainer>
      <CalendarSection>
        <ReactCalendar
          startDate={new Date()}
          setSelectedYears={setSelectedYears}
          setSelectedDate={setSelectedDate}
          setSelectedMonth={setSelectedMonth}
          selecteDate={selecteDate}
          selecteMonth={selecteMonth}
          selectYears={selecteYears}
        />
      </CalendarSection>
      <CalendarTopSection>
        {' '}
        <p className="today-date">
          <span>{selecteYears}년</span> <span>{selecteMonth + 1}월</span> <span>{selecteDate}일</span> 축제리스트
        </p>
        {calendarDatailList.length > 0 && (
          <div>
            {select ? (
              <DeleteBtnSection>
                {' '}
                <button className="select-list" onClick={() => selectDeleteList()}>
                  선택취소
                </button>
              </DeleteBtnSection>
            ) : (
              <DeleteBtnSection>
                {' '}
                <button className="unselect-list" onClick={() => selectDeleteList()}>
                  선택삭제
                </button>
              </DeleteBtnSection>
            )}
          </div>
        )}
      </CalendarTopSection>

      <FestivalListSection>
        {calendarDatailList.length < 1 ? (
          <EmptyListSection>
            <img src={'assets/images/ticat-logo-icon-gray.png'}></img>
            <span>추가된 축제 일정이 없어요.</span>
            <button className="add-calendar" onClick={addSchedule}>
              일정 추가
            </button>
          </EmptyListSection>
        ) : (
          <FestivalScrollWrap>
            {calendarDatailList?.map(festival => {
              return (
                <li key={festival.festivalId}>
                  <CalendarFestival
                    item={festival}
                    selectedCalendars={selectedCalendars}
                    setSelectedCalendars={setSelectedCalendars}
                    select={select}
                  />
                </li>
              );
            })}
            {select && selectedCalendars.length > 0 ? (
              <Button
                color="#ff5454"
                onClick={
                  deleteSelectedCalendars
                }>{`선택한 리스트 삭제 ${selectedCalendars.length}/${calendarDatailList.length}`}</Button>
            ) : select ? (
              <Button
                disabled
                color="#ff5454;"
                onClick={
                  deleteSelectedCalendars
                }>{`선택한 리스트 삭제 ${selectedCalendars.length}/${calendarDatailList.length}`}</Button>
            ) : null}
            {totalPages === calendarDatailList.length ? null : <Button onClick={handleLoadMore}>축제 더보기</Button>}
          </FestivalScrollWrap>
        )}
      </FestivalListSection>
    </CalendarContainer>
  );
};
export default CalendarPage;
/** 2023/07/02 - 축제 캘린더 컨테이너  - by parksubeom */
const CalendarContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  .today-date {
    font-size: 16px;
    margin: 0 2rem;
    margin-top: 2rem;
    > span {
      font-weight: bold;
    }
  }
`;
const CalendarTopSection = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
/** 2023/07/02 - 축제 캘린더 섹션  - by parksubeom */
const CalendarSection = styled.section``;
/** 2023/07/02 - 축제 리스트 섹션  - by parksubeom */
const FestivalListSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  margin-top: 2rem;
`;
/** 2023/07/02 - 추가된 축제리스트가 없을 때 보여지는 섹션  - by parksubeom */
const EmptyListSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    width: 10.8rem;
    height: 10.8rem;
    opacity: 20%;
  }
  > span {
    font-size: 16px;
    color: var(--color-light-gray);
    font-weight: bold;
    margin: 1rem;
  }
  > .add-calendar {
    width: 10.8rem;
    height: 3rem;
    border-radius: 10px;
    font-weight: bold;
    color: var(--color-sub);
    border: 2px solid var(--color-sub);
    box-shadow: none;
    background-color: var(--background-color);
    margin-top: 1rem;
    &:hover {
      background-color: #b2d9fa;
      color: var(--color-light);
    }
  }
`;
const FestivalScrollWrap = styled.div`
  height: 100%;
  width: 100%;
  padding: 20px;
  overflow: auto;
  margin: 0 auto;

  // chrome and safari
  ::-webkit-scrollbar {
    display: none;
  }
  // firefox
  scrollbar-width: none;
`;
const DeleteBtnSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  margin: 0 2rem;
  margin-top: 2rem;

  > .select-list {
    width: 6rem;
    height: 2.5rem;
    border-radius: 5px;
    font-size: 12px;
    font-weight: bold;
    color: #787474;
    border: 1px solid #eee;
    box-shadow: none;
    background-color: var(--background-color);
  }
  > .unselect-list {
    width: 6rem;
    height: 2.5rem;
    border-radius: 5px;
    font-size: 12px;
    font-weight: bold;
    color: #ff5454;
    border: 1px solid #ff5454;
    background-color: #ffffff;
    box-shadow: none;
    background-color: var(--background-color);
  }
`;
