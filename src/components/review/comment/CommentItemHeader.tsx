//style
import styled from 'styled-components';
//libs
import { getTimeDiff } from '@libs/time';

interface Props {
  displayName: string;
  createdAt: string;
  modifiedAt?: string;
  isMyPage?: boolean;
}

/** 2023/08/08- 댓글 상단 프로필이미지/닉네임/작성일- by leekoby */
const CommentItemHeader: React.FC<Props> = ({ displayName, createdAt, modifiedAt, isMyPage }): JSX.Element => {
  return (
    <CommentHeaderContainer isMyPage={isMyPage}>
      <InfoWrapper>{!isMyPage && <span className="nickname">{displayName}</span>}</InfoWrapper>
      <span className="createdAt">{getTimeDiff(new Date(createdAt))}</span>
    </CommentHeaderContainer>
  );
};

export default CommentItemHeader;

const CommentHeaderContainer = styled.div<{ isMyPage?: boolean }>`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;

  .createdAt {
    font-size: 1.2rem;
    color: var(--color-dark-gray);
    white-space: nowrap;
  }
`;
const InfoWrapper = styled.div<{ isMyPage?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  .nickname {
    font-size: ${({ isMyPage }) => (isMyPage ? '1.6rem' : '1.4rem')};
    font-weight: 600;
  }
`;
