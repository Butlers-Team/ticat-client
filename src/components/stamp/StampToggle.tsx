import styled from 'styled-components';

interface ToggleProps {
  isSelectCal: boolean;
  onClick: () => void;
}

/** 2023/07/01 - 캘린더 or 티켓 리스트 토글 컴포넌트 - by sineTlsl */
const Toggle = ({ isSelectCal, onClick }: ToggleProps) => {
  return (
    <ToggleContainer>
      <div className={`toggle-container ${!isSelectCal && 'toggle-checked'}`}>
        {isSelectCal ? <p>CALENDAR</p> : <p>TICKET</p>}
      </div>
      <div className={`toggle-circle ${isSelectCal ? 'toggle-checked' : null}`} onClick={onClick} />
    </ToggleContainer>
  );
};

export default Toggle;

/** 2023/07/01 - 토글 - by sineTlsl */
const ToggleContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 120px;
  height: 34px;
  color: var(--color-dark-text);
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.1rem;

  // 토글 컨테이너
  .toggle-container {
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ebebeb;
    transition: background 0.3s ease-in-out;
    border-radius: 34px;
    display: flex;
    justify-content: center;
    padding-right: 1.5rem;
    align-items: center;
    box-shadow: 3px 6px 6px #00000029;

    &.toggle-checked {
      padding-left: 2.8rem;
    }
  }

  // 토글 circle
  .toggle-circle {
    position: absolute;
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: all 0.5s;
    border-radius: 50%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

    &.toggle-checked {
      left: 90px;
    }
  }
`;
