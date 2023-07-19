import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//type
import { RecommendSwiperOptions } from 'types/swiper/swiperOptions';
import { RecommendListType, RecommendListType2 } from 'types/api/recommend';
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
  /** 2023.07.05 recommend banner swiper options - by mscojl24 */
  const swiperOptions: RecommendSwiperOptions = {
    spaceBetween: 110,
    slidesPerView: 3,
    grabCursor: true,
    loop: true,
  };

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
    <RecommendCardSection>{recommendlList && <RecommendFestival fastivaldata={recommendlList} />}</RecommendCardSection>
  );
};

export default Recommend;

const RecommendCardSection = styled.div`
  padding: 3rem 2rem;
`;
