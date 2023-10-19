// query
import { useMutation, useQueryClient } from '@tanstack/react-query';

//keys
import { QUERY_KEYS } from './queryKeys';

// api
import { apiCreateComment } from '@api/comment';

//hooks
import useCustomToast from '@hooks/useCustomToast';

interface Options {
  festivalId: number;
  reviewId: number;
  handleReset: () => void;
}

/** 2023/08/07- 댓글 등록 뮤테이션 - by leekoby */
export const useCreateComment = ({ festivalId, reviewId, handleReset }: Options) => {
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation(apiCreateComment, {
    onSuccess: () => {
      toast({ title: '댓글이 성공적으로 등록되었습니다.', status: 'success' });
      queryClient.invalidateQueries([
        QUERY_KEYS.comment,
        QUERY_KEYS.review,
        QUERY_KEYS.mycomment,
        festivalId,
        reviewId,
      ]);
      queryClient.invalidateQueries([]);
      handleReset();
    },
    onError: (error: Error) => {
      toast({ title: `댓글 등록에 실패했습니다.`, status: 'error' });
      console.error('댓글 등록에 실패했습니다:', error.message);
    },
  });
  return createCommentMutation;
};
