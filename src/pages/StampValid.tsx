import styled from 'styled-components';

const StampValid = () => {
  /** 2023/06/29 - 스탬프 버튼 클릭 함수 - by sineTlsl */
  const handleStampClick = (): void => {
    // 스탬프 찍는 페이지로 이동
  };

  return (
    <StampValidContainer>
      <DescriptionWrap>
        <h2 className="main-title">
          <span>현재 위치를</span>
          <span>확인하고 있습니다.</span>
        </h2>
        <p className="sub-description">티캣 발급을 위해 위치 이동을 자제해주세요.</p>
      </DescriptionWrap>
      <StampBtnWrap>
        <button className="StampValidBtn" onClick={handleStampClick}>
          스탬프 찍기
        </button>
      </StampBtnWrap>
    </StampValidContainer>
  );
};

export default StampValid;

/** 2023/06/29 - 스탬프 위치 확인 컨테이너 - by sineTlsl */
const StampValidContainer = styled.section`
  position: relative;
  padding: 0 2rem;
  width: 100%;
  min-height: 100vh;
`;

/** 2023/06/29 - 페이지 설명 - by sineTlsl */
const DescriptionWrap = styled.div`
  text-align: center;
  position: absolute;
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
    color: var(--color-dark-text);
  }
`;

/** 2023/06/29 - 스탬프 버튼 - by sineTlsl */
const StampBtnWrap = styled.div`
  position: absolute;
  bottom: 3rem;
  width: calc(100% - 4rem);

  > .StampValidBtn {
    font-size: 14px;
    width: 100%;
    height: 4.5rem;
    border: none;
    border-radius: 7px;
    color: #fff;
    background: var(--color-main);
  }
`;
