//query
import { useMutation, useQueryClient } from '@tanstack/react-query';

// api
import { apiCreateReviewLike, apiDeleteReviewLike } from '@api/review-like';

//hooks
import useCustomToast from '@hooks/useCustomToast';
import { QUERY_KEYS } from './queryKeys';
import { ReviewLikeTypes } from 'types/api';

/** 2023/07/22- 리뷰 좋아요 뮤테이션 - by leekoby */

export const useReviewLike = ({ festivalId, reviewId }: ReviewLikeTypes) => {
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  //좋아요 등록
  const createReviewLikeMutation = useMutation(() => apiCreateReviewLike({ reviewId }), {
    onSuccess: () => {
      toast({ title: '좋아요를 눌렀습니다.', status: 'success' });
      queryClient.invalidateQueries([QUERY_KEYS.review, festivalId]);
    },
    onError: (error: Error) => {
      toast({ title: `좋아요 등록에 실패했습니다.`, status: 'error' });
      console.error('좋아요 등록에 실패했습니다:', error.message);
    },
  });

  //좋아요 삭제
  const deleteReviewLikeMutation = useMutation(() => apiDeleteReviewLike({ reviewId }), {
    onSuccess: () => {
      toast({ title: '좋아요를 취소했습니다.', status: 'success' });
      queryClient.invalidateQueries([QUERY_KEYS.review, festivalId]);
    },
    onError: (error: Error) => {
      toast({ title: `좋아요 취소에 실패했습니다.`, status: 'error' });
      console.error('좋아요 취소에 실패했습니다:', error.message);
    },
  });
  return { createReviewLikeMutation, deleteReviewLikeMutation };
};
