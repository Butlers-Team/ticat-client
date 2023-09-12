import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

//components
import FestivalCover from '@components/detail/FestivalCover';
import FestivalInfo from '@components/detail/FestivalInfo';
import FestivalLocation from '@components/detail/FestivalLocation';
import Recommend from '@components/detail/Recommend';
import { FestivalDetailType } from 'types/api/detail';
import { getDetailList } from '../api/detail';
import { recentPostRequest } from '@api/recent';
import Reviews from '@components/review/Reviews';

const DetailPage = () => {
  const [detailList, setDetailList] = useState<FestivalDetailType>();
  const contentId = useParams<string>().id;
  /** 2023/07/12 - 축제 상세 데이터 요청 함수 - by parksubeom */
  const fetchDetailList = async () => {
    if (typeof contentId === 'string') {
      const res = await getDetailList(contentId);
      setDetailList(res.data);
    }
  };
  /** 2023/09/12 - 최근목록 저장 요청 함수 - by parksubeom */
  const postRecntData = () => {
    if (detailList?.festivalId) {
      recentPostRequest(detailList?.festivalId);
      console.log('최근목록저장완료');
    }
  };
  useEffect(() => {
    fetchDetailList();
  }, []);
  useEffect(() => {
    postRecntData();
  }, [detailList]);
  return (
    <DetailPageContainer className="scroll">
      {detailList && <FestivalCover detailList={detailList} />}
      <ContentsSection>
        {detailList && <FestivalInfo detailList={detailList} />}
        {detailList && <FestivalLocation detailList={detailList} />}
        {detailList && <Recommend detailList={detailList} />}
      </ContentsSection>
      {detailList && <Reviews detailList={detailList} />}
    </DetailPageContainer>
  );
};

export default DetailPage;

const DetailPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  &.scroll::-webkit-scrollbar {
    display: none;
  }
`;

const ContentsSection = styled.section`
  position: relative;
  background-color: #ffffff;
`;
