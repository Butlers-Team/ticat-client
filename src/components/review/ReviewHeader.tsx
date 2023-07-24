import styled from 'styled-components';

interface Props {}

/** 2023/07/22- 리뷰 영역 헤더 - by leekoby */
const ReviewHeader: React.FC<Props> = (): JSX.Element => {
  return (
    <ReviewHeaderContainer>
      <ReviewTitleContainer>
        <h2>축제 평가</h2>
        <span>n개의 리뷰</span>
      </ReviewTitleContainer>
      <span className="score">
        <span>평점</span>
        <span className="score-point">5.0</span>
      </span>
    </ReviewHeaderContainer>
  );
};

export default ReviewHeader;

const ReviewHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  .score {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: bold;
    font-size: 1.6rem;
    color: var(--color-main);

    .score-point {
      font-size: 3.2rem;
    }
  }
`;

const ReviewTitleContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  > h2 {
    color: var(--color-dark);
    font-size: 2.4rem;
    font-weight: bold;
  }
  > span {
    font-size: 1.6rem;
    color: var(--color-dark-gray);
  }
`;
