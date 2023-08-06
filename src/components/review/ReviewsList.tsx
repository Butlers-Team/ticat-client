import { useFetchReviews } from '@hooks/query/useFetchReviews';
import styled from 'styled-components';
import ReviewItem from './review-item/ReviewItem';

interface Props {
  festivalId: number;
}
/** 2023/07/22- 리뷰리스트 영역  - by leekoby */
const ReviewsList: React.FC<Props> = ({ festivalId }): JSX.Element => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useFetchReviews({ festivalId, page: 1, size: 5 });

  return (
    <ReviewsContainer>
      {data?.pages.map(page => page.data.map(review => <ReviewItem key={review.reviewId} review={review} />))}
    </ReviewsContainer>
  );
};

export default ReviewsList;

const ReviewsContainer = styled.section`
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;
