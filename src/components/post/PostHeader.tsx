//style
import styled from 'styled-components';
//components
import ReviewRating from '@components/ReviewRating';
//libs
import { getTimeDiff } from '@libs/time';

interface Props {
  displayName: string;
  rating?: number;
  createdAt: string;
  modifiedAt?: string;
  fontSize?: string;
  gap?: string;
  visible?: boolean;
}

const PostHeader: React.FC<Props> = ({
  displayName,
  createdAt,
  modifiedAt,
  rating,
  fontSize,
  gap,
  visible,
}): JSX.Element => {
  return (
    <HeaderContianer fontSize={fontSize} gap={gap}>
      <div className="info">
        {visible && <span className="nickname">{displayName}</span>}
        {rating && (
          <span className="rating">
            <ReviewRating size={16} reviewRating={rating} />
          </span>
        )}
      </div>
      <span className="createdAt">{getTimeDiff(new Date(createdAt))}</span>
    </HeaderContianer>
  );
};

export default PostHeader;

interface HeaderContianerProps {
  fontSize?: string;
  gap?: string;
}
const HeaderContianer = styled.div<HeaderContianerProps>`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;

  .createdAt {
    font-size: 1.2rem;
    color: var(--color-dark-gray);
    white-space: nowrap;
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ gap }) => (gap ? gap : '')};
    /* gap: 1.5rem; */
    .nickname {
      font-size: ${({ fontSize }) => (fontSize ? fontSize : '1.6rem')};
      font-weight: 600;
    }
    .rating {
      display: flex;
    }
  }
`;
