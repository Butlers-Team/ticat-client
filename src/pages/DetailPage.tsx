import styled from 'styled-components';

//components
import FestivalCover from '@components/detail/FestivalCover';
import FestivalInfo from '@components/detail/FestivalInfo';
import FestivalLocation from '@components/detail/FestivalLocation';
import Recommend from '@components/detail/Recommend';

const DetailPage = () => {
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
