import styled from 'styled-components';

interface Props {
  pictures: string[];
}
/** 2023/07/22- 댓글 상단 프로필 이미지 - by leekoby */

const CommentImage: React.FC<Props> = ({ pictures }): JSX.Element => {
  return (
    <ImageContainer>
      {pictures.map((imgUrl, idx) => (
        <img src={imgUrl} key={imgUrl + idx} alt={`comment image ${idx}`} />
      ))}
    </ImageContainer>
  );
};

export default CommentImage;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 2rem;
  margin: auto;
  img {
    width: 20%;
    height: 20%;
  }
`;
