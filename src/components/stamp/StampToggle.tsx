import styled from 'styled-components';

interface ToggleProps {
  isSelectTicket: boolean;
  onClick: () => void;
}
interface ToggleLabelProps {
  isSelectTicket: boolean;
}

/** 2023/07/01 - 캘린더 or 티켓 리스트 토글 컴포넌트 - by sineTlsl */
const Toggle = ({ isSelectTicket, onClick }: ToggleProps) => {
  return (
    <ToggleContainer>
      <InputCheckBox type="checkbox" id="toggleBtn" onChange={onClick} />
      <BtnLabel htmlFor="toggleBtn" isSelectTicket={isSelectTicket} />
    </ToggleContainer>
  );
};

export default Toggle;

/** 2023/07/03 - 토글 컨테이너 - by sineTlsl */
const ToggleContainer = styled.div`
  display: flex;
  position: relative;
  width: 16rem;
  height: 3rem;
  z-index: 2;
`;

/** 2023/07/03 - 토글 상태를 변경할 수 있는 Input 박스 - by sineTlsl */
const InputCheckBox = styled.input`
  display: none;
`;

/** 2023/07/03 - label UI 변경 - by sineTlsl */
const BtnLabel = styled.label<ToggleLabelProps>`
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

  // 스탬프 TICKET 리스트(false)일 때 before
  &::before {
    display: flex;
    position: absolute;
    content: 'TICKET';
    align-items: center;
    justify-content: center;
    padding-left: 0.3rem;
    width: 7rem;
    height: 100%;
    left: 0rem;
    border-radius: 2rem;
    color: #a7a7a7;
    font-weight: 400;
    /* transition: all 0.3s ease-in-out; */
  }

  // 스탬프 TICKET 리스트(false)일 때 after
  &::after {
    display: flex;
    position: absolute;
    content: 'CALENDAR';
    justify-content: center;
    align-items: center;
    background: #fff;
    font-weight: 700;
    height: 100%;
    width: 9rem;
    left: 7rem;
    border-radius: 2rem;
    box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.25);
    transition: all 0.3s ease-in-out;
  }

  // 스탬프 TICKET 리스트(true)일 때
  ${props =>
    props.isSelectTicket &&
    `
    // false
    &::before {
      content: 'CALENDAR';
      left: 7rem;
      height: 100%;
      width: 9rem;
    };
    // true
    &::after {
      content: 'TICKET';
      height: 100%;
      left: 0rem;
      width: 7rem;
    };
  `}
`;
