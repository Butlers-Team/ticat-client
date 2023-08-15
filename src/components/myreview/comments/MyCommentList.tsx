//react
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
//style
import styled from 'styled-components';
//install library
import Pagination from '@components/Pagination';
//components
import CommnetItem from '@components/review/comment/CommnetItem';
//hooks
import { useFetchMyCommentsList } from '@hooks/query/useFetchMyComment';

interface Props {}

/** 2023/08/15- 마이페이지 나의 리뷰 댓글 리스트  - by leekoby */
const MyCommentList: React.FC<Props> = (props): JSX.Element => {
  const [page, setPage] = useState(1);
  const { data } = useFetchMyCommentsList({ page, size: 10 });

  const [activeEditModeComment, setActiveEditModeComment] = useState<number | null>(null);

  const handleEditModeChange = (commentId: number) => {
    setActiveEditModeComment(activeEditModeComment === commentId ? null : commentId);
  };

  // 페이지네이션
  const contentItemWrapRef = useRef<HTMLUListElement>(null);
  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
    if (contentItemWrapRef.current) {
      contentItemWrapRef.current.scrollTop = 0;
    }
  };

  return (
    <>
      <ContentItemWrap ref={contentItemWrapRef}>
        {data &&
          data?.data.map(comment => (
            <li>
              <Link to={`/detail/${comment.festivalId}`}>
                <h2>{comment.festivalTitle}</h2>
              </Link>
              <CommnetItem
                key={comment.reviewCommentId}
                comment={comment}
                isMyPage
                isEditMode={activeEditModeComment === comment.reviewCommentId}
                onEditModeChange={() => handleEditModeChange(comment.reviewCommentId)}
              />
            </li>
          ))}
        {data && (
          <Pagination page={data.pageInfo.page} totalPages={data.pageInfo.totalPages} onPageChange={handlePageChange} />
        )}
      </ContentItemWrap>
    </>
  );
};

export default MyCommentList;
const ContentItemWrap = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 1rem;

  > li {
    background: var(--background-color);
    border-radius: 5px;
    padding: 1rem 1rem;

    h2 {
      font-size: 1.6rem;
      padding: 1rem 0;
      border-bottom: 1px var(--color-light-gray) solid;
      margin: 0 0 1rem 0;
    }
  }

  // 스크롤바 없애기
  // chrome and safari
  ::-webkit-scrollbar {
    display: none;
  }
  // firefox
  scrollbar-width: none;
`;
