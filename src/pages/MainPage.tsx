import styled from 'styled-components';
// import { useState } from 'react';

//components
import MainSlider from '@components/main/MainSlider';
import CategoryIcon from '@components/main/CategoryIcon';
import MyInfoButton from '@components/main/MyInfoButton';

const MainPage = () => {
  return (
    <MainPageContainer>
      <MainSlider />
      <ContentsSection>
        <li>
          <CategoryIcon />
        </li>
        <li className="contents-box">
          <h2>나의 정보 확인</h2>
          <MyInfoButton />
        </li>
        <li className="contents-box">
          <h2>추천 축제</h2>
          <div></div>
        </li>
      </ContentsSection>
    </MainPageContainer>
  );
};

export default MainPage;

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ContentsSection = styled.ul`
  background-color: #ffffff;
  height: 700px;
  transform: translateY(-30px);
  border-radius: 30px;

  .contents-box {
    padding: 20px;
    > h2 {
      font-size: 18px;
      font-weight: 700;
    }
    > div {
      margin: 20px 0px;
    }
  }
`;
