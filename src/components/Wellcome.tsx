import { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

/** 2023/07/05 - 회원가입 결과 컴포넌트 - by leekoby */
const Wellcome: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/signin');
    }, 4000);

    // cleanup function
    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <WellcomeContainer className="flex-all-center">
      <Image alt="ticat logo" src="/assets/images/symbol-ticat1.png" />
      <DescriptionWrap>
        <h2 className="main-title">WELLCOME</h2>
        <p className="sub-description">티캣의 집사님이 되신걸 환영합니다.</p>
        <p className="sub-description">잠시 후 로그인 페이지로 이동합니다.</p>
      </DescriptionWrap>
    </WellcomeContainer>
  );
};

export default Wellcome;

const WellcomeContainer = styled.section`
  height: 100%;

  flex-direction: column;
`;

const Image = styled.img`
  width: 25rem;
`;

const DescriptionWrap = styled.div`
  text-align: center;
  > .main-title {
    font-size: 5rem;
    color: var(--color-main);
    font-weight: 700;
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }
  > .sub-description {
    margin-top: 3rem;
    font-size: 1.8rem;
    font-weight: 400;
    color: var(--color-dark-gray);
  }
`;
