import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

//api
import { apiSignIn } from '@api/auth';

//type
import { ApiSignInResponse, ApiSignInSuccess, CustomAxiosError } from 'types/auth';

// state
import { useTokenStore } from '@store/useTokenStore';

//custom
import useCustomToast from '@hooks/useCustomToast';
import { useMemberStore } from '@store/useMemberStore';
import { dateToSeconds } from '@utils/dateToSeconds';
import { useExpStore } from '@store/useExpStore';

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
        navigate('/interest');
      } else {
        toast({ title: `로그인 성공, 페이지 이동합니다.`, status: 'success' });
        navigate(-1);
      }
    },

    onError: (error: CustomAxiosError) => {
      if (error.response) {
        const { status, data } = error.response;
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
