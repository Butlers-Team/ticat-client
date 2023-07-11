import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

//components
import FestivalCover from '@components/detail/FestivalCover';
import FestivalInfo from '@components/detail/FestivalInfo';
import FestivalLocation from '@components/detail/FestivalLocation';
import Recommend from '@components/detail/Recommend';
import { FestivalDetailType } from 'types/api/catergory';

const DetailPage = () => {
  const [detailList, setDetailList] = useState<FestivalDetailType>();
  const { contentId } = useParams<string>();
  useEffect(() => {
    axios
      .get(
        `https://a1fe-124-111-225-247.ngrok-free.app/festivals/2988268
    `,
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
        },
      )
      .then(res => {
        setDetailList(res.data);
      });
  }, []);
  console.log(detailList);
  return (
    <DetailPageContainer>
      {detailList && <FestivalCover detailList={detailList} />}
      <ContentsSection>
        {detailList && <FestivalInfo detailList={detailList} />}
        <FestivalLocation />
        {detailList && <Recommend detailList={detailList} />}
      </ContentsSection>
    </DetailPageContainer>
  );
};

export default DetailPage;

const DetailPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContentsSection = styled.section`
  position: relative;
  background-color: #ffffff;
`;
