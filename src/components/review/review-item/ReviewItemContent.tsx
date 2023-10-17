//style
import styled from 'styled-components';
//utils
import { getSanitizedContent } from '@utils/sanitizeContent';
//hooks
import { useIsSameLocation } from '@hooks/useIsSameLocation';

interface Props {
  content: string;
}
/** 2023/07/22- 리뷰 내용 - by leekoby */
const ReviewItemContent: React.FC<Props> = ({ content }): JSX.Element => {
  const isMyPage = useIsSameLocation('/myinfo');
  const sanitizedContent = getSanitizedContent(content);
  return (
    <ContentContainer isMyPage={isMyPage}>
      <p dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </ContentContainer>
  );
};

export default ReviewItemContent;

interface ContentContainerProps {
  isMyPage: boolean;
}

const ContentContainer = styled.div<ContentContainerProps>`
  p {
    font-size: ${({ isMyPage }) => (isMyPage ? '1.4rem' : '1.6rem')};
    overflow-wrap: break-word; /* 자동 줄 바꿈 설정 */
  }
`;
