//style
import styled from 'styled-components';
//types
import { CommentResponse, MyCommentResponse } from 'types/api';
//components
import PostEditDeleteButton from '../PostEditDeleteButton';
import CommentEditorForm from '@components/post/comments/CommentEditorForm';
import PostContent from '../PostContent';
import PostHeader from '../PostHeader';
//store
import { useMemberStore } from '@store/useMemberStore';
import { useIsSameLocation } from '@hooks/useIsSameLocation';
import { useDeleteComment } from '@hooks/query';

interface Props {
  comment: CommentResponse | MyCommentResponse;
  isEditMode: boolean;
  onEditModeChange: () => void;
}

/** 2023/08/07- 댓글 아이템 - by leekoby */
const CommnetItem: React.FC<Props> = ({ comment, isEditMode, onEditModeChange }): JSX.Element => {
  const isMyPage = useIsSameLocation('/myinfo');
  const fontSize = isMyPage ? '1.4rem' : '1.6rem';
  const padding = isMyPage ? undefined : '3px 3px';
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

  // 댓글 삭제 mutation
  const deleteCommentMutation = useDeleteComment({ festivalId, reviewId });

  // 댓글 삭제 이벤트 핸들러
  const handleDeleteComment = () => {
    if (!confirm('댓글을 삭제하시겠습니까? 삭제 이후 복구할 수 없습니다.')) return;
    deleteCommentMutation.mutate({ commentId: reviewCommentId });
  };

  return (
    <>
      <CommentItemContainer>
        {!isMyPage && (
          <HeaderWrapper>
            <ItemImgWrap isMyPage={isMyPage}>
              <img src={profileUrl || '/assets/images/default-profile-image.png'} />
            </ItemImgWrap>
            {displayName && (
              <PostHeader displayName={displayName} createdAt={createdAt} modifiedAt={modifiedAt} fontSize="1.4rem" />
            )}
          </HeaderWrapper>
        )}
        {isEditMode ? (
          <CommentEditorForm
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
            {!isMyPage ? (
              <>
                <PostContent content={content} fontSize={fontSize} />
              </>
            ) : (
              <MyPageContent>
                <PostContent content={content} padding={padding} fontSize={fontSize} />
                {displayName && (
                  <PostHeader
                    displayName={displayName}
                    createdAt={createdAt}
                    modifiedAt={modifiedAt}
                    fontSize="1.4rem"
                  />
                )}
              </MyPageContent>
            )}
            {member?.memberId === memberId && (
              <>
                <PostEditDeleteButton
                  onEditClick={onEditModeChange}
                  onDeleteClick={handleDeleteComment}
                  fontSize={isMyPage ? '1.4rem' : '1.3rem'}
                  fontWeight={isMyPage ? 'bold' : '500'}
                />
              </>
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

const MyPageContent = styled.div`
  display: flex;
`;
