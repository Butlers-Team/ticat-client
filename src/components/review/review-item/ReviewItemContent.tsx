//style
import styled from 'styled-components';
//utils
import { getSanitizedContent } from '@utils/sanitizeContent';

interface Props {
  content: string;
}
/** 2023/07/22- 리뷰 내용 - by leekoby */
const ReviewItemContent: React.FC<Props> = ({ content }): JSX.Element => {
  const sanitizedContent = getSanitizedContent(content);

  return (
    <ContentContainer>
      <p dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </ContentContainer>
  );
};

export default ReviewItemContent;

const ContentContainer = styled.div`
  p {
    font-size: 1.6rem;
    overflow-wrap: break-word; /* 자동 줄 바꿈 설정 */
  }
`;
