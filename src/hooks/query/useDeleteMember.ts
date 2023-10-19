import { useNavigate } from 'react-router-dom';
import useCustomToast from '@hooks/useCustomToast';

// api
import { deleteMember } from '@api/myinfo';

// query
import { useMutation } from '@tanstack/react-query';

// stroe
import { useMemberStore } from '@store/useMemberStore';
import { useTokenStore } from '@store/useTokenStore';
import { useExpStore } from '@store/useExpStore';

/** 2023/10/11 - 회원 탈퇴 뮤테이션 - by sineTlsl */
export const useDeleteMember = () => {
  const toast = useCustomToast();
  const navigate = useNavigate();

  // store
  const { clearMember } = useMemberStore();
  const { clearTokens } = useTokenStore();
  const { clearExp } = useExpStore();

  const deleteMemberMutation = useMutation(deleteMember, {
    onSuccess: () => {
      toast({ title: '회원탈퇴가 되었습니다.', status: 'success' });

      clearMember();
      clearTokens();
      clearExp();
      navigate('/');
    },
    onError: () => {
      toast({ title: '회원탈퇴가 실패했습니다.', status: 'error' });
    },
  });

  return deleteMemberMutation;
};
