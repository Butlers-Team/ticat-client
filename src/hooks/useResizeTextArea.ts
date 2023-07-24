import { useCallback, useRef } from 'react';

/** 2023/07/21- textarea 리사이즈  - by leekoby */
const useResizeTextarea = () => {
  const textRef = useRef<null | HTMLTextAreaElement>(null);
  /** 2023/07/21- 입력된 내용에 맞게 textarea 높이 지정 - by leekoby */

  const handleResizeHeight = useCallback(() => {
    if (!textRef || !textRef.current) return;

    textRef.current.style.height = '0px';
    textRef.current.style.height = textRef.current.scrollHeight + 'px';
  }, []);

  return [textRef, handleResizeHeight] as const;
};

export default useResizeTextarea;
