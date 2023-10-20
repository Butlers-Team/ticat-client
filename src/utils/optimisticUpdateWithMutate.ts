import { MutableRefObject } from 'react';

// 토글 카운트 함수
const toggleAndCount = (
  operator: 'minus' | 'plus',
  setToggleFunction: React.Dispatch<React.SetStateAction<boolean>>,
  setCountFunction?: React.Dispatch<React.SetStateAction<number>>,
) => {
  setToggleFunction(prev => !prev);
  if (setCountFunction) {
    if (operator === 'minus') {
      setCountFunction(count => count - 1);
    } else {
      setCountFunction(count => count + 1);
    }
  }
};

// 상태 및 카운터 업데이트
const updateStatesAndCounts = (
  targetValue: boolean,
  toggleTargetState: React.Dispatch<React.SetStateAction<boolean>>,
  setTargetCountFunction?: React.Dispatch<React.SetStateAction<number>>,

  oppositionValue?: boolean,
  toggleOppositionState?: React.Dispatch<React.SetStateAction<boolean>>,
  setOppositionCounterFunction?: React.Dispatch<React.SetStateAction<number>>,
) => {
  if (oppositionValue && toggleOppositionState && setOppositionCounterFunction) {
    toggleAndCount('minus', toggleOppositionState, setOppositionCounterFunction);
  }

  if (!targetValue) {
    toggleAndCount('plus', toggleTargetState, setTargetCountFunction); // 카운트 증가
  } else {
    toggleAndCount('minus', toggleTargetState, setTargetCountFunction); // 카운트 감소
  }
};

// mutate 요청 및 에러 핸들링
const executeMutation = (
  targetValue: boolean,
  toggleTargetState: React.Dispatch<React.SetStateAction<boolean>>,
  createMutation: any,
  deleteMutation: any,
  setTargetCountFunction?: React.Dispatch<React.SetStateAction<number>>,
) => {
  if (!targetValue) {
    createMutation.mutate({
      onError: () => {
        // 에러 발생 시 원래 상태 복원
        toggleAndCount('minus', toggleTargetState, setTargetCountFunction);
      },
    });
  } else {
    deleteMutation.mutate({
      onError: () => {
        // 에러 발생 시 원래 상태 복원
        toggleAndCount('plus', toggleTargetState, setTargetCountFunction);
      },
    });
  }
};

/** 2023/10/17 낙관적 업데이트, 디바운싱, mutate 요청 함수-  */
export const optimisticUpdateWithMutate = async (
  // 필수값
  //  const timer = useRef<ReturnType<typeof setTimeout>>(); 함수를 불러오는 곳에 넣어주세요
  timer: MutableRefObject<ReturnType<typeof setTimeout> | undefined>,
  targetValue: boolean, // 대상이 되는 상태값
  toggleTargetState: React.Dispatch<React.SetStateAction<boolean>>, //상태값 변경
  createMutation: any,
  deleteMutation: any,
  delayTime: number,

  //선택대상의 카운트도 표시해야할 경우 추가
  setTargetCountFunction?: React.Dispatch<React.SetStateAction<number>>,

  //좋아요/ 싫어요 같은 반대 옵션까지 두 개를 조정해야할 때
  oppositionValue?: boolean | undefined,
  toggleOppositionState?: React.Dispatch<React.SetStateAction<boolean>>,
  setOppositionCounterFunction?: React.Dispatch<React.SetStateAction<number>>,
) => {
  if (timer.current) {
    clearTimeout(timer.current);
    // 기존에 설정된 타이머가 있다면 초기화
  }

  // 상태 및 카운터 업데이트
  updateStatesAndCounts(
    targetValue,
    toggleTargetState,
    setTargetCountFunction,
    oppositionValue,
    toggleOppositionState,
    setOppositionCounterFunction,
  );

  timer.current = setTimeout(() => {
    // mutate 요청 및 에러 핸들링
    executeMutation(targetValue, toggleTargetState, createMutation, deleteMutation, setTargetCountFunction);
  }, delayTime);
};
