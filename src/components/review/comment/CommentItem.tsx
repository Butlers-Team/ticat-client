import { CommentResponse } from 'types/api';
import styled from 'styled-components';
import CommentBottom from './CommentBottom';
import CommentContent from './CommentContent';
import CommentHeader from './CommentHeader';
import CommentImage from './CommentImage';

interface Props {
  comment: CommentResponse;
}
/** 2023/07/22- 댓글 아이템 - by leekoby */
const CommentItem: React.FC<Props> = ({ comment }): JSX.Element => {
  const { commentCount, content, disliked, displayName, liked, memberId, pictures, profileUrl, rating, reviewId } =
    comment;

  return (
    <CommentItemContainer>
      <HeaderWrapper>
        {profileUrl ? (
          <img src={profileUrl} />
        ) : (
          <img style={{ width: '3rem', height: '3rem' }} src="/assets/images/symbol-ticat1.png" />
        )}
        {displayName && <CommentHeader displayName={displayName} rating={rating} />}
      </HeaderWrapper>
      <CommentContent content={content} />
      <CommentImage pictures={pictures} />
      <CommentBottom commentCount={commentCount} disliked={disliked} liked={liked} reviewId={reviewId} />
    </CommentItemContainer>
  );
};

export default CommentItem;

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
