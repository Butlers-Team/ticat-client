//style
import styled from 'styled-components';
//types
import { CommentResponse, MyCommentResponse } from 'types/api';
//components
import CommentEditDelete from '@components/review/comment/CommentEditDelete';
import CommentForm from '@components/review/comment/CommentForm';
import ContentItemContent from '@components/review/comment/CommentItemContent';
import CommentItemHeader from '@components/review/comment/CommentItemHeader';
//store
import { useMemberStore } from '@store/useMemberStore';

interface Props {
  comment: CommentResponse | MyCommentResponse;
  isEditMode: boolean;
  isMyPage?: boolean;
  onEditModeChange: () => void;
}

/** 2023/08/07- 댓글 아이템 - by leekoby */
const CommnetItem: React.FC<Props> = ({ comment, isEditMode, onEditModeChange, isMyPage }): JSX.Element => {
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
          {!isMyPage && (
            <ItemImgWrap isMyPage={isMyPage}>
              <img src={profileUrl || '/assets/images/default-profile-image.png'} />
            </ItemImgWrap>
          )}
          {displayName && (
            <CommentItemHeader
              displayName={displayName}
              createdAt={createdAt}
              modifiedAt={modifiedAt}
              isMyPage={isMyPage}
            />
          )}
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
            <ContentItemContent content={content} isMyPage={isMyPage} />
            {member?.memberId === memberId && (
              <CommentEditDelete
                reviewId={reviewId}
                commentId={comment.reviewCommentId}
                onEditClick={onEditModeChange}
                isMyPage={isMyPage}
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
  gap: 0.5rem;
`;

const ItemImgWrap = styled.div<{ isMyPage?: boolean }>`
  height: ${({ isMyPage }) => (isMyPage ? '3rem' : '2rem')};
  width: ${({ isMyPage }) => (isMyPage ? '3rem' : '2rem')};
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
