import instance from '@api/axiosInstance';

export const recentPostRequest = async (contentId: number) => {
  const { data } = await instance.post<string>(`/recent?festivalId=${contentId}`, {});

  return data;
};
