import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';

//components
import FestivalCover from '@components/detail/FestivalCover';
import FestivalInfo from '@components/detail/FestivalInfo';
import FestivalLocation from '@components/detail/FestivalLocation';
import Recommend from '@components/detail/Recommend';

const DetailPage = () => {
  const [detailList, setDetailList] = useState({});
  useEffect(() => {
    axios
      .get(
        `https://1d74-124-111-225-247.ngrok-free.app/festivals/2988268
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
  return (
    <DetailPageContainer>
      <FestivalCover />
      <ContentsSection>
        <FestivalInfo />
        <FestivalLocation />
        <Recommend />
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
