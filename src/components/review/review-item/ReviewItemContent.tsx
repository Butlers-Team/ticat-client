import styled from 'styled-components';

interface Props {
  content: string;
}
/** 2023/07/22- 리뷰 내용 - by leekoby */
const ReviewItemContent: React.FC<Props> = ({ content }): JSX.Element => {
  return (
    <ContentContainer>
      <p>{content}</p>
    </ContentContainer>
  );
};

export default ReviewItemContent;

const ContentContainer = styled.div`
  p {
    font-size: 1.4rem;
  }
`;
