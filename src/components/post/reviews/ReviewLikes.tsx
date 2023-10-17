//react
import { useRef, useState } from 'react';
//hooks
import { useReviewDislike, useReviewLike } from '@hooks/query';
//store
import { useMemberStore } from '@store/useMemberStore';

import {
  BiDislike as FalseDislike,
  BiLike as FalseLike,
  BiSolidDislike as TrueDislike,
  BiSolidLike as TrueLike,
} from 'react-icons/bi';

import styled from 'styled-components';
import useCustomToast from '@hooks/useCustomToast';
import { optimisticUpdateWithMutate } from '@utils/optimisticUpdateWithMutate';

interface Props {
  festivalId: number;
  memberId: number | null;
  reviewId: number;
  commentCount: number;
  liked?: boolean;
  disliked?: boolean;
  likedCount?: number;
  dislikedCount?: number;
}
/** 2023/07/22- 리뷰 하단 좋아요/싫어요/댓글 보기/댓글 작성 - by leekoby */
const ReviewLikes: React.FC<Props> = ({
  festivalId,
  commentCount,
  liked,
  disliked,
  reviewId,
  memberId,
  likedCount,
  dislikedCount,
}): JSX.Element => {
  const { createReviewLikeMutation, deleteReviewLikeMutation } = useReviewLike({ festivalId, reviewId });
  const { createReviewDislikeMutation, deleteReviewDislikeMutation } = useReviewDislike({ festivalId, reviewId });
  const [isLiked, setIsLiked] = useState(liked);
  const [isDisliked, setIsDisliked] = useState(disliked);
  const [likeCount, setLikeCount] = useState(likedCount || 0);
  const [dislikeCount, setDislikeCount] = useState(dislikedCount || 0);

  const timer = useRef<ReturnType<typeof setTimeout>>(); // 타이머 생성 레퍼런스를 사용

  const handleLikeClick = () => {
    optimisticUpdateWithMutate(
      timer,
      isLiked,
      setIsLiked,
      500,
      createReviewLikeMutation,
      deleteReviewLikeMutation,
      setLikeCount,
      isDisliked,
      setIsDisliked,
      setDislikeCount,
    );
  };

  const handleDislikeClick = () => {
    optimisticUpdateWithMutate(
      timer,
      isDisliked,
      setIsDisliked,
      500,
      createReviewDislikeMutation,
      deleteReviewDislikeMutation,
      setDislikeCount,
      isLiked,
      setIsLiked,
      setLikeCount,
    );
  };

  return (
    <>
      <ReviewBottomContainer>
        <IconContainer>
          <button type="button" className={`like-btn`} onClick={handleLikeClick}>
            {isLiked ? <TrueLike /> : <FalseLike />}
          </button>
          <span>({likeCount})</span>
          <button type="button" className={`dislike-btn`} onClick={handleDislikeClick}>
            {isDisliked ? <TrueDislike /> : <FalseDislike />}
          </button>
          <span>({dislikeCount})</span>
        </IconContainer>
      </ReviewBottomContainer>
    </>
  );
};

export default ReviewLikes;

const ReviewBottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  button {
    display: flex;
    font-size: 1.4rem;
    font-weight: bold;
    color: var(--color-main);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    outline: inherit;
  }
  span {
    font-size: 1.4rem;
  }
  .like-btn {
    color: var(--color-main);

    &:hover {
      color: var(--color-sub);
    }
  }
  .dislike-btn {
    color: #d85757;

    &:hover {
      color: #ff7a7a;
    }
  }
`;
