import styled from 'styled-components';

//icon
import { BiSun } from 'react-icons/bi';
import { IoIosArrowForward } from 'react-icons/io';

interface bgColor {
  bgcolor: string;
}

const MyInfoButton = () => {
  return (
    <div>
      <MyInfoCheck bgcolor="var(--color-main)">
        <li className="flex-v-center column left-section">
          <span className="font-main">나의 티캣 확인하기</span>
          <p className="font-sub">현재 5마리의 티캣이 모여있어요</p>
        </li>
        <li className="flex-h-center row">
          <IoIosArrowForward className="size-large" />
        </li>
      </MyInfoCheck>
      <MyInfoCheck bgcolor="var(--color-sub)">
        <li className="flex-v-center column left-section">
          <span className="font-main">현재의 날씨는 맑음 입니다</span>
          <p className="font-sub">울산광역시 울주군</p>
        </li>
        <li className="flex-h-center row">
          <div className="local-wather-icon">
            <BiSun />
          </div>
          <div className="local-Temperature flex-v-center row">
            <span>26</span>
            <p>˚C</p>
          </div>
        </li>
      </MyInfoCheck>
    </div>
  );
};

export default MyInfoButton;

const MyInfoCheck = styled.ul<bgColor>`
  display: flex;
  padding: 20px;
  border-radius: 10px;
  background-color: ${({ bgcolor }) => bgcolor};
  color: #fff;
  margin: 10px 0px;
  > li > * {
    margin: 3px 0px;
  }
  .left-section {
    flex-grow: 3;
    .font-main {
      font-size: 1.5rem;
      font-weight: 700;
    }
    .font-sub {
      font-size: 1.2rem;
      font-weight: 400;
      opacity: 0.8;
    }
  }

  .size-large {
    font-size: large;
  }

  .local-wather-icon {
    font-size: 3rem;
  }
  .local-Temperature {
    align-items: flex-end;
    span {
      font-size: 3.5rem;
      font-weight: 700;
    }
    p {
      font-size: 1.5rem;
    }
  }
`;
