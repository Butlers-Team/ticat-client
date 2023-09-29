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
  memberId: writerId,
  likedCount,
  dislikedCount,
}): JSX.Element => {
  const toast = useCustomToast();

  const { member } = useMemberStore();

  const { createReviewLikeMutation, deleteReviewLikeMutation } = useReviewLike({ festivalId });
  const { createReviewDislikeMutation, deleteReviewDislikeMutation } = useReviewDislike({ festivalId });
  const [isLiked, setIsLiked] = useState(liked);
  const [isDisliked, setIsDisliked] = useState(disliked);

  const timer = useRef<ReturnType<typeof setTimeout>>(); // 타이머 생성 레퍼런스를 사용

  const handleLikeClick = () => {
    if (member?.memberId === writerId) return toast({ title: '본인이 작성한 글입니다.', status: 'error' });

    const previousIsLiked = isLiked;

    if (timer.current) {
      clearTimeout(timer.current); // 기존에 설정된 타이머가 있다면 초기화
    }

    // Optimistic UI 업데이트
    if (isDisliked) {
      setIsDisliked(false);
    }
    setIsLiked(prevState => !prevState);

    // 일정 시간 동안 대기 후 API 호출
    timer.current = setTimeout(() => {
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
    }, 1000); // 1초 동안 다른 동작이 없으면 API 호출 진행
  };

  const handleDislikeClick = () => {
    if (member?.memberId === writerId) return toast({ title: '본인이 작성한 글입니다.', status: 'error' });

    const previousIsDisliked = isDisliked;

    if (timer.current) {
      clearTimeout(timer.current); // 기존에 설정된 타이머가 있다면 초기화
    }

    // Optimistic UI 업데이트
    if (isLiked) {
      setIsLiked(false);
    }
    setIsDisliked(prevState => !prevState);

    // 일정 시간 동안 대기 후 API 호출
    timer.current = setTimeout(() => {
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
    }, 1000); // 1초 동안 다른 동작이 없으면 API 호출 진행
  };

  return (
    <>
      <ReviewBottomContainer>
        <IconContainer>
          <button type="button" className={`like-btn`} onClick={handleLikeClick}>
            {isLiked ? <TrueLike /> : <FalseLike />}
          </button>
          <span>({likedCount})</span>
          <button type="button" className={`dislike-btn`} onClick={handleDislikeClick}>
            {isDisliked ? <TrueDislike /> : <FalseDislike />}
          </button>
          <span>({dislikedCount})</span>
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
