import { useMutation } from '@tanstack/react-query';
import { apiSignIn } from '@api/auth';
import { ApiSignInResponse, ApiSignInSuccess, CustomAxiosError } from 'types/auth';
import { useTokenStore } from '@store/authStore';
import { useNavigate } from 'react-router-dom';
import useCustomToast from '@hooks/useCustomToast';

/** 2023/07/09 - 로그인 뮤테이션 - by leekoby */
export const useSignIn = () => {
  const { setAccessToken, setRefreshToken } = useTokenStore();
  const navigate = useNavigate();
  const toast = useCustomToast();
  const signInMutation = useMutation(apiSignIn, {
    onSuccess: (response: ApiSignInSuccess) => {
      if (isApiSignInSuccess(response)) {
        const { data, accessToken, refreshToken } = response;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        if (typeof data === 'string' && data === '닉네임 설정 및 관심사 등록이 필요합니다.') {
          toast({ title: data, status: 'success' });
          // 닉네임 설정 및 관심사 등록이 필요한 경우 처리 추가
          navigate('/interest');
        } else {
          toast({ title: `메인페이지로 이동합니다.`, status: 'success' });

          navigate('/main');
        }
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

/**
 * 2023/07/14 - 객체의 타입을 확인하는 사용자 정의 타입가드 - by leekoby
 * 입력으로 받은 객체가 { data: ApiSignInResponse; accessToken: string; refreshToken: string } 타입인지 확인
 *
 * @param obj 타입 확인이 필요한 객체
 * @returns 타입 확인 결과에 따라 true 또는 false 반환
 */
function isApiSignInSuccess(
  obj: unknown,
): obj is { data: ApiSignInResponse; accessToken: string; refreshToken: string } {
  if (typeof obj === 'object' && obj !== null && 'data' in obj && 'accessToken' in obj && 'refreshToken' in obj) {
    // 객체가 'null'이 아닌 'object' data', 'accessToken', 'refreshToken' 키가 모두 있는지 확인 모두 만족하면 true 아니면 false
    return true;
  }
  return false;
}
