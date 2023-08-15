//style
import styled from 'styled-components';

interface ToggleProps {
  isSelectTicket: boolean;
  onClick: () => void;
}

/** 2023/07/01 - 캘린더 or 티켓 리스트 토글 컴포넌트 - by sineTlsl */
/** 2023/08/14- 마이페이지 리뷰/댓글 토글 - by leekoby */
const MyReviewToggle = ({ isSelectTicket, onClick }: ToggleProps) => {
  return (
    <ToggleContainer>
      <InputCheckWrap type="checkbox" id="toggle-btn" onChange={onClick} />
      <BtnLabel htmlFor="toggle-btn" isSelectTicket={isSelectTicket} />
    </ToggleContainer>
  );
};

export default MyReviewToggle;

/** 2023/07/03 - 토글 컨테이너 - by sineTlsl */
const ToggleContainer = styled.div`
  display: flex;
  position: relative;
  width: 16rem;
  height: 3rem;
  z-index: 2;
`;

/** 2023/07/03 - 토글 상태를 변경할 수 있는 Input 박스 - by sineTlsl */
const InputCheckWrap = styled.input`
  display: none;
`;

/** 2023/07/03 - label UI 변경 - by sineTlsl */
const BtnLabel = styled.label.withConfig({
  shouldForwardProp: prop => prop !== 'isSelectTicket',
})<{ isSelectTicket: boolean }>`
  z-index: 9;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 2rem;
  background: #ebebeb;
  color: var(--color-dark);
  font-size: 10px;
  display: flex;
  align-items: center;

  &::before,
  &::after {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    height: 100%;
    border-radius: 2rem;
    font-weight: 400;
    transition: all 0.3s ease-in-out;
  }

  &::before {
    content: ${props => (props.isSelectTicket ? "'COMMENTS'" : "'REVIEWS'")};
    padding-left: 0.3rem;
    width: 7rem;
    left: ${props => (props.isSelectTicket ? '7rem' : '0rem')};
    color: #a7a7a7;
  }

  &::after {
    content: ${props => (props.isSelectTicket ? "'REVIEWS'" : "'COMMENTS'")};
    background: #fff;
    font-weight: 700;
    width: ${props => (props.isSelectTicket ? '7rem' : '9rem')};
    left: ${props => (props.isSelectTicket ? '0rem' : '7rem')};
    box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.25);
  }
`;
