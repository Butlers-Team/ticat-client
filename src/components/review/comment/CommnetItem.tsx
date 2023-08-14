//react
//style
import { useMemberStore } from '@store/useMemberStore';
import { useState } from 'react';
import styled from 'styled-components';
//install library
//api
//types
import { CommentResponse } from 'types/api';
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
  comment: CommentResponse;
  isEditMode: boolean;
  onEditModeChange: () => void;
}

/** 2023/08/07- 댓글 아이템 - by leekoby */
const CommnetItem: React.FC<Props> = ({ comment, isEditMode, onEditModeChange }): JSX.Element => {
  const { member } = useMemberStore();

  const { content, festivalId, reviewId, createdAt, displayName, memberId, reviewCommentId, modifiedAt, profileUrl } =
    comment;

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
          {profileUrl ? (
            <img src={profileUrl} />
          ) : (
            <img style={{ width: '2rem', height: '2rem' }} src="/assets/images/symbol-ticat1.png" />
          )}
          {displayName && <CommentItemHeader displayName={displayName} createdAt={createdAt} modifiedAt={modifiedAt} />}
        </HeaderWrapper>
        {isEditMode ? (
          <CommentForm
            festivalId={comment.festivalId}
            reviewId={comment.reviewId}
            comment={comment}
            show
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
