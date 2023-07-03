import styled from 'styled-components';
// import { useState } from 'react';

//components
import FestivalSlider from '@components/main/FestivalSlider';
import FilterTabIcon from '@components/main/CategoryIcon';

const MainPage = () => {
  return (
    <MainPageContainer>
      <FestivalSlider />
      <ContentsSection>
        <FilterTabIcon />
      </ContentsSection>
    </MainPageContainer>
  );
};

export default MainPage;

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ContentsSection = styled.article`
  background-color: #ffffff;
  height: 700px;
  transform: translateY(-30px);
  border-radius: 30px;
`;
