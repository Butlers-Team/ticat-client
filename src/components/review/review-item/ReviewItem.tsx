//react
import React, { useState } from 'react';
//api
//types
import { ReviewResponse } from 'types/api';
//install library
import styled from 'styled-components';
//icon
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
//components
import ReviewLikes from './ReviewLikes';
import ReviewItemContent from './ReviewItemContent';
import ReviewItemHeader from './ReviewItemHeader';
import ReviewImage from './ReviewImage';
import CommentForm from '../comment/CommentForm';
import Comment from '../comment/Comment';
import ReviewEditDelete from './ReviewEditDelete';
//hooks
//util
//store
import { useMemberStore } from '@store/useMemberStore';
import ReviewEditor from '../ReviewEditor';
import useCustomToast from '@hooks/useCustomToast';

interface Props {
  festivalId: number;
  review: ReviewResponse;
  showCommentForm: boolean;
  onToggleCommentForm: () => void;
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
  const toast = useCustomToast();
  const { member } = useMemberStore();
  const {
    commentCount,
    content,
    disliked,
    displayName,
    liked,
    memberId,
    pictures,
    profileUrl,
    rating,
    reviewId,
    createdAt,
    modifiedAt,
  } = review;

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
          {profileUrl ? (
            <img src={profileUrl} />
          ) : (
            <img style={{ width: '3rem', height: '3rem' }} src="/assets/images/symbol-ticat1.png" />
          )}
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
          <div className="button-wrapper">
            <ReviewLikes
              commentCount={commentCount}
              disliked={disliked}
              liked={liked}
              reviewId={reviewId}
              memberId={memberId}
            />

            {member?.memberId === memberId && !isEditMode && (
              <ReviewEditDelete reviewId={reviewId} festivalId={festivalId} onEditClick={onEditModeChange} />
            )}
          </div>
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
        </ReviewBottomWrapper>
        <CommentForm
          show={showCommentForm}
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
