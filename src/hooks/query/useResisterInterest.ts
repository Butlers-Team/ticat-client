//react
import { useNavigate } from 'react-router-dom';

//query
import { useMutation } from '@tanstack/react-query';

// api
import { apiRegisterInterest } from '@api/interest';

//type
import { CustomAxiosError, Member } from 'types/auth';

//hooks
import useCustomToast from '@hooks/useCustomToast';

//store
import { useMemberStore } from '@store/useMemberStore';

/** 2023/07/15 - 닉네임, 관심사등록  뮤테이션 - by leekoby */
export const useRegisterInterest = () => {
  const { setMember, member } = useMemberStore();
  const navigate = useNavigate();
  const toast = useCustomToast();

  const interestMutation = useMutation(apiRegisterInterest, {
    onSuccess: data => {
      if (member) {
        // 기존 member 객체에서 memberId와 profileUrl을 가져와 새 Member 객체 생성
        const updatedMember: Member = {
          ...member,
          displayName: data.displayName,
        };
        setMember(updatedMember);
      } else {
        // 회원 데이터가 없는 경우 기본값으로 memberId와 profileUrl을 설정
        const defaultMember: Member = {
          memberId: null,
          profileUrl: null,
          displayName: data.displayName,
        };
        setMember(defaultMember);
      }
      toast({ title: '관심사 등록이 완료되었습니다.', status: 'success' });
      navigate('/');
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
          toast({ title: `닉네임, 관심사 등록에 실패했습니다.`, status: 'error' });
        }
      }
    },
  });

  return interestMutation;
};
