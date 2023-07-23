import styled from 'styled-components';

// components
import FestivalLike from '@components/festival/FestivalLike';

interface MyInfoListProps {
  textTitle: string;
  items: string[];
}

const MyInfoList = ({ textTitle, items }: MyInfoListProps) => {
  return (
    <MyInfoListContainer>
      <p className="myinfo-title">{textTitle}</p>
      <ContentItemWrap>
        <FestivalLike />
        <FestivalLike />
        <FestivalLike />
        <FestivalLike />
        <FestivalLike />
      </ContentItemWrap>
    </MyInfoListContainer>
  );
};

export default MyInfoList;

// 본문 컨테이너
const MyInfoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 200px);
  background: #f8f8f8;

  > .myinfo-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--color-dark);
    padding: 1.8rem 0 1rem 2rem;
  }
`;

const ContentItemWrap = styled.div`
  width: 100%;
  background: var(--background-color);
  display: flex;
  flex-direction: column;
  overflow: auto;

  // 스크롤바 없애기
  // chrome and safari
  ::-webkit-scrollbar {
    display: none;
  }
  // firefox
  scrollbar-width: none;
`;
