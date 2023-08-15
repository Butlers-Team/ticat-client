//react
import { Link } from 'react-router-dom';

//style
import styled from 'styled-components';

//types
import { FestivalDetailType } from 'types/api/detail';

//components
import Button from '@components/Button';
import BlogReviews from '@components/review/blog-reviews/BlogReviews';
import ReviewHeader from '@components/review/ReviewHeader';
import ReviewsList from '@components/review/ReviewsList';
import ReviewEditor from '@components/review/ReviewEditor';

//store
import { useMemberStore } from '@store/useMemberStore';
import { getToken } from '@store/useTokenStore';

interface Props {
  detailList: FestivalDetailType;
}
/** 2023/07/22- 리뷰 영역 - by leekoby */
const Review: React.FC<Props> = ({ detailList }): JSX.Element => {
  const { member } = useMemberStore();
  const { accessToken, refreshToken } = getToken();
  const isLogin = accessToken && refreshToken && member?.memberId;

  return (
    <ReviewSection>
      <ReviewHeader detailList={detailList} />
      {detailList && <BlogReviews festivalName={detailList.title} />}
      {isLogin ? (
        <ReviewEditor festivalId={detailList.festivalId} />
      ) : (
        <Link to={'/signin'}>
          {/* TODO: 비로그인 상태에서 로그인 유도 컴포넌트 만들기 */}
          <Button>로그인하고 후기 남기기</Button>
        </Link>
      )}
      <ReviewsList festivalId={detailList.festivalId} />
    </ReviewSection>
  );
};

export default Review;

const ReviewSection = styled.section`
  width: 100%;
  height: 100%;
  padding: 3rem 2rem;
`;
