import { create } from 'zustand';
import { loginInfo } from 'types/auth';
import { persist } from 'zustand/middleware';

export interface MemberState {
  member?: loginInfo | null;
  setMember: (member: loginInfo | null) => void;
  clearMember: () => void;
}

const clearMember = () => {
  localStorage.removeItem('member');
};
/** 2023/07/22 - 로그인 응답 데이터 저장소 - by leekoby */
const useMemberStore = create(
  persist<MemberState>(
    set => ({
      setMember: member => set(state => ({ ...state, member })),
      clearMember: () => {
        clearMember();
        set({ member: null });
      },
    }),
    { name: 'member', getStorage: () => localStorage },
  ),
);

export { useMemberStore, clearMember };
