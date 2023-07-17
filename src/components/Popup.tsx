import { ReactNode, useState } from 'react';
import styled from 'styled-components';

interface PopupProps {
  children: ReactNode;
  width?: string;
  height?: string;
  barcolor?: string; // 타임 게이지바 색상
  time?: string; // 게이지바 속도 ex) 10s - 10초
  closetime?: number; // 팝업창 닫힘 딜레이 ex) 7000 - 7초
}

const Button: React.FC<PopupProps> = ({ children, ...props }) => {
  const [closeBox, setCloseBox] = useState<boolean>(false);

  setTimeout(() => {
    setCloseBox(true);
  }, props.closetime);

  return (
    <PopupModal {...props}>
      <div className={`flex-h-center background-bubble ${closeBox ? 'close-moving-box' : 'show-moving-box'}`}>
        <div className="time-bar"></div>
        {children}
      </div>
    </PopupModal>
  );
};
export default Button;

/** 2023/06/29 - 서비스 공용 버튼 컴포넌트 - parksubeom */

const PopupModal = styled.div<Pick<PopupProps, 'width' | 'height' | 'barcolor' | 'time'>>`
  width: ${({ width }) => width ?? 'calc(100% - 40px)'};

  .background-bubble {
    justify-content: space-between;
    position: relative;
    background: #ffffff;
    border-radius: 0.4em;
    padding: 5px 20px;
    box-shadow: 0px 0px 10px rgb(0, 0, 0, 0.1);
    overflow: hidden;

    .time-bar {
      bottom: 0px;
      left: 0px;
      position: absolute;
      width: 0%;
      height: 5px;
      background-color: ${({ barcolor }) => barcolor ?? 'var(--color-main)'};
      animation: timeBar ${({ time }) => time ?? '10s'} forwards 0s;
    }
  }

  .show-moving-box {
    animation: movingModalbox 1s forwards;
  }

  .close-moving-box {
    animation: closeMovingModalbox 1s forwards;
  }

  .modal-text {
    font-size: 1.4rem;
    line-height: 120%;
    color: var(--color-dark);
  }

  @keyframes timeBar {
    100% {
      width: 100%;
    }
  }

  @keyframes movingModalbox {
    0% {
      transform: translateX(500px);
    }
    80% {
      transform: translateX(-20px);
    }
    90% {
      transform: translateX(5px);
    }
    100% {
      transform: translateX(0px);
    }
  }

  @keyframes closeMovingModalbox {
    0% {
      transform: translateX(0px);
    }
    20% {
      transform: translateX(-40px);
    }
    100% {
      transform: translateX(500px);
    }
  }
`;
