import styled from 'styled-components';

interface Props {
  content: string;
}
/** 2023/07/22- 댓글 내용 - by leekoby */
const CommentContent: React.FC<Props> = ({ content }): JSX.Element => {
  return (
    <ContentContainer>
      <p>{content}</p>
    </ContentContainer>
  );
};

export default CommentContent;

const ContentContainer = styled.div`
  p {
    font-size: 1.4rem;
  }
`;
