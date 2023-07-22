import useCustomToast from '@hooks/useCustomToast';
import { useMutation } from '@tanstack/react-query';

// api
import { apiCreateComment } from '@api/comment';
import { useNavigate } from 'react-router-dom';

//type
import { ApiCreateCommentRequest } from 'types/api/';

/** 2023/07/21- 댓글 등록 뮤테이션 - by leekoby */
export const useCreateComment = () => {
  const navigate = useNavigate();
  const toast = useCustomToast();

  const CommentMutation = useMutation(apiCreateComment, {
    onSuccess: () => {
      toast({ title: '댓글이 성공적으로 등록되었습니다.', status: 'success' });
    },
    onError: (error: Error) => {
      toast({ title: `댓글 등록에 실패했습니다.`, status: 'error' });
      console.error('댓글 등록에 실패했습니다:', error.message);
    },
  });
  return CommentMutation;
};
