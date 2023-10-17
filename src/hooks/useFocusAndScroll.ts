//react
import { useEffect, RefObject } from 'react';

/** 2023/08/12- 댓글남기기 버튼 클릭시 text area로 스크롤하는 훅 - by leekoby */
export const useFocusAndScroll = (ref: RefObject<HTMLElement>, show: boolean) => {
  useEffect(() => {
    if (show && ref.current) {
      ref.current.focus();
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [show, ref]);
};
