import { useMutation } from '@tanstack/react-query';
import { apiSignUp } from '@api/auth';
import { ApiSignUpRequest, CustomAxiosError } from 'types/auth';
import useCustomToast from '@hooks/useCustomToast';

/** 2023/07/09 - 회원가입 뮤테이션  - by leekoby */
export const useSignUp = () => {
  const toast = useCustomToast();

  const signUpMutation = useMutation(apiSignUp, {
    onSuccess: data => {
      toast({ title: '회원가입되었습니다.', status: 'success' });
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
          toast({ title: `회원가입에 실패했습니다.`, status: 'error' });
        }
      }
    },
  });

  return signUpMutation;
};
