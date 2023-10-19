//react
import React, { useState } from 'react';
//style
import styled from 'styled-components';
//types
import { MyReviewResponse, ReviewResponse } from 'types/api';
//icon
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
//components
import ReviewEditorForm from '@components/post/reviews/ReviewEditorForm';
import ReviewLikes from '@components/post/reviews/ReviewLikes';
import ReviewImage from '@components/post/reviews/ReviewImage';
import PostHeader from '../PostHeader';
import PostEditDeleteButton from '../PostEditDeleteButton';
import CommentEditorForm from '@components/post/comments/CommentEditorForm';
import Comment from '@components/post/comments/Comment';
import PostContent from '../PostContent';
//store
import { useMemberStore } from '@store/useMemberStore';
//hooks
import { useIsSameLocation } from '@hooks/useIsSameLocation';
import { useDeleteReview } from '@hooks/query/useDeleteReview';

interface Props {
  festivalId: number;
  review: ReviewResponse | MyReviewResponse;
  showCommentForm: boolean;
  onToggleCommentForm?: () => void;
  isEditMode: boolean;
  onEditModeChange: () => void;
}
/** 2023/07/22 - 리뷰 아이템 - by leekoby */
const ReviewItem: React.FC<Props> = ({
  festivalId,
  review,
  showCommentForm,
  onToggleCommentForm,
  isEditMode = false,
  onEditModeChange,
}): JSX.Element => {
  const isMyPage = useIsSameLocation('/myinfo');
  const fontSize = isMyPage ? '1.4rem' : '1.6rem';
  const visible = isMyPage ? false : true;
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

  // 리뷰 삭제 mutation
  const deleteReviewMutation = useDeleteReview({ reviewId, festivalId });
  // 리뷰 삭제 이벤트 핸들러
  const handleDeleteReview = () => {
    if (!confirm('리뷰를 삭제하시겠습니까? 삭제 이후 복구할 수 없습니다.')) return;
    deleteReviewMutation.mutate({ reviewId });
  };
  return (
    <>
      <ReviewItemContainer>
        <HeaderWrapper>
          {!isMyPage && (
            <ItemImgWrap>
              <img src={profileUrl || '/assets/images/default-profile-image.png'} />
            </ItemImgWrap>
          )}
          {displayName && (
            <PostHeader
              displayName={displayName}
              rating={rating}
              createdAt={createdAt}
              modifiedAt={modifiedAt}
              fontSize=""
              gap="1.5rem"
              visible={visible}
            />
          )}
        </HeaderWrapper>

        {isEditMode ? (
          <ReviewEditorForm
            festivalId={festivalId}
            review={review}
            isEditMode
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        ) : (
          <>
            <PostContent fontSize={fontSize} content={content} />
            <ReviewImage pictures={pictures} />
          </>
        )}
        <ReviewBottomWrapper>
          {isMyPage ? (
            <>
              <ReviewLikes
                festivalId={festivalId}
                commentCount={commentCount}
                likedCount={likedCount}
                dislikedCount={dislikedCount}
                disliked={disliked}
                liked={liked}
                reviewId={reviewId}
                memberId={memberId}
              />

              {member?.memberId === memberId && !isEditMode && (
                <>
                  <PostEditDeleteButton
                    onEditClick={onEditModeChange}
                    onDeleteClick={handleDeleteReview}
                    fontSize={'1.4rem'}
                    fontWeight={'bold'}
                  />
                </>
              )}
            </>
          ) : (
            <div className="button-wrapper">
              <ReviewLikes
                festivalId={festivalId}
                commentCount={commentCount}
                likedCount={likedCount}
                dislikedCount={dislikedCount}
                disliked={disliked}
                liked={liked}
                reviewId={reviewId}
                memberId={memberId}
              />

              {member?.memberId === memberId && !isEditMode && (
                <>
                  <PostEditDeleteButton
                    onEditClick={onEditModeChange}
                    onDeleteClick={handleDeleteReview}
                    fontSize={'1.4rem'}
                    fontWeight={'bold'}
                  />
                </>
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
        <CommentEditorForm
          isShow={showCommentForm}
          festivalId={festivalId}
          reviewId={reviewId}
          setIsShowForm={onToggleCommentForm}
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
