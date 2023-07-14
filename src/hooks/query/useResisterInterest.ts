import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// api
import { apiRegisterInterest } from '@api/interest';

//type
import { ApiInterestResponse } from 'types/api';
import useCustomToast from '@hooks/useCustomToast';

/** 2023/07/15 - 닉네임, 관심사등록  뮤테이션 - by leekoby */
export const useRegisterInterest = () => {
  const navigate = useNavigate();
  const toast = useCustomToast();

  const interestMutation = useMutation(apiRegisterInterest, {
    onSuccess: data => {
      console.log(data);
    },
    onError: err => {
      console.log(err);
    },
  });

  return interestMutation;
};
