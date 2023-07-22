import useCustomToast from '@hooks/useCustomToast';
import { useMutation } from '@tanstack/react-query';

// api
import { apiCreateCommentDislike, apiDeleteCommentDislike } from '@api/comment-dislike';
import { useNavigate } from 'react-router-dom';

//type

/** 2023/07/22- 댓글 싫어요 뮤테이션 - by leekoby */
export const useCommentDislike = () => {
  const toast = useCustomToast();

  const createCommentDislikeMutation = useMutation(apiCreateCommentDislike, {
    onSuccess: () => {
      toast({ title: '싫어요를 눌렀습니다.', status: 'success' });
    },
    onError: (error: Error) => {
      toast({ title: `싫어요 등록에 실패했습니다.`, status: 'error' });
      console.error('싫어요 등록에 실패했습니다:', error.message);
    },
  });
  const deleteCommentDislikeMutation = useMutation(apiDeleteCommentDislike, {
    onSuccess: () => {
      toast({ title: '싫어요를 취소했습니다.', status: 'success' });
    },
    onError: (error: Error) => {
      toast({ title: `싫어요 취소에 실패했습니다.`, status: 'error' });
      console.error('싫어요 취소에 실패했습니다:', error.message);
    },
  });
  return { createCommentDislikeMutation, deleteCommentDislikeMutation };
};
