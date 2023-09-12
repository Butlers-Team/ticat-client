import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useLocationStore } from '@store/userLocation';
import { getStampDistance } from '@api/stamp';

// component
import Button from '@components/Button';
import StampLocationCheck from '@components/stamp/StampLocationCheck';
import TicketStamping from '@components/stamp/TicketStamping';
import { useQuery } from '@tanstack/react-query';
import { StampDistanceRequest } from 'types/api/stamp';

const StampValidPage = () => {
  const navigate = useNavigate();
  const { location } = useLocationStore();

  const params: StampDistanceRequest = {
    mapX: location.longitude,
    mapY: location.latitude,
    distance: 300.0,
  };

  const { data, isLoading } = useQuery(['stampDistance', params], getStampDistance);

  /** 2023/06/29 - 스탬프 버튼 클릭 함수 - by sineTlsl */
  const handleStampClick = (): void => {
    // 스탬프 찍는 페이지로 이동
    navigate('/stamp/list');
  };

  return (
    <StampValidContainer>
      {!isLoading ? (
        <>
          <StampLocationCheck />
          <StampBtnWrap>
            <Button disabled>위치 확인 중</Button>
          </StampBtnWrap>
        </>
      ) : (
        <>
          <TicketStamping />
          <StampBtnWrap>
            <Button onClick={handleStampClick}>스탬프 찍기</Button>
          </StampBtnWrap>
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
