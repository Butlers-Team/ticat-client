//react
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
//style
import styled from 'styled-components';
//components
import ReviewItem from '@components/review/review-item/ReviewItem';
import Pagination from '@components/Pagination';
//hooks
import { useFetchMyReviewList } from '@hooks/query/useFetchMyReview';
import { da } from 'date-fns/locale';
//store
interface Props {}

/** 2023/08/14- 마이페이지 리뷰 리스트 - by leekoby */
const MyReviewList: React.FC<Props> = (props): JSX.Element => {
  const [page, setPage] = useState(1);

  const { data } = useFetchMyReviewList({ page, size: 10 });

  // 수정 모드 확인
  const [activeEditModeReivew, setActiveEditModeReview] = useState<number | null>(null);

  //리뷰 수정모드 핸들러
  const handleEditModeChange = (reviewId: number) => {
    setActiveEditModeReview(activeEditModeReivew === reviewId ? null : reviewId);
  };

  // 댓글 폼 오픈 여부
  const [openedReviewId, setOpenedReviewId] = useState<number | null>(null);

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
          data?.data.map(review => (
            <li>
              <Link to={`/detail/${review.festivalId}`}>
                <h2>{review.festivalTitle}</h2>
              </Link>
              <ReviewItem
                key={review.reviewId}
                festivalId={review.festivalId}
                review={review}
                isEditMode={activeEditModeReivew === review.reviewId}
                onEditModeChange={() => handleEditModeChange(review.reviewId)}
                showCommentForm={openedReviewId === review.reviewId}
                isMyPage={true}
              />
            </li>
          ))}
        {data && data.pageInfo.totalPages > 1 && (
          <Pagination page={data.pageInfo.page} totalPages={data.pageInfo.totalPages} onPageChange={handlePageChange} />
        )}
      </ContentItemWrap>
    </>
  );
};

export default MyReviewList;

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
      font-size: 1.4rem;
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
