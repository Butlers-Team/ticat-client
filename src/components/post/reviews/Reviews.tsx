//react
import { Link } from 'react-router-dom';

//style
import styled from 'styled-components';

//types
import { FestivalDetailType } from 'types/api/detail';

//components
import Button from '@components/Button';
import BlogReviews from '@components/post/blog-reviews/BlogReviews';
import ReviewHeader from '@components/post/reviews/ReviewHeader';
import ReviewsList from '@components/post/reviews/ReviewsList';
import ReviewEditorForm from '@components/post/reviews/ReviewEditorForm';

//store
import { useMemberStore } from '@store/useMemberStore';
import { getToken } from '@store/useTokenStore';

interface Props {
  detailList: FestivalDetailType;
}
/** 2023/07/22- 리뷰 영역 - by leekoby */
const Reviews: React.FC<Props> = ({ detailList }): JSX.Element => {
  const { member } = useMemberStore();
  const { accessToken, refreshToken } = getToken();
  const isLogin = accessToken && refreshToken && member?.memberId;

  return (
    <ReviewSection>
      <ReviewHeader detailList={detailList} />
      {detailList && <BlogReviews festivalName={detailList.title} />}
      {isLogin ? (
        <ReviewEditorForm festivalId={detailList.festivalId} />
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

export default Reviews;

const ReviewSection = styled.section`
  width: 100%;
  height: 100%;
  padding: 3rem 2rem;
`;
