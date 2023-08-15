//react
import React, { useState } from 'react';
//style
import styled from 'styled-components';
//types
import { MyReviewResponse, ReviewResponse } from 'types/api';
//icon
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
//components
import ReviewEditor from '@components/review/ReviewEditor';
import ReviewLikes from '@components/review/review-item/ReviewLikes';
import ReviewItemContent from '@components/review/review-item/ReviewItemContent';
import ReviewItemHeader from '@components/review/review-item/ReviewItemHeader';
import ReviewImage from '@components/review/review-item/ReviewImage';
import ReviewEditDelete from '@components/review/review-item/ReviewEditDelete';
import CommentForm from '@components/review/comment/CommentForm';
import Comment from '@components/review/comment/Comment';
//store
import { useMemberStore } from '@store/useMemberStore';

interface Props {
  festivalId: number;
  review: ReviewResponse | MyReviewResponse;
  showCommentForm: boolean;
  onToggleCommentForm?: () => void;
  isEditMode: boolean;
  isMyPage?: boolean;
  onEditModeChange: () => void;
}
/** 2023/07/22 - 리뷰 아이템 - by leekoby */
const ReviewItem: React.FC<Props> = ({
  festivalId,
  review,
  showCommentForm,
  onToggleCommentForm,
  isEditMode = false,
  isMyPage = false,
  onEditModeChange,
}): JSX.Element => {
  const { member } = useMemberStore();

  const {
    memberId,
    commentCount,
    content,
    disliked,
    liked,
    pictures,
    rating,
    reviewId,
    createdAt,
    modifiedAt,
    likedCount,
    dislikedCount,
  } = review;

  const isReviewResponse = (review: ReviewResponse | MyReviewResponse): review is ReviewResponse => {
    return 'profileUrl' in review && 'displayName' in review;
  };

  const displayName = isReviewResponse(review) ? review.displayName : member?.displayName;
  const profileUrl = isReviewResponse(review) ? review.profileUrl : null;

  // 수정 취소
  const handleCancel = () => {
    onEditModeChange();
  };
  //수정 등록
  const handleSubmit = () => {
    onEditModeChange();
  };
  /** 2023/08/07 - 댓글 더 보기  - by leekoby */
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <ReviewItemContainer>
        <HeaderWrapper>
          <ItemImgWrap>
            <img src={profileUrl || '/assets/images/default-profile-image.png'} />
          </ItemImgWrap>
          {displayName && (
            <ReviewItemHeader displayName={displayName} rating={rating} createdAt={createdAt} modifiedAt={modifiedAt} />
          )}
        </HeaderWrapper>
        {isEditMode ? (
          <ReviewEditor
            festivalId={festivalId}
            review={review}
            isEditMode
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        ) : (
          <>
            <ReviewItemContent content={content} />
            <ReviewImage pictures={pictures} />
          </>
        )}
        <ReviewBottomWrapper>
          {isMyPage ? (
            <>
              <ReviewLikes
                commentCount={commentCount}
                likedCount={likedCount}
                dislikedCount={dislikedCount}
                disliked={disliked}
                liked={liked}
                reviewId={reviewId}
                memberId={memberId}
              />

              {member?.memberId === memberId && !isEditMode && (
                <ReviewEditDelete reviewId={reviewId} festivalId={festivalId} onEditClick={onEditModeChange} />
              )}
            </>
          ) : (
            <div className="button-wrapper">
              <ReviewLikes
                commentCount={commentCount}
                likedCount={likedCount}
                dislikedCount={dislikedCount}
                disliked={disliked}
                liked={liked}
                reviewId={reviewId}
                memberId={memberId}
              />

              {member?.memberId === memberId && !isEditMode && (
                <ReviewEditDelete reviewId={reviewId} festivalId={festivalId} onEditClick={onEditModeChange} />
              )}
            </div>
          )}
          {!isMyPage && (
            <CommentButtonContainer>
              <CommentButtonWrapper>
                <button type="button" onClick={onToggleCommentForm}>
                  {showCommentForm ? '작성 취소' : '댓글 작성'}
                </button>
              </CommentButtonWrapper>
              {!!commentCount && (
                <CommentButtonWrapper onClick={() => setIsShow(prev => !prev)}>
                  <button type="button">
                    {`댓글`} {isShow ? '닫기' : `${commentCount}개`}
                  </button>
                  {isShow ? <FaAngleUp size={'1.3rem'} /> : <FaAngleDown size={'1.3rem'} />}
                </CommentButtonWrapper>
              )}
            </CommentButtonContainer>
          )}
        </ReviewBottomWrapper>
        <CommentForm
          isShow={showCommentForm}
          festivalId={festivalId}
          reviewId={reviewId}
          setIsShowForm={onToggleCommentForm}
          setIsShow={setIsShow}
        />
        {isShow && commentCount > 0 && <Comment reviewId={reviewId} />}
      </ReviewItemContainer>
    </>
  );
};

export default React.memo(ReviewItem);

const ReviewItemContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const ReviewBottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .button-wrapper {
    display: flex;
    gap: 1rem;
  }
`;

const CommentButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CommentButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-main);
  gap: 0.5rem;
  cursor: pointer;

  button {
    white-space: nowrap;
    font-size: 1.4rem;
    font-weight: bold;
    background: none;
    border: none;
    padding: 0;
    color: inherit;
    cursor: pointer;
    outline: inherit;
    &:hover {
      color: var(--color-sub);
    }
  }
`;

const ItemImgWrap = styled.div`
  height: 3rem;
  width: 3rem;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
