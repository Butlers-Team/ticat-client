import { getSanitizedContent } from '@utils/sanitizeContent';
import styled from 'styled-components';

interface Props {
  content: string;
}
/** 2023/08/08- 댓글 내용 - by leekoby */
const ContentItemContent: React.FC<Props> = ({ content }): JSX.Element => {
  const sanitizedContent = getSanitizedContent(content);
  return (
    <ContentContainer>
      <p dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </ContentContainer>
  );
};

export default ContentItemContent;

const ContentContainer = styled.div`
  p {
    font-size: 1.4rem;
    overflow-wrap: break-word; /* 자동 줄 바꿈 설정 */
  }
`;
