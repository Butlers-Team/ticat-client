import instance from '@api/axiosInstance';

/** 2023/07/15 - 닉네임, 관심사 등록 요청  - by parksubeom */
export const festivalLikedRequest = async (contentId: number) => {
  const { data } = await instance.post<string>(`/festivals/${contentId}/favorite`, {});

  return data;
};

export const festivalUnLikedRequest = async (contentId: number) => {
  const { data } = await instance.delete<string>(`/festivals/${contentId}/unfavorite`, {});

  return data;
};
