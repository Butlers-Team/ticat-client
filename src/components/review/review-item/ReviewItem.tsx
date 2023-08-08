//react
import React, { useState } from 'react';
//api
//types
import { ReviewResponse } from 'types/api';
//install library
import styled from 'styled-components';
//icon
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
//components
import ReviewItemBottom from './ReviewLikes';
import ReviewItemContent from './ReviewItemContent';
import ReviewItemHeader from './ReviewItemHeader';
import ReviewImage from './ReviewImage';
import CommentForm from '../comment/CommentForm';
import Comment from '../comment/Comment';
//hooks
//util
//store

interface Props {
  review: ReviewResponse;
}
/** 2023/07/22 - 리뷰 아이템 - by leekoby */
const ReviewItem: React.FC<Props> = ({ review }): JSX.Element => {
  const {
    commentCount,
    content,
    disliked,
    displayName,
    liked,
    memberId,
    pictures,
    profileUrl,
    rating,
    reviewId,
    createdAt,
    modifiedAt,
  } = review;

  /** 2023/08/07 - 댓글 폼 보기  - by leekoby */
  const [isShowForm, setIsShowForm] = useState(false);

  /** 2023/08/07 - 댓글 더 보기  - by leekoby */
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <ReviewItemContainer>
        <HeaderWrapper>
          {profileUrl ? (
            <img src={profileUrl} />
          ) : (
            <img style={{ width: '3rem', height: '3rem' }} src="/assets/images/symbol-ticat1.png" />
          )}
          {displayName && (
            <ReviewItemHeader displayName={displayName} rating={rating} createdAt={createdAt} modifiedAt={modifiedAt} />
          )}
        </HeaderWrapper>
        <ReviewItemContent content={content} />
        <ReviewImage pictures={pictures} />
        <ReviewBottomWrapper>
          <ReviewItemBottom
            commentCount={commentCount}
            disliked={disliked}
            liked={liked}
            reviewId={reviewId}
            memberId={memberId}
          />
          <CommentButtonContainer>
            <CommentButtonWrapper>
              <button type="button" onClick={() => setIsShowForm(prev => !prev)}>
                댓글 남기기
              </button>
            </CommentButtonWrapper>
            {!!commentCount && (
              <CommentButtonWrapper onClick={() => setIsShow(prev => !prev)}>
                <button type="button">
                  {`댓글`} {isShow ? '닫기' : '보기'}
                </button>
                {isShow ? <FaAngleUp size={'1.3rem'} /> : <FaAngleDown size={'1.3rem'} />}
              </CommentButtonWrapper>
            )}
          </CommentButtonContainer>
        </ReviewBottomWrapper>
        {isShow && commentCount > 0 && <Comment reviewId={reviewId} />}
        {/* {isShowForm && <CommentForm reviewId={reviewId} />} */}
        <CommentForm show={isShowForm} reviewId={reviewId} />
      </ReviewItemContainer>
    </>
  );
};

export default React.memo(ReviewItem);

const ReviewItemContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const ReviewBottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const CommentButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-main);
  gap: 0.1rem;
  cursor: pointer;

  &:hover {
    color: var(--color-sub);
  }
  button {
    font-size: 1.3rem;
    font-weight: bold;
    background: none;
    border: none;
    padding: 0;
    color: inherit;
    cursor: pointer;
    outline: inherit;
  }
`;
