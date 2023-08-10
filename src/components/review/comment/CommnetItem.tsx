//react
//style
import styled from 'styled-components';
//install library
//api
//types
import { CommentResponse } from 'types/api';
import ContentItemContent from './CommentItemContent';
import CommentItemHeader from './CommentItemHeader';
//icon
//components
//hooks
//util
//store

interface Props {
  comment: CommentResponse;
}

/** 2023/08/07- 댓글 아이템 - by leekoby */
const CommnetItem: React.FC<Props> = ({ comment }): JSX.Element => {
  const { content, createdAt, displayName, memberId, reviewCommentId, modifiedAt, profileUrl } = comment;
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
        <ContentItemContent content={content} />
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
