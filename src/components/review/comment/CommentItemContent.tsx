//style
import styled from 'styled-components';
//utils
import { getSanitizedContent } from '@utils/sanitizeContent';

interface Props {
  isMyPage?: boolean;
  content: string;
}
/** 2023/08/08- 댓글 내용 - by leekoby */
const ContentItemContent: React.FC<Props> = ({ content, isMyPage }): JSX.Element => {
  const sanitizedContent = getSanitizedContent(content);
  return (
    <ContentContainer isMyPage={isMyPage}>
      <p dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </ContentContainer>
  );
};

export default ContentItemContent;

const ContentContainer = styled.div<{ isMyPage?: boolean }>`
  height: 100%;
  display: flex;
  p {
    padding: 3px 3px;
    font-size: ${({ isMyPage }) => (isMyPage ? '1.4rem' : '1.6rem')};
    overflow-wrap: break-word; /* 자동 줄 바꿈 설정 */
    word-break: break-all;
  }
`;
