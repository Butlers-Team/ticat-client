// querys
import { useMutation } from '@tanstack/react-query';

// api
import { festivalLikedRequest } from '@api/festivalliked';

interface FestivalLikeProps {
  festivalId: number;
}

/** 2023/10/11 - 축제 좋아요 뮤테이션 - by sineTlsl */
export const usePostFestivalLike = ({ festivalId }: FestivalLikeProps) => {
  return useMutation(() => festivalLikedRequest(festivalId), {});
};
