//react
import { useState } from 'react';
//style
import styled from 'styled-components';
//components
import MyCommentList from '@components/myreview/comments/MyCommentList';
import MyReviewToggle from '@components/myreview/MyReviewToggle';
import MyReviewList from '@components/myreview/reviews/MyReviewList';

interface Props {
  textTitle: string;
}
/** 2023/08/14- 마이페이지 리뷰 탭 - by leekoby */
const MyReview: React.FC<Props> = ({ textTitle }): JSX.Element => {
  const [isSelected, setIsSelected] = useState<boolean>(true);

  const HandlerToggle = () => {
    setIsSelected(!isSelected);
  };

  return (
    <MyReviewContainer>
      <HeaderWrapper>
        <h1 className="myinfo-title">{textTitle}</h1>
        <div className="toggle-wrap">
          <MyReviewToggle isSelectTicket={isSelected} onClick={HandlerToggle} />
        </div>
      </HeaderWrapper>
      {isSelected ? <MyReviewList /> : <MyCommentList />}
    </MyReviewContainer>
  );
};

export default MyReview;
// 본문 컨테이너
const MyReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 200px);
  background: #f8f8f8;
`;
const HeaderWrapper = styled.section`
  display: flex;

  .myinfo-title {
    vertical-align: center;
    white-space: nowrap;
    font-size: 16px;
    font-weight: 700;
    color: var(--color-dark);
    padding: 1.8rem 0 1rem 2rem;
  }

  .toggle-wrap {
    display: flex;
    align-items: center;
    justify-content: end;
    width: 100%;
    padding-right: 1rem;
  }
`;
