//query
import { useMutation, useQueryClient } from '@tanstack/react-query';

//keys
import { QUERY_KEYS } from './queryKeys';

// api
import { apiDeleteComment } from '@api/comment';

//hooks
import useCustomToast from '@hooks/useCustomToast';

interface Options {
  festivalId?: number;
  commentId?: number;
  reviewId?: number;
  handleReset?: () => void;
}

/** 2023/08/12- 댓글 삭제 뮤테이션 - by leekoby */
export const useDeleteComment = ({ festivalId, reviewId, handleReset }: Options) => {
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  const deleteCommentMutation = useMutation(apiDeleteComment, {
    onSuccess: () => {
      toast({ title: '댓글이 성공적으로 삭제되었습니다.', status: 'success' });
      queryClient.invalidateQueries([QUERY_KEYS.comment, reviewId]);
      queryClient.invalidateQueries([QUERY_KEYS.review, festivalId]);
      queryClient.invalidateQueries([QUERY_KEYS.mycomment]);
      handleReset?.();
    },
    onError: (error: Error) => {
      toast({ title: `댓글 삭제에 실패했습니다.`, status: 'error' });
      console.error('댓글 삭제에 실패했습니다:', error.message);
    },
  });
  return deleteCommentMutation;
};
