import ReviewRating from '@components/ReviewRating';
import { getTimeDiff } from '@libs/time';

import styled from 'styled-components';

interface Props {
  displayName: string;
  rating: number;
  createdAt: string;
  modifiedAt?: string;
}
/** 2023/07/22- 리뷰 상단 프로필이미지/닉네임/별점/작성일 - by leekoby */
const ReviewItemHeader: React.FC<Props> = ({ displayName, rating, createdAt, modifiedAt }): JSX.Element => {
  return (
    <ReviewHeaderContainer>
      <InfoWrapper>
        <span className="nickname">{displayName}</span>
        <span className="rating">
          <ReviewRating size={16} reviewRating={rating} />
        </span>
      </InfoWrapper>
      <span className="createdAt">{getTimeDiff(new Date(createdAt))}</span>
    </ReviewHeaderContainer>
  );
};

export default ReviewItemHeader;

const ReviewHeaderContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;

  .createdAt {
    font-size: 1.4rem;
    color: var(--color-dark-gray);
  }
`;
const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  .nickname {
    font-size: 1.6rem;
    font-weight: 600;
  }
  .rating {
    display: flex;
  }
`;
