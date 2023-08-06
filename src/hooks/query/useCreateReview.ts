import useCustomToast from '@hooks/useCustomToast';
import { useMutation } from '@tanstack/react-query';

// api
import { apiCreateReview } from '@api/reviews';
import { useNavigate } from 'react-router-dom';

//type
import { ApiCreateReviewRequest } from 'types/api/';

/** 2023/07/21- 리뷰 등록 뮤테이션 - by leekoby */
export const useCreateReview = () => {
  const navigate = useNavigate();
  const toast = useCustomToast();

  const ReviewMutation = useMutation(apiCreateReview, {
    onSuccess: () => {
      toast({ title: '리뷰이 성공적으로 등록되었습니다.', status: 'success' });
    },
    onError: (error: Error) => {
      toast({ title: `리뷰 등록에 실패했습니다.`, status: 'error' });
      console.error('리뷰 등록에 실패했습니다:', error.message);
    },
  });
  return ReviewMutation;
};
