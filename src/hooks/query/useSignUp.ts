//react
import { useNavigate } from 'react-router-dom';

//query
import { useMutation } from '@tanstack/react-query';

//api
import { apiSignUp } from '@api/auth';

//type
import { CustomAxiosError } from 'types/auth';

//hooks
import useCustomToast from '@hooks/useCustomToast';

/** 2023/07/09 - 회원가입 뮤테이션  - by leekoby */
export const useSignUp = () => {
  const toast = useCustomToast();
  const navigate = useNavigate();

  const signUpMutation = useMutation(apiSignUp, {
    onSuccess: data => {
      toast({ title: '회원가입되었습니다.', status: 'success' });
      navigate('/wellcome');
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
          toast({ title: `회원가입에 실패했습니다.`, status: 'error' });
        }
      }
    },
  });

  return signUpMutation;
};
