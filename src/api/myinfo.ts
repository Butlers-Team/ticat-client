import instance from '@api/axiosInstance';

// type
import { MyInfoType, RecentListType, InterestType } from 'types/api/myinfo';

/** 2023/07/21 - 회원정보 GET 요청 - by sineTlsl */
export const getMyInfo = async () => {
  const { data } = await instance.get<MyInfoType>('/members');

  return data;
};

/** 2023/07/23 - 축제 최근목록 GET 요청 - by sineTlsl */
export const getRecentList = async () => {
  const { data } = await instance.get<RecentListType[]>('/recent');

  return data;
};

/** 2023/08/07 - 프로필 이미지 POST 요청 - by sineTlsl */
export const postProfileImg = async (formData: FormData) => {
  const { data } = await instance.post('/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

/** 2023/08/07 - 프로필 이미지 PATCH 요청 - by sineTlsl */
export const patchProfileImg = async (formData: FormData) => {
  const { data } = await instance.patch('/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

/** 2023/08/07 - 프로필 이미지 DELETE 요청 - by sineTlsl */
export const deleteProfileImg = async () => {
  return await instance.delete('/profile');
};

/** 2023/08/07 - 회원 관심사 GET 요청 - by sineTlsl */
export const getInterest = async () => {
  const { data } = await instance.get<InterestType>('/interest');

  return data;
};
