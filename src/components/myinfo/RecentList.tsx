import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRecentList } from '@api/myinfo';

// components
import RecentListItem from '@components/myinfo/RecentListItem';

interface RecentListProps {
  textTitle: string;
}

/** 2023/07/23 - 마이페이지 최근 목록 리스트 컴포넌트 - by sineTlsl */
const RecentList = ({ textTitle }: RecentListProps) => {
  const { data } = useQuery(['recentList'], getRecentList);

  return (
    <MyInfoListContainer>
      <p className="myinfo-title">{textTitle}</p>
      <ContentItemWrap>
        {data &&
          data.map(item => (
            <li key={item.festivalId}>
              <Link to={`/detail/${item.festivalId}`}>
                <RecentListItem recentItem={item} />
              </Link>
            </li>
          ))}
      </ContentItemWrap>
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
