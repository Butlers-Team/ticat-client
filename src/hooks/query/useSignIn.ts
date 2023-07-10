import { useMutation } from '@tanstack/react-query';
import { apiSignIn } from '@api/auth';
import { ApiSignInSuccess } from 'types/auth';
import { useTokenStore } from '@store/authStore';

/** 2023/07/09 - 로그인 뮤테이션 - by leekoby */
export const useSignIn = () => {
  const { setAccessToken, setRefreshToken } = useTokenStore();

  const signInMutation = useMutation(apiSignIn, {
    onSuccess: (response: ApiSignInSuccess) => {
      const { data, accessToken, refreshToken } = response;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      console.log('로그인 성공:');
    },

    onError: err => {
      console.error('로그인 실패:', err);
    },
  });

  return signInMutation;
};
