import styled from 'styled-components';
// import { useState } from 'react';

import { FestivalListType } from 'types/api/category';

//components
import MainSlider from '@components/main/MainSlider';
import CategoryIcon from '@components/main/CategoryIcon';
import MyInfoButton from '@components/main/MyInfoButton';
import RecommendFestival from '@components/RecommendFestival';

//임시 더미데이터 - by mscojl24
const data: FestivalListType[] = [
  {
    festivalId: 2993282,
    status: 'ONGOING',
    title: '전라북도 어쩌고 이벤트',
    image: '',
    address: '전라북도 전주시 완산구 효자로 225 전라북도청',
    category: '음악',
    eventstartdate: '20230624',
    eventenddate: '20230909',
    reviewRating: 0.0,
    reviewCount: 0,
    likeCount: 0,
    area: '전라북도 전주시',
    mapx: 127.109137314,
    mapy: 35.8201129557,
  },
  {
    festivalId: 2951686,
    status: 'ONGOING',
    title: '체험형 미디어아트 훌리훌리',
    image: '',
    address: '경기도 김포시 김포대로 1466-48',
    category: '미술',
    eventstartdate: '20221223',
    eventenddate: '20231015',
    reviewRating: 0.0,
    reviewCount: 0,
    likeCount: 0,
    area: '경기도 김포시',
    mapx: 126.6688661848,
    mapy: 37.6568909879,
  },
  {
    festivalId: 2970367,
    status: 'ONGOING',
    title: '2023 광화문 책마당',
    image: '',
    address: '서울특별시 종로구 세종로',
    category: '스포츠',
    eventstartdate: '20230423',
    eventenddate: '20231112',
    reviewRating: 0.0,
    reviewCount: 0,
    likeCount: 0,
    area: '서울특별시 종로구',
    mapx: 126.9767154774,
    mapy: 37.5718535964,
  },
  {
    festivalId: 2873711,
    status: 'ONGOING',
    title: '양주 조각숲 나들이(전시)',
    image: '',
    address: '경기도 양주시 권율로 594',
    category: '미술',
    eventstartdate: '20221019',
    eventenddate: '20231231',
    reviewRating: 0.0,
    reviewCount: 0,
    likeCount: 0,
    area: '경기도 양주시',
    mapx: 126.9685442552,
    mapy: 37.7582150989,
  },
  {
    festivalId: 2970367,
    status: 'ONGOING',
    title: '2023 광화문 책마당',
    image: '',
    address: '서울특별시 종로구 세종로',
    category: '스포츠',
    eventstartdate: '20230423',
    eventenddate: '20231112',
    reviewRating: 0.0,
    reviewCount: 0,
    likeCount: 0,
    area: '서울특별시 종로구',
    mapx: 126.9767154774,
    mapy: 37.5718535964,
  },
  {
    festivalId: 2873711,
    status: 'ONGOING',
    title: '양주 조각숲 나들이(전시)',
    image: '',
    address: '경기도 양주시 권율로 594',
    category: '미술',
    eventstartdate: '20221019',
    eventenddate: '20231231',
    reviewRating: 0.0,
    reviewCount: 0,
    likeCount: 0,
    area: '경기도 양주시',
    mapx: 126.9685442552,
    mapy: 37.7582150989,
  },
];

const MainPage = () => {
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
            <RecommendFestival fastivaldata={data} />
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
      font-size: 18px;
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
