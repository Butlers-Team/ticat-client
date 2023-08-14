//react
//style
import { useMemberStore } from '@store/useMemberStore';
import { useState } from 'react';
import styled from 'styled-components';
//install library
//api
//types
import { CommentResponse, MyCommentResponse } from 'types/api';
import CommentEditDelete from './CommentEditDelete';
import CommentForm from './CommentForm';
import ContentItemContent from './CommentItemContent';
import CommentItemHeader from './CommentItemHeader';
//icon
//components
//hooks
//util
//store

interface Props {
  comment: CommentResponse | MyCommentResponse;
  isEditMode: boolean;
  onEditModeChange: () => void;
}

/** 2023/08/07- 댓글 아이템 - by leekoby */
const CommnetItem: React.FC<Props> = ({ comment, isEditMode, onEditModeChange }): JSX.Element => {
  const { member } = useMemberStore();

  const { content, festivalId, reviewId, createdAt, memberId, reviewCommentId, modifiedAt } = comment;

  const isReviewResponse = (comment: CommentResponse | MyCommentResponse): comment is CommentResponse => {
    return 'profileUrl' in comment && 'displayName' in comment;
  };

  const displayName = isReviewResponse(comment) ? comment.displayName : member?.displayName;
  const profileUrl = isReviewResponse(comment) ? comment.profileUrl : null;

  //취소
  const handleCancel = () => {
    onEditModeChange();
  };
  //수정 등록
  const handleSubmit = () => {
    onEditModeChange();
  };

  return (
    <>
      <CommentItemContainer>
        <HeaderWrapper>
          <ItemImgWrap>
            <img src={profileUrl || '/assets/images/default-profile-image.png'} />
          </ItemImgWrap>
          {displayName && <CommentItemHeader displayName={displayName} createdAt={createdAt} modifiedAt={modifiedAt} />}
        </HeaderWrapper>
        {isEditMode ? (
          <CommentForm
            festivalId={comment.festivalId}
            reviewId={comment.reviewId}
            comment={comment}
            isShow
            isEditMode
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        ) : (
          <>
            <ContentItemContent content={content} />
            {member?.memberId === memberId && (
              <CommentEditDelete
                reviewId={reviewId}
                commentId={comment.reviewCommentId}
                onEditClick={onEditModeChange}
              />
            )}
          </>
        )}
      </CommentItemContainer>
    </>
  );
};

export default CommnetItem;
const CommentItemContainer = styled.section`
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

const ItemImgWrap = styled.div`
  height: 2rem;
  width: 2rem;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
