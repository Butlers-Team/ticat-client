import useCustomToast from '@hooks/useCustomToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

//keys
import { QUERY_KEYS } from './queryKeys';

// api
import { apiUpdateComment } from '@api/comment';

interface Options {
  commentId?: number;
  reviewId?: number;
  handleReset?: () => void;
}

/** 2023/08/12- 댓글 수정 뮤테이션 - by leekoby */
export const useUpdateComment = ({ commentId, reviewId, handleReset }: Options) => {
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  const updateCommentMutation = useMutation(apiUpdateComment, {
    onSuccess: () => {
      toast({ title: '댓글이 성공적으로 수정되었습니다.', status: 'success' });
      queryClient.invalidateQueries([QUERY_KEYS.comment, reviewId]);
      handleReset && handleReset();
    },
    onError: (error: Error) => {
      toast({ title: `댓글 수정에 실패했습니다.`, status: 'error' });
      console.error('댓글 수정에 실패했습니다:', error.message);
    },
  });
  return updateCommentMutation;
};
