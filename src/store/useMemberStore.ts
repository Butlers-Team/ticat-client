import { create } from 'zustand';
import { Member } from 'types/auth';
import { persist } from 'zustand/middleware';

export interface MemberInfo {
  member?: Member | null;
  setMember: (member: Member | null) => void;
  resetMember: () => void;
}

// 초기값 설정
const initialState: MemberInfo = {
  member: null,
  setMember: () => {},
  resetMember: () => {},
};
// resetMember를 외부에서 사용하기 위한 함수
const resetMember = () => {
  const { resetMember } = useMemberStore.getState();
  resetMember();
};
/** 2023/07/22 - 로그인 응답 데이터 저장소 - by leekoby */
const useMemberStore = create(
  persist<MemberInfo>(
    set => ({
      ...initialState,
      setMember: member => set(state => ({ ...state, member })),
      resetMember: () => set(() => initialState),
    }),
    { name: 'member', getStorage: () => localStorage },
  ),
);

export { useMemberStore, resetMember };
