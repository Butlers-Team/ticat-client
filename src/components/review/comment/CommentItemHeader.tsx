import { getTimeDiff } from '@libs/time';
import styled from 'styled-components';

interface Props {
  displayName: string;
  createdAt: string;
  modifiedAt?: string;
}

/** 2023/08/08- 댓글 상단 프로필이미지/닉네임/작성일- by leekoby */
const CommentItemHeader: React.FC<Props> = ({ displayName, createdAt, modifiedAt }): JSX.Element => {
  return (
    <CommentHeaderContainer>
      <InfoWrapper>
        <span className="nickname">{displayName}</span>
      </InfoWrapper>
      <span className="createdAt">{getTimeDiff(new Date(createdAt))}</span>
    </CommentHeaderContainer>
  );
};

export default CommentItemHeader;

const CommentHeaderContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;

  .createdAt {
    font-size: 1.4rem;
    color: var(--color-dark-gray);
  }
`;
const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .nickname {
    font-size: 1.4rem;
    font-weight: 600;
  }
`;
