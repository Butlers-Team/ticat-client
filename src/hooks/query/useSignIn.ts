//react
import { useNavigate } from 'react-router-dom';

//query
import { useMutation } from '@tanstack/react-query';

//api
import { apiSignIn } from '@api/auth';

//type
import { ApiSignInSuccess, CustomAxiosError } from 'types/auth';

//hooks
import useCustomToast from '@hooks/useCustomToast';
import { useMemberStore } from '@store/useMemberStore';
import { dateToSeconds } from '@utils/dateToSeconds';
import { useExpStore } from '@store/useExpStore';

//store
import { useTokenStore } from '@store/useTokenStore';

/** 2023/07/09 - 로그인 뮤테이션 - by leekoby */
export const useSignIn = () => {
  const { setAccessToken, setRefreshToken } = useTokenStore();
  const { setMember } = useMemberStore();
  const { setExp, exp } = useExpStore();

  const navigate = useNavigate();
  const toast = useCustomToast();

  const signInMutation = useMutation(apiSignIn, {
    onSuccess: (response: ApiSignInSuccess) => {
      const { accessToken, refreshToken, accessTokenExpiration } = response;
      setExp(+dateToSeconds(accessTokenExpiration));
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setMember(response.data);
      if (response.data.displayName === null) {
        toast({ title: '닉네임 등록 및 관심사 등록이 필요합니다.', status: 'success' });
        // 닉네임 설정 및 관심사 등록이 필요한 경우 처리 추가
        setTimeout(() => {
          navigate('/interest');
        }, 0);
      } else {
        toast({ title: `로그인 성공, 메인 페이지로 이동합니다.`, status: 'success' });
        setTimeout(() => {
          navigate('/main');
        }, 0);
      }
    },

    onError: (error: CustomAxiosError) => {
      if (error.response) {
        const { data } = error.response;
        if (data?.message) {
          toast({
            title: data.message,
            status: 'error',
          });
        } else {
          toast({ title: `로그인에 실패했습니다.`, status: 'error' });
        }
      }
    },
  });

  return signInMutation;
};
