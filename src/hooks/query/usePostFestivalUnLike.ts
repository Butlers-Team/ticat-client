// querys
import { useMutation } from '@tanstack/react-query';

// api
import { festivalUnLikedRequest } from '@api/festivalliked';

interface FestivalUnLikeProps {
  festivalId: number;
}

/** 2023/10/11 - 축제 좋아요 취소 뮤테이션 - by sineTlsl */
export const usePostFestivalUnLike = ({ festivalId }: FestivalUnLikeProps) => {
  return useMutation(() => festivalUnLikedRequest(festivalId), {});
};
