//style
import styled from 'styled-components';
//utils
import { getSanitizedContent } from '@utils/sanitizeContent';

interface Props {
  fontSize?: string;
  padding?: string;
  content: string;
}

/** 2023/10/16- 리뷰|댓글 내용 컴포넌트- by leekoby */
const PostContent: React.FC<Props> = ({ padding, fontSize, content }): JSX.Element => {
  const sanitizedContent = getSanitizedContent(content);
  return (
    <ContentContainer fontSize={fontSize} padding={padding}>
      <p dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </ContentContainer>
  );
};

export default PostContent;

interface ContentContainerProps extends Partial<Props> {
  padding?: string;
  fontSize?: string;
}

const ContentContainer = styled.div<ContentContainerProps>`
  p {
    padding: ${({ padding }) => padding ?? '0px 0px'};
    font-size: ${({ fontSize }) => fontSize ?? '14px'};
    overflow-wrap: break-word; /* 자동 줄 바꿈 설정 */
    word-break: break-all;
  }
`;
