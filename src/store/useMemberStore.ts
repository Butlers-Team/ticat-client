import { create } from 'zustand';
import { Member } from 'types/auth';
import { persist } from 'zustand/middleware';

export interface MemberInfo {
  member?: Member | null;
  setMember: (member: Member | null) => void;
  clearMember: () => void;
}

// 초기값 설정
const initialState: MemberInfo = {
  member: null,
  setMember: () => {},
  clearMember: () => {},
};
// clearMember를 외부에서 사용하기 위한 함수
const clearMember = () => {
  const { clearMember } = useMemberStore.getState();
  clearMember();
};
/** 2023/07/22 - 로그인 응답 데이터 저장소 - by leekoby */
const useMemberStore = create(
  persist<MemberInfo>(
    set => ({
      ...initialState,
      setMember: member => set(state => ({ ...state, member })),
      clearMember: () => set(() => initialState),
    }),
    { name: 'member', getStorage: () => localStorage },
  ),
);

export { useMemberStore, clearMember };
