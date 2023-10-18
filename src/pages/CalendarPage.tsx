import styled from 'styled-components';
import { useState, useEffect, useReducer } from 'react';
import ReactCalendar from '@components/calendar/ReactCalendar';
import { CalendarListRequest, CalendarListListType, CalendarListType } from 'types/api/calendar';
import { getCalendarList } from '@api/calendar';
import CalendarFestival from '@components/calendar/CalendarFestval';
import { deleteCalendarRequest } from '@api/calendar';
import Button from '@components/Button';
import { CgTrash } from 'react-icons/cg';
const CalendarPage: React.FC = (): JSX.Element => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();
  const [selectedCalendars, setSelectedCalendars] = useState<number[]>([]);
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
  }, [selecteDate, selecteMonth, selecteYears, trigger]);

  /** 2023/09/12 캘린더 삭제요청 함수 - parksubeom */
  // 수정: 선택한 캘린더를 삭제하는 함수
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
  console.log(selectedCalendars); // 이 부분에서 아직 업데이트되지 않았을 수 있습니다.
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

      <p className="today-date">
        <span>{selecteYears}년</span> <span>{selecteMonth + 1}월</span> <span>{selecteDate}일</span> 축제리스트
      </p>
      <FestivalListSection>
        {calendarDatailList?.length === undefined || calendarDatailList.length < 1 ? (
          <EmptyListSection>
            <img src={'assets/images/ticat-logo-icon-gray.png'}></img>
            <span>추가된 축제 일정이 없어요.</span>
            <button className="add-calendar" onClick={addSchedule}>
              일정 추가
            </button>
          </EmptyListSection>
        ) : (
          <FestivalScrollWrap>
            <DeleteBtnSection>
              {' '}
              <button onClick={() => deleteSelectedCalendars()}>
                <CgTrash />
              </button>
            </DeleteBtnSection>

            {calendarDatailList?.map(festival => {
              return (
                <li key={festival.festivalId}>
                  <CalendarFestival
                    item={festival}
                    selectedCalendars={selectedCalendars}
                    setSelectedCalendars={setSelectedCalendars}
                    deleteSelectedCalendars={deleteSelectedCalendars}
                  />
                </li>
              );
            })}
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
  height: calc(100% - 100px);
  width: 100%;
  padding: 20px;
  overflow: auto;
  margin: 0 auto;
  // 스크롤바 없애기
  // chrome and safari
  ::-webkit-scrollbar {
    display: none;
  }
  // firefox
  scrollbar-width: none;
  @media screen and (max-width: 400px) {
    height: calc(100% - 11rem);
  }
`;
const DeleteBtnSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: right;
  margin: 0;
  > button {
    width: 8rem;
    height: 3rem;
    border-radius: 10px;
    font-weight: bold;
    color: red;
    border: 2px solid red;
    box-shadow: none;
    background-color: var(--background-color);
    margin-top: 1rem;
  }
`;
