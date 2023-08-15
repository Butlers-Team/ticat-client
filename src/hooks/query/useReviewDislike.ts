//query
import { useMutation } from '@tanstack/react-query';

// api
import { apiCreateReviewDislike, apiDeleteReviewDislike } from '@api/review-dislike';

//hooks
import useCustomToast from '@hooks/useCustomToast';

/** 2023/07/22- 리뷰 싫어요 뮤테이션 - by leekoby */
export const useReviewDislike = () => {
  const toast = useCustomToast();

  const createReviewDislikeMutation = useMutation(apiCreateReviewDislike, {
    onSuccess: () => {
      toast({ title: '싫어요를 눌렀습니다.', status: 'success' });
    },
    onError: (error: Error) => {
      toast({ title: `싫어요 등록에 실패했습니다.`, status: 'error' });
      console.error('싫어요 등록에 실패했습니다:', error.message);
    },
  });
  const deleteReviewDislikeMutation = useMutation(apiDeleteReviewDislike, {
    onSuccess: () => {
      toast({ title: '싫어요를 취소했습니다.', status: 'success' });
    },
    onError: (error: Error) => {
      toast({ title: `싫어요 취소에 실패했습니다.`, status: 'error' });
      console.error('싫어요 취소에 실패했습니다:', error.message);
    },
  });
  return { createReviewDislikeMutation, deleteReviewDislikeMutation };
};
