import styled from 'styled-components';
import { useState } from 'react';

//icon
import { TiLocation } from 'react-icons/ti';
import { BiSun } from 'react-icons/bi';

const MainSlider = () => {
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
      </div>
    </SliderContainer>
  );
};

export default MainSlider;

const SliderContainer = styled.article`
  position: relative;
  background-color: #b5b5b5;
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
