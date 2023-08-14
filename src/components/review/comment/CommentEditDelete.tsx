import { useDeleteComment } from '@hooks/query/useDeleteComment';
import { useUpdateComment } from '@hooks/query/useUpdateComment';
import styled from 'styled-components';

interface Props {
  commentId: number;
  reviewId: number;
  onEditClick: () => void;
}

/** 2023/08/12- 댓글 하단 수정 삭제 버튼 - by leekoby */
const CommentEditDelete: React.FC<Props> = ({ commentId, reviewId, onEditClick }): JSX.Element => {
  // 댓글 삭제 mutation

  const deleteCommentMutation = useDeleteComment({ reviewId });

  // 댓글 삭제 이벤트 핸들러
  const handleDeleteComment = () => {
    deleteCommentMutation.mutate({ commentId });
  };

  return (
    <ButtonWrapper>
      <button onClick={onEditClick}>수정</button>|<button onClick={handleDeleteComment}>삭제</button>
    </ButtonWrapper>
  );
};

export default CommentEditDelete;

const ButtonWrapper = styled.div`
  color: var(--color-sub);
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;

  button {
    font-size: 1.3rem;
    font-weight: 500;
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
