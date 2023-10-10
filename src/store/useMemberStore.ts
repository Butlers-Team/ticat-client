import { create } from 'zustand';
import { Member } from 'types/auth';
import { persist } from 'zustand/middleware';

export interface MemberInfo {
  member?: Member | null;
  setMember: (member: Member | null) => void;
  clearMember: () => void;
}

const clearMember = () => {
  localStorage.removeItem('member');
};
/** 2023/07/22 - 로그인 응답 데이터 저장소 - by leekoby */
const useMemberStore = create(
  persist<MemberInfo>(
    set => ({
      setMember: member => set(state => ({ ...state, member })),
      clearMember: () => {
        clearMember();
      },
    }),
    { name: 'member', getStorage: () => localStorage },
  ),
);

export { useMemberStore, clearMember };
