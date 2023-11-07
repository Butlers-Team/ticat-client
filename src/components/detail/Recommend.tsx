import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
//type
import { RecommendListType } from 'types/api/recommend';
import { getRecommendList } from '@api/recommend';
import { RecommendRequest } from 'types/api/recommend';
import { FestivalDetailType } from 'types/api/detail';
// Import Swiper
import RecommendFestival from '@components/RecommendFestival';

interface FestivalCoverProps {
  detailList: FestivalDetailType;
}
const Recommend: React.FC<FestivalCoverProps> = ({ detailList }) => {
  const [recommendlList, setRecommendList] = useState<RecommendListType[] | undefined>();

  /** 2023/07/12 - 축제 상세 데이터 요청 함수 - by parksubeom */
  const fetchRecommendlList = async () => {
    const category: RecommendRequest = {
      category: detailList.category,
    };
    const res = await getRecommendList(category);
    setRecommendList(res);
  };
  useEffect(() => {
    fetchRecommendlList();
  }, []);

  return (
    <LocationContainer>
      <h2>추천 축제</h2>
      <RecommendCardSection>
        {recommendlList && <RecommendFestival fastivaldata={recommendlList} />}
      </RecommendCardSection>
    </LocationContainer>
  );
};

export default Recommend;

const LocationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2rem;

  > h2 {
    color: var(--color-dark);
    font-size: 24px;
    font-weight: bold;
  }
`;

const RecommendCardSection = styled.div`
  padding: 3rem 0;
`;
