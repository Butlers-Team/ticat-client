//style
import styled from 'styled-components';

//icons
import { BsStarFill, BsStar, BsStarHalf } from 'react-icons/bs';

export interface reviewRatingProps {
  reviewRating: number;
  size: number;
}
/** 2023/07/23- 리뷰 별점  - by leekoby */
const ReviewRating = ({ reviewRating, size }: reviewRatingProps) => {
  return (
    <>
      {[...Array(5)].map((_, index) => {
        return index < Math.floor(reviewRating) ? (
          <StyledBsStarFill key={index} size={size} color={'var(--color-main)'} style={{ marginRight: 2 }} />
        ) : index === Math.floor(reviewRating) && reviewRating % 1 > 0 ? (
          <StyledBsStarHalf key={index} size={size} color={'var(--color-main)'} style={{ marginRight: 2 }} />
        ) : (
          <StyledBsStar key={index} size={size} color={'var(--color-main)'} style={{ marginRight: 2 }} />
        );
      })}
    </>
  );
};

const StyledBsStarFill = styled(BsStarFill)`
  font-size: ${props => props.size}px;
`;

const StyledBsStarHalf = styled(BsStarHalf)``;

const StyledBsStar = styled(BsStar)``;
export default ReviewRating;
