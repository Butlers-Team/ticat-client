//query
import { useMutation } from '@tanstack/react-query';

// api
import { apiCreateReviewLike, apiDeleteReviewLike } from '@api/review-like';

//hooks
import useCustomToast from '@hooks/useCustomToast';

/** 2023/07/22- 리뷰 좋아요 뮤테이션 - by leekoby */
export const useReviewLike = () => {
  const toast = useCustomToast();

  //좋아요 등록
  const createReviewLikeMutation = useMutation(apiCreateReviewLike, {
    onSuccess: () => {
      toast({ title: '좋아요를 눌렀습니다.', status: 'success' });
    },
    onError: (error: Error) => {
      toast({ title: `좋아요 등록에 실패했습니다.`, status: 'error' });
      console.error('좋아요 등록에 실패했습니다:', error.message);
    },
  });

  //좋아요 삭제
  const deleteReviewLikeMutation = useMutation(apiDeleteReviewLike, {
    onSuccess: () => {
      toast({ title: '좋아요를 취소했습니다.', status: 'error' });
    },
    onError: (error: Error) => {
      toast({ title: `좋아요 취소에 실패했습니다.`, status: 'error' });
      console.error('좋아요 취소에 실패했습니다:', error.message);
    },
  });
  return { createReviewLikeMutation, deleteReviewLikeMutation };
};
