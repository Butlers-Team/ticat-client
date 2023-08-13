import useCustomToast from '@hooks/useCustomToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

//keys
import { QUERY_KEYS } from './queryKeys';

// api
import { apiDeleteReview } from '@api/reviews';

interface Options {
  festivalId: number;
  reviewId: number;
  handleReset?: () => void;
}

/** 2023/08/12- 리뷰 삭제 뮤테이션 - by leekoby */
export const useDeleteReview = ({ reviewId, festivalId, handleReset }: Options) => {
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  const deleteReviewMutation = useMutation(apiDeleteReview, {
    onSuccess: () => {
      toast({ title: '리뷰가 성공적으로 삭제되었습니다.', status: 'success' });
      queryClient.invalidateQueries([QUERY_KEYS.review, reviewId]);
      queryClient.invalidateQueries([QUERY_KEYS.review, festivalId]);
    },
    onError: (error: Error) => {
      toast({ title: `리뷰 삭제에 실패했습니다.`, status: 'error' });
      console.error('리뷰 삭제에 실패했습니다:', error.message);
    },
  });
  return deleteReviewMutation;
};
