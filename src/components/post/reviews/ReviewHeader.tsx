//style
import styled from 'styled-components';

//type
import { FestivalDetailType } from 'types/api/detail';

interface Props {
  detailList: FestivalDetailType;
}

/** 2023/07/22- 리뷰 영역 헤더 - by leekoby */
const ReviewHeader: React.FC<Props> = ({ detailList }): JSX.Element => {
  const { reviewCount, reviewRating } = detailList;
  return (
    <ReviewHeaderContainer>
      <ReviewTitleContainer>
        <h2>축제 후기</h2>
        <span>{reviewCount}개의 리뷰</span>
      </ReviewTitleContainer>
      <span className="score">
        <span>평점</span>
        <span className="score-point">{reviewRating.toFixed(1)}</span>
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
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: bold;
    font-size: 1.6rem;
    color: var(--color-main);

    .score-point {
      font-size: 2.4rem;
    }
  }
`;

const ReviewTitleContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  > h2 {
    white-space: nowrap;
    color: var(--color-dark);
    font-size: 2.4rem;
    font-weight: bold;
  }
  > span {
    white-space: nowrap;
    font-size: 1.6rem;
    color: var(--color-dark-gray);
  }
`;
