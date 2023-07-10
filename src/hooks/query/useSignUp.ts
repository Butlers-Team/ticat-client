import { useMutation } from '@tanstack/react-query';
import { apiSignUp } from '@api/auth';
import { ApiSignUpRequest } from 'types/auth';

/** 2023/07/09 - 회원가입 뮤테이션  - by leekoby */
export const useSignUp = () => {
  const signUpMutation = useMutation(apiSignUp, {
    onSuccess: data => {
      console.log('회원가입 성공:', data);
    },
    onError: err => {
      console.error('회원가입 실패:', err);
    },
  });

  return signUpMutation;
};
