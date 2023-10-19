import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getRecentList } from '@api/myinfo';

// components
import RecentListItem from '@components/myinfo/RecentListItem';

interface RecentListProps {
  textTitle: string;
}

/** 2023/07/23 - 마이페이지 최근 목록 리스트 컴포넌트 - by sineTlsl */
const RecentList = ({ textTitle }: RecentListProps) => {
  const { data } = useQuery(['recentList'], getRecentList, { staleTime: 0 });

  return (
    <MyInfoListContainer>
      <p className="myinfo-title">{textTitle}</p>
      {data && data.length !== 0 ? (
        <ContentItemWrap>
          {data.map(item => (
            <li key={item.festivalId}>
              <RecentListItem recentItem={item} />
            </li>
          ))}
        </ContentItemWrap>
      ) : (
        <UndefinedData>
          <img src="/assets/images/ticat-logo-icon-undefined.png" alt="ticat-logo-icon-undefined" />
          <p className="undefined-stamp-data">최근 목록이 비워져 있어요</p>
        </UndefinedData>
      )}
    </MyInfoListContainer>
  );
};

export default RecentList;

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

const ContentItemWrap = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 1rem;
  padding-bottom: 1.5rem;

  > li {
    background: var(--background-color);
    border-radius: 5px;
  }

  // 스크롤바 없애기
  // chrome and safari
  ::-webkit-scrollbar {
    display: none;
  }
  // firefox
  scrollbar-width: none;
`;

/** 2023/08/28 - 데이터 정보가 없을 때 - by sineTlsl  */
const UndefinedData = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    width: 150px;
    height: 150px;
    opacity: 0.1;
  }

  > .undefined-stamp-data {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-dark-gray);
  }
`;
