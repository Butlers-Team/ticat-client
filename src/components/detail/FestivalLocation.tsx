import styled from 'styled-components';
import Button from '@components/Button';
const FestivalLocation = () => {
  return (
    <>
      <LocationContainer>
        <h2>위치 안내</h2>
        <Button>내 위치에서 경로찾기</Button>
      </LocationContainer>
    </>
  );
};

const LocationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2rem;
  > h2 {
    color: var(--color-dark);
    font-size: 24px;
    font-weight: bold;
  }
  > p {
    font-size: 16px;
    color: var(--color-dark);
    margin-top: 2rem;
    margin-bottom: 2rem;
    font-weight: 400;
    letter-spacing: 1px;
    line-height: 25px;
  }
`;
export default FestivalLocation;
