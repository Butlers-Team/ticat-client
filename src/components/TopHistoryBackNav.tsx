import styled from 'styled-components';

// icons
import { MdArrowBackIosNew } from 'react-icons/md';

interface BackNavProps {
  textTitle: string;
  onNavigation: () => void;
}

/** 2023/07/17 - 윗 상단 History back 컴포넌트 - by sineTlsl */
const TopHistoryBackNav = ({ textTitle, onNavigation }: BackNavProps) => {
  return (
    <BackNavContainer>
      <div className="top-left">
        <button className="back-btn" onClick={onNavigation}>
          <MdArrowBackIosNew size="18px" color="var(--color-dark-gray)" />
        </button>
      </div>
      <div className="area-filter-title">{textTitle}</div>
    </BackNavContainer>
  );
};

export default TopHistoryBackNav;

const BackNavContainer = styled.div`
  position: relative;
  width: 100%;
  height: 5rem;
  margin: auto 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-light-gray);

  > .top-left {
    position: absolute;
    left: 1.5rem;
  }
  > .top-left > .back-btn {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > .area-filter-title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: var(--color-dark);
    font-size: 17px;
    font-weight: 700;
  }
`;
