import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// api
import { apiRegisterInterest } from '@api/interest';

//type
import { ApiInterestResponse } from 'types/api';
import useCustomToast from '@hooks/useCustomToast';
import { CustomAxiosError } from 'types/auth';

/** 2023/07/15 - 닉네임, 관심사등록  뮤테이션 - by leekoby */
export const useRegisterInterest = () => {
  const navigate = useNavigate();
  const toast = useCustomToast();

  const interestMutation = useMutation(apiRegisterInterest, {
    onSuccess: data => {
      if (typeof data === 'string' && data === '관심사 등록이 완료되었습니다.') {
        toast({ title: data, status: 'success' });
        navigate('/main');
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
          toast({ title: `닉네임, 관심사 등록에 실패했습니다.`, status: 'error' });
        }
      }
    },
  });

  return interestMutation;
};
