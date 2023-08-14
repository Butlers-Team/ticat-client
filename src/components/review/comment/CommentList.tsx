import Button from '@components/Button';
import { useFetchComments } from '@hooks/query/useFetchComment';
import { useState } from 'react';
import styled from 'styled-components';
import CommnetItem from './CommnetItem';

interface Props {
  reviewId: number;
}

/** 2023/08/07- 댓글리스트 영역  - by leekoby */
const CommentList: React.FC<Props> = ({ reviewId }): JSX.Element => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useFetchComments({ reviewId, page: 1, size: 5 });

  const [activeEditModeComment, setActiveEditModeComment] = useState<number | null>(null);

  const handleEditModeChange = (commentId: number) => {
    setActiveEditModeComment(activeEditModeComment === commentId ? null : commentId);
  };

  return (
    <CommentsContainer>
      {data &&
        data?.pages.map(page =>
          page.data.map(comment => (
            <CommnetItem
              key={comment.reviewCommentId}
              comment={comment}
              isEditMode={activeEditModeComment === comment.reviewCommentId}
              onEditModeChange={() => handleEditModeChange(comment.reviewCommentId)}
            />
          )),
        )}

      {hasNextPage && (
        <Button type="button" onClick={() => fetchNextPage()} fontSize="1.4rem">
          댓글 더 불러오기
        </Button>
      )}
    </CommentsContainer>
  );
};

export default CommentList;

const CommentsContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
