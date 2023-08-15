//react
import { useState } from 'react';

//style
import styled from 'styled-components';

//components
import Button from '@components/Button';
import ReviewItem from '@components/review/review-item/ReviewItem';

//hooks
import { useFetchReviews } from '@hooks/query/useFetchReviews';

interface Props {
  festivalId: number;
}
/** 2023/07/22- 리뷰리스트 영역  - by leekoby */
const ReviewsList: React.FC<Props> = ({ festivalId }): JSX.Element => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useFetchReviews({ festivalId, page: 1, size: 5 });

  // 댓글 폼 오픈 여부
  const [openedReviewId, setOpenedReviewId] = useState<number | null>(null);

  // 수정 모드 확인
  const [activeEditModeReivew, setActiveEditModeReview] = useState<number | null>(null);

  //리뷰 수정모드 핸들러
  const handleEditModeChange = (reviewId: number) => {
    setActiveEditModeReview(activeEditModeReivew === reviewId ? null : reviewId);
  };
  return (
    <ReviewsContainer>
      {data?.pages.map(page =>
        page.data.map(review => (
          <ReviewItem
            key={review.reviewId}
            festivalId={festivalId}
            review={review}
            showCommentForm={openedReviewId === review.reviewId}
            onToggleCommentForm={() =>
              setOpenedReviewId(prevId => (prevId === review.reviewId ? null : review.reviewId))
            }
            isEditMode={activeEditModeReivew === review.reviewId}
            onEditModeChange={() => handleEditModeChange(review.reviewId)}
          />
        )),
      )}

      {hasNextPage && (
        <Button type="button" onClick={() => fetchNextPage()} fontSize="1.6rem">
          리뷰 더 불러오기
        </Button>
      )}
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
