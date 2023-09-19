import styled from 'styled-components';

// icons
import LodingIcon from '@components/LodingIcon';

/** 2023/06/29 - 페이지 설명 - by sineTlsl */
const StampLocationCheck = () => {
  return (
    <LocationCheckContainer>
      <LoadingTextWrap>
        <h2 className="main-title">
          <span>현재 위치를</span>
          <span>확인하고 있습니다.</span>
        </h2>
        <p className="sub-description">티캣 발급을 위해 위치 이동을 자제해주세요.</p>
      </LoadingTextWrap>
      <LoadingIconWrap>
        <LodingIcon width="80px" height="80px" />
      </LoadingIconWrap>
    </LocationCheckContainer>
  );
};

export default StampLocationCheck;

const LocationCheckContainer = styled.div`
  text-align: center;
  position: absolute;
  height: 100%;
  width: calc(100% - 4rem);
`;

const LoadingTextWrap = styled.div`
  padding-top: 10.5rem;
  height: 50%;
  width: 100%;

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

const LoadingIconWrap = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
`;
