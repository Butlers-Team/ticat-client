import { ReviewResponse } from 'types/api';
import styled from 'styled-components';
import ReviewItemBottom from './ReviewItemBottom';
import ReviewItemContent from './ReviewItemContent';
import ReviewItemHeader from './ReviewItemHeader';
import ReviewImage from './ReviewImage';

interface Props {
  review: ReviewResponse;
}
/** 2023/07/22- 리뷰 아이템 - by leekoby */
const ReviewItem: React.FC<Props> = ({ review }): JSX.Element => {
  const { commentCount, content, disliked, displayName, liked, memberId, pictures, profileUrl, rating, reviewId } =
    review;

  return (
    <ReviewItemContainer>
      <HeaderWrapper>
        {profileUrl ? (
          <img src={profileUrl} />
        ) : (
          <img style={{ width: '3rem', height: '3rem' }} src="/assets/images/symbol-ticat1.png" />
        )}
        {displayName && <ReviewItemHeader displayName={displayName} rating={rating} />}
      </HeaderWrapper>
      <ReviewItemContent content={content} />
      <ReviewImage pictures={pictures} />
      <ReviewItemBottom
        commentCount={commentCount}
        disliked={disliked}
        liked={liked}
        reviewId={reviewId}
        memberId={memberId}
      />
    </ReviewItemContainer>
  );
};

export default ReviewItem;

const ReviewItemContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
