import styled from 'styled-components';
import { useState } from 'react';
import LodingIcon from '@components/LodingIcon';

/** 2023/06/29 - 페이지 설명 - by sineTlsl */
const StampLocationCheck = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <LocationCheckContainer>
      <h2 className="main-title">
        <span>현재 위치를</span>
        <span>확인하고 있습니다.</span>
      </h2>
      <p className="sub-description">티캣 발급을 위해 위치 이동을 자제해주세요.</p>
      <LodingIcon width="80px" height="80px" />
    </LocationCheckContainer>
  );
};

export default StampLocationCheck;

const LocationCheckContainer = styled.div`
  text-align: center;
  position: absolute;
  height: 100%;
  width: calc(100% - 4rem);
  top: 10.5rem;

  > .main-title {
    font-size: 30px;
    color: var(--color-main);
    font-weight: 700;
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }
  > .sub-description {
    margin-top: 3rem;
    font-size: 14px;
    font-weight: 400;
    color: var(--color-dark);
  }
`;
