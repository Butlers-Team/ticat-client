import styled from 'styled-components';

//icon
import { TiLocation } from 'react-icons/ti';
import { BiSun } from 'react-icons/bi';
import { FiHeart, FiShare2 } from 'react-icons/fi';
import { LuTicket } from 'react-icons/lu';
import { BsCalendarPlus } from 'react-icons/bs';

const FestivalCover = () => {
  return (
    <SliderContainer>
      <div className="wather-info flex-all-center">
        <span>축제날씨</span>
        <span className="wather-icon flex-all-center">
          <BiSun />
        </span>
      </div>
      <div className="festival-info">
        <p>2023.06.19 - 2023.07.31</p>

        <h2>축제 이름이 출력됩니다</h2>
        <span>
          <TiLocation /> 울산광역시 울주군
        </span>
        <BtnSection>
          <button className="calendar-add-btn">
            캘린더등록
            <span>
              <BsCalendarPlus />
            </span>
          </button>
          <button className="calendar-icon-btn">
            <FiHeart />
          </button>
          <button className="calendar-icon-btn">
            <LuTicket />
          </button>
          <button className="calendar-icon-btn">
            <FiShare2 />
          </button>
        </BtnSection>
      </div>
    </SliderContainer>
  );
};

export default FestivalCover;

const SliderContainer = styled.article`
  position: relative;
  background-color: #b5b5b5;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  z-index: 5;
  height: 300px;
  font-size: 1.5rem;
  color: #fff;

  > .wather-info {
    position: absolute;
    top: 20px;
    right: 20px;

    .wather-icon {
      width: 30px;
      height: 30px;
      margin-left: 5px;
      font-size: 2.5rem;
    }
  }

  > .festival-info {
    width: 100%;
    position: absolute;
    bottom: 60px;
    left: 20px;

    > * {
      margin-bottom: 10px;
    }

    > h2 {
      font-size: 24px;
      font-weight: 700;
    }
  }
`;

const BtnSection = styled.div`
  display: flex;
  flex-direction: row;
  margin: 3rem 0;

  > .calendar-add-btn {
    display: flex;
    align-items: center;
    justify-items: space-between;
    background-color: var(--color-main);
    color: var(--color-light);
    height: 3.5rem;
    border-radius: 5px;
    border: none;
    font-size: 1.5rem;
    > span {
      font-size: 16px;
      margin-left: 2rem;
    }
  }
  > .calendar-icon-btn {
    text-align: center;
    justify-content: center;
    height: 3.5rem;
    width: 3.5rem;
    margin: 0 5px;
    background-color: var(--color-sub);
    color: var(--color-light);
    border: none;
    border-radius: 5px;
    font-size: 1.6rem;
    font-weight: bold;
  }
`;
