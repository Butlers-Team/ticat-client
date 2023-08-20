//style
import styled from 'styled-components';
//hooks
import { useDeleteComment } from '@hooks/query/useDeleteComment';

interface Props {
  commentId: number;
  reviewId: number;
  onEditClick: () => void;
  isMyPage?: boolean;
}

/** 2023/08/12- 댓글 하단 수정 삭제 버튼 - by leekoby */
const CommentEditDelete: React.FC<Props> = ({ commentId, reviewId, onEditClick, isMyPage }): JSX.Element => {
  // 댓글 삭제 mutation
  const deleteCommentMutation = useDeleteComment({ reviewId });

  // 댓글 삭제 이벤트 핸들러
  const handleDeleteComment = () => {
    if (!confirm('댓글을 삭제하시겠습니까? 삭제 이후 복구할 수 없습니다.')) return;
    deleteCommentMutation.mutate({ commentId });
  };

  return (
    <ButtonWrapper isMyPage={isMyPage}>
      <button onClick={onEditClick}>수정</button>|<button onClick={handleDeleteComment}>삭제</button>
    </ButtonWrapper>
  );
};

export default CommentEditDelete;

const ButtonWrapper = styled.div<{ isMyPage?: boolean }>`
  color: var(--color-sub);
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;

  button {
    font-size: ${({ isMyPage }) => (isMyPage ? '1.4rem' : '1.3rem')};
    font-weight: ${({ isMyPage }) => (isMyPage ? 'bold' : '500')};
    color: var(--color-main);

    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    outline: none;

    &:hover {
      color: var(--color-sub);
    }
  }
`;
