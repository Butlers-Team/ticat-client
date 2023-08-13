import { useDeleteReview } from '@hooks/query/useDeleteReview';
import styled from 'styled-components';

interface Props {
  reviewId: number;
  festivalId: number;
  onEditClick: () => void;
}

/** 2023/08/13- 리뷰 수정삭제 버튼 - by leekoby */
const ReviewEditDelete: React.FC<Props> = ({ reviewId, festivalId, onEditClick }): JSX.Element => {
  // 리뷰 삭제 mutation
  const deleteReviewMutation = useDeleteReview({ reviewId, festivalId });
  // 리뷰 삭제 이벤트 핸들러
  const handleDeleteReview = () => {
    if (!confirm('리뷰를 삭제하시겠습니까? 삭제 이후 복구할 수 없습니다.')) return;

    deleteReviewMutation.mutate({ reviewId });
  };
  return (
    <ButtonWrapper>
      <button onClick={onEditClick}>수정</button>|<button onClick={handleDeleteReview}>삭제</button>
    </ButtonWrapper>
  );
};

export default ReviewEditDelete;

const ButtonWrapper = styled.div`
  color: var(--color-sub);
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;

  button {
    font-size: 1.4rem;
    font-weight: bold;
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
