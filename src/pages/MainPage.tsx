import styled from 'styled-components';
// import { useState } from 'react';
import FestivalSlider from '@components/main/FestivalSlider';

const tabfilter = [
  { filtername: '음악', filtericon: '' },
  { filtername: '미술', filtericon: '' },
  { filtername: '영화', filtericon: '' },
  { filtername: '문화', filtericon: '' },
  { filtername: '국제', filtericon: '' },
  { filtername: '역사', filtericon: '' },
  { filtername: '과학', filtericon: '' },
  { filtername: '스포츠', filtericon: '' },
  { filtername: '요리', filtericon: '' },
  { filtername: '주류', filtericon: '' },
  { filtername: '정원', filtericon: '' },
  { filtername: '종교', filtericon: '' },
  { filtername: '전통', filtericon: '' },
  { filtername: '전체', filtericon: '' },
];

const MainPage = () => {
  return (
    <MainPageContainer>
      <FestivalSlider />
      <ContentsSection>
        <TabFilterIcon>
          {tabfilter.map((icons, index) => (
            <li key={`icons${index}`}>
              <div>{icons.filtericon}</div>
              <p>{icons.filtername}</p>
            </li>
          ))}
        </TabFilterIcon>
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
  padding: 20px;
`;

const TabFilterIcon = styled.ul`
  border: 1px solid red;
  height: 120px;

  > li {
    width: 30px;
    height: 30px;
    background-color: var();
  }
`;
