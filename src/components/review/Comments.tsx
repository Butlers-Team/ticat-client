import { useFetchComments } from '@hooks/query/useFetchComments';
import styled from 'styled-components';
import CommentItem from './comment/CommentItem';

interface Props {
  festivalId: number;
}
/** 2023/07/22- 댓글리스트 영역  - by leekoby */
const Comments: React.FC<Props> = ({ festivalId }): JSX.Element => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useFetchComments({ festivalId, page: 1, size: 5 });

  return (
    <CommentsContainer>
      {data?.pages.map(page => page.data.map(comment => <CommentItem key={comment.reviewId} comment={comment} />))}
    </CommentsContainer>
  );
};

export default Comments;

const CommentsContainer = styled.section`
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;
