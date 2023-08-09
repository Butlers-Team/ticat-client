import { getSanitizedContent } from '@utils/sanitizeContent';
import styled from 'styled-components';

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
  }
`;
