import { useReviewDislike, useReviewLike } from '@hooks/query';
import { useState } from 'react';

import {
  BiDislike as FalseDislike,
  BiLike as FalseLike,
  BiSolidDislike as TrueDislike,
  BiSolidLike as TrueLike,
} from 'react-icons/bi';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

import { GoCommentDiscussion } from 'react-icons/go';
import styled from 'styled-components';

interface Props {
  reviewId: number;
  commentCount: number;
  liked: boolean;
  disliked: boolean;
  likedCount?: number;
  dislikedCount?: number;
}
/** 2023/07/22- 리뷰 하단 좋아요/싫어요/답글 보기/답글 작성 - by leekoby */

const ReviewItemBottom: React.FC<Props> = ({ commentCount, liked, disliked, reviewId }): JSX.Element => {
  const { createReviewLikeMutation, deleteReviewLikeMutation } = useReviewLike();
  const { createReviewDislikeMutation, deleteReviewDislikeMutation } = useReviewDislike();
  const [isLiked, setIsLiked] = useState(liked);
  const [isDisliked, setIsDisliked] = useState(disliked);

  let timer: ReturnType<typeof setTimeout>; // 타이머 생성
  const handleLikeClick = () => {
    const previousIsLiked = isLiked;

    if (timer) {
      clearTimeout(timer); // 기존에 설정된 타이머가 있다면 초기화
    }

    // Optimistic UI 업데이트
    if (isDisliked) {
      setIsDisliked(false);
    }
    setIsLiked(prevState => !prevState);

    // 일정 시간 동안 대기 후 API 호출
    timer = setTimeout(() => {
      if (!isLiked) {
        createReviewLikeMutation.mutate(
          { reviewId },
          {
            onError: () => {
              // 에러 발생 시 원래 상태
              setIsLiked(previousIsLiked);
            },
          },
        );
      } else {
        deleteReviewLikeMutation.mutate(
          { reviewId },
          {
            onError: () => {
              // 에러 발생 시 원래 상태
              setIsLiked(previousIsLiked);
            },
          },
        );
      }
    }, 3000); // 3초 동안 다른 동작이 없으면 API 호출 진행
  };

  const handleDislikeClick = () => {
    const previousIsDisliked = isDisliked;

    if (timer) {
      clearTimeout(timer); // 기존에 설정된 타이머가 있다면 초기화
    }

    // Optimistic UI 업데이트
    if (isLiked) {
      setIsLiked(false);
    }
    setIsDisliked(prevState => !prevState);

    // 일정 시간 동안 대기 후 API 호출
    timer = setTimeout(() => {
      if (!isDisliked) {
        createReviewDislikeMutation.mutate(
          { reviewId },
          {
            onError: () => {
              // 에러 발생 시 원래 상태로
              setIsDisliked(previousIsDisliked);
            },
          },
        );
      } else {
        deleteReviewDislikeMutation.mutate(
          { reviewId },
          {
            onError: () => {
              // 에러 발생 시 원래 상태로
              setIsDisliked(previousIsDisliked);
            },
          },
        );
      }
    }, 3000); // 3초 동안 다른 동작이 없으면 API 호출 진행
  };

  return (
    <ReviewBottomContainer>
      <IconContainer>
        <button className={`like-btn`} onClick={handleLikeClick}>
          {isLiked ? <TrueLike /> : <FalseLike />}
        </button>
        <button className={`dislike-btn`} onClick={handleDislikeClick}>
          {isDisliked ? <TrueDislike /> : <FalseDislike />}
        </button>
        <button>
          <GoCommentDiscussion />
        </button>
      </IconContainer>
      {!commentCount && (
        <RecommentButtonContainer>
          <FaAngleDown size={'1.3rem'} />
          <button>{`답글 ${commentCount}개`}</button>
        </RecommentButtonContainer>
      )}
    </ReviewBottomContainer>
  );
};

export default ReviewItemBottom;

const ReviewBottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

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
const RecommentButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-main);
  gap: 0.5rem;

  &:hover {
    color: var(--color-sub);
  }
  button {
    font-size: 1.3rem;
    font-weight: bold;
    background: none;
    border: none;
    padding: 0;
    color: inherit;
    cursor: pointer;
    outline: inherit;
  }
`;
