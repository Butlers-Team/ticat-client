import styled from 'styled-components';
// import { useState } from 'react';
import { getMainRecommend } from '@api/mainfastival';
import { MainFastivalType } from 'types/api/mainfastival';
import { getToken } from '@store/useTokenStore';

//components
import MainSlider from '@components/main/MainSlider';
import CategoryIcon from '@components/main/CategoryIcon';
import MyInfoButton from '@components/main/MyInfoButton';
import RecommendFestival from '@components/RecommendFestival';
import { useEffect, useState } from 'react';

const MainPage = () => {
  const [recommendData, setRecommendData] = useState<MainFastivalType[]>([]);
  const { accessToken, refreshToken } = getToken();

  const fetchDetailList = async () => {
    const recommend = await getMainRecommend();

    if (refreshToken && accessToken) {
      recommend && setRecommendData(recommend);
    }
  };

  useEffect(() => {
    fetchDetailList();
  }, []);

  return (
    <MainPageContainer>
      <div className="main-slider">
        <MainSlider />
      </div>
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
          <div>
            <RecommendFestival fastivaldata={recommendData} />
          </div>
        </li>
      </ContentsSection>
    </MainPageContainer>
  );
};

export default MainPage;

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;

  .main-slider {
    width: 100%;
    height: 300px;
  }
`;

const ContentsSection = styled.ul`
  position: relative;
  background-color: #ffffff;
  height: 700px;
  border-radius: 30px;
  animation: showupLayout 0.5s forwards;
  z-index: 3;
  color: var(--color-dark);

  .contents-box {
    padding: 20px;
    > h2 {
      font-size: 2rem;
      font-weight: 700;
    }
    > div {
      margin: 20px 0px;
    }
  }

  @keyframes showupLayout {
    0% {
      opacity: 0;
    }
    80% {
      opacity: 1;
      transform: translateY(-40px);
    }
    100% {
      opacity: 1;
      transform: translateY(-30px);
    }
  }
`;
