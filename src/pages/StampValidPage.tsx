import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocationStore } from '@store/userLocation';

// types
import { StampDistanceRequest, StampListRequest } from 'types/api/stamp';
import { CalendarListType } from 'types/api/calendar';

// api
import { getStampDistance, postStamp } from '@api/stamp';

// hook
import useCustomToast from '@hooks/useCustomToast';

// component
import Button from '@components/Button';
import StampLocationCheck from '@components/stamp/StampLocationCheck';
import TicketStamping from '@components/stamp/TicketStamping';
import { AxiosError } from 'axios';

/**  2023/09/17 - 티캣을 찍을 수 있도록 캘린더 일정과 거리를 확인하는 컴포넌트 - by sineTlsl */
const StampValidPage = () => {
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const [loading, setLoading] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const { location } = useLocationStore();
  const calendarData: CalendarListType = routerLocation.state.item;

  const params: StampDistanceRequest = {
    mapX: location.longitude,
    mapY: location.latitude,
    distance: 300.0,
  };

  const { data, isLoading } = useQuery(['stampDistance', params], getStampDistance);

  // 페이지를 들어오자마자 로딩 화면 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 캘린더에서 받아온 축제와 현재 거리에 있는 축제가 맞는지 확인
  useEffect(() => {
    if (data && calendarData) {
      const matchItem = data.data.find(item => item.festivalId === calendarData.festivalId);
      if (!matchItem) {
        setShowAlert(true);
      }
    }
  }, [data, calendarData]);

  /** 2023/09/17 - 티켓 스탬프 post 요청 함수 생성 - by sineTlsl */
  const stampMutation = useMutation(postStamp, {
    onSuccess: () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const params: StampListRequest = {
        year,
        month,
      };

      queryClient.invalidateQueries(['getStampList', params]);
      toast({ title: '도장 꾹~! 스탬프 리스트 페이지로 이동합니다 :(', status: 'success' });

      setTimeout(() => {
        navigate('/stamp/list', { state: { page: '/stamp/valid' } });
      }, 2000);
    },
    onError: err => {
      const axiosError = err as AxiosError;

      if (axiosError.response && axiosError.response.status === 409) {
        toast({ title: '이미 찍은 스탬프입니다.', status: 'error' });
        navigate('/calendar');
      } else {
        console.log(err);
      }
    },
  });

  /** 2023/06/29 - 스탬프 버튼 클릭 함수 - by sineTlsl */
  const handlerStampClick = (): void => {
    // 스탬프 찍는 페이지로 이동
    stampMutation.mutate(calendarData.festivalId);
  };

  /** 2023/09/17 - 캘린더 페이지로 이동 함수 - by sineTlsl */
  const goCalendarRedirect = (): void => {
    // 스탬프 찍는 페이지로 이동
    navigate('/calendar');
  };

  return (
    <StampValidContainer>
      {!isLoading && loading ? (
        <>
          <StampLocationCheck />
          <StampBtnWrap>
            <Button disabled>위치 확인 중</Button>
          </StampBtnWrap>
        </>
      ) : (
        <>
          {!showAlert ? (
            <>
              <TicketStamping item={calendarData} />
              <StampBtnWrap>
                <Button onClick={handlerStampClick}>스탬프 찍기</Button>
              </StampBtnWrap>
            </>
          ) : (
            <>
              <UndefinedData>
                <img src="/assets/images/ticat-logo-icon-undefined.png" alt="ticat-logo-icon-undefined" />
                <p>축제랑 위치가 너무 멀어요!</p>
                <p>{`좀 더 가까운 곳으로 이동해주세요 :(`}</p>
              </UndefinedData>
              <StampBtnWrap>
                <Button onClick={goCalendarRedirect}>캘린더 페이지로 이동</Button>
              </StampBtnWrap>
            </>
          )}
        </>
      )}
    </StampValidContainer>
  );
};

export default StampValidPage;

/** 2023/06/29 - 스탬프 위치 확인 컨테이너 - by sineTlsl */
const StampValidContainer = styled.section`
  position: relative;
  padding: 0 2rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

/** 2023/06/29 - 스탬프 버튼 - by sineTlsl */
const StampBtnWrap = styled.div`
  position: absolute;
  bottom: 3rem;
  width: calc(100% - 4rem);
`;

/** 2023/08/28 - 데이터 정보가 없을 때 - by sineTlsl  */
const UndefinedData = styled.div`
  height: 100%;
  width: 100%;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    width: 150px;
    height: 150px;
    opacity: 0.1;
  }

  > .undefined-stamp-data {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-dark-gray);
  }
  :nth-child(2) {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-dark-gray);
  }
  :nth-child(3) {
    font-size: 1.3rem;
    color: var(--color-dark-gray);
  }
`;
