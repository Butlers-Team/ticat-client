import useCustomToast from '@hooks/useCustomToast';
import { useMutation } from '@tanstack/react-query';

// api
import { apiCreateCommentLike, apiDeleteCommentLike } from '@api/comment-like';
import { useNavigate } from 'react-router-dom';

//type
import type { ApiCreateLikeRequest } from 'types/api';

/** 2023/07/22- 댓글 좋아요 뮤테이션 - by leekoby */
//TODO: onSuccess, onSettled, OnMutate, onError,getQueryData,setQueryData 사용법 공부하고 리팩토링해야함
export const useCommentLike = () => {
  const toast = useCustomToast();

  const createCommentLikeMutation = useMutation(apiCreateCommentLike, {
    onSuccess: () => {
      toast({ title: '좋아요를 눌렀습니다.', status: 'success' });
    },
    onError: (error: Error) => {
      toast({ title: `좋아요 등록에 실패했습니다.`, status: 'error' });
      console.error('좋아요 등록에 실패했습니다:', error.message);
    },
  });
  const deleteCommentLikeMutation = useMutation(apiDeleteCommentLike, {
    onSuccess: () => {
      toast({ title: '좋아요를 취소했습니다.', status: 'success' });
    },
    onError: (error: Error) => {
      toast({ title: `좋아요 취소에 실패했습니다.`, status: 'error' });
      console.error('좋아요 취소에 실패했습니다:', error.message);
    },
  });
  return { createCommentLikeMutation, deleteCommentLikeMutation };
};
