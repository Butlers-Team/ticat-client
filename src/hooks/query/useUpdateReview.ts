import useCustomToast from '@hooks/useCustomToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

//keys
import { QUERY_KEYS } from './queryKeys';

// api
import { apiUpdateReview } from '@api/reviews';

interface Options {
  festivalId: number;
  reviewId?: number;
  handleReset: () => void;
}

/** 2023/08/12- 리뷰 수정 뮤테이션 - by leekoby */
export const useUpdateReview = ({ reviewId, festivalId, handleReset }: Options) => {
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  const updateReviewMutation = useMutation(apiUpdateReview, {
    onSuccess: () => {
      toast({ title: '리뷰가 성공적으로 수정되었습니다.', status: 'success' });
      queryClient.invalidateQueries([QUERY_KEYS.review, festivalId]);
      queryClient.invalidateQueries([QUERY_KEYS.review, reviewId]);
      queryClient.invalidateQueries([QUERY_KEYS.myreview]);
    },
    onError: (error: Error) => {
      toast({ title: `리뷰 수정에 실패했습니다.`, status: 'error' });
      console.error('리뷰 수정에 실패했습니다:', error.message);
    },
  });
  return updateReviewMutation;
};
