import useCustomToast from '@hooks/useCustomToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

//keys
import { QUERY_KEYS } from './queryKeys';

// api
import { apiCreateReview } from '@api/reviews';
import { useNavigate } from 'react-router-dom';

//type
import { ApiCreateReviewRequest } from 'types/api/';

interface CreateReviewHookOptions {
  festivalId: number;
  handleReset: () => void;
}

/** 2023/07/21- 리뷰 등록 뮤테이션 - by leekoby */
export const useCreateReview = ({ festivalId, handleReset }: CreateReviewHookOptions) => {
  const navigate = useNavigate();
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  const ReviewMutation = useMutation(apiCreateReview, {
    onSuccess: () => {
      toast({ title: '리뷰가 성공적으로 등록되었습니다.', status: 'success' });
      queryClient.invalidateQueries([QUERY_KEYS.review, festivalId]);
      handleReset();
    },
    onError: (error: Error) => {
      toast({ title: `리뷰 등록에 실패했습니다.`, status: 'error' });
      console.error('리뷰 등록에 실패했습니다:', error.message);
    },
  });
  return ReviewMutation;
};
