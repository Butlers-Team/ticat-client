import { useState, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RecentListType } from 'types/api/myinfo';

// hook
import { usePostFestivalLike } from '@hooks/query/usePostFestivalLike';
import { usePostFestivalUnLike } from '@hooks/query/usePostFestivalUnLike';

// utils
import { formatDate } from '@utils/formatDate';
import { splitAddress } from '@utils/address';
import { optimisticUpdateWithMutate } from '@utils/optimisticUpdateWithMutate';

// icons
import { MdPlace } from 'react-icons/md';
import { TiHeartFullOutline } from 'react-icons/ti';

interface RecentListItemProps {
  recentItem: RecentListType;
}

/** 2023/09/22 - 이미지 에러 시 기본 이미지로 대체 - by sineTlsl */
const handlerImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  target.src = '/assets/images/ticat-cover-image.png';
};

/** 2023/07/08 - 축제 컴포넌트 - by sineTlsl */
const RecentListItem = ({ recentItem }: RecentListItemProps) => {
  const postFestivalLike = usePostFestivalLike({ festivalId: recentItem.festivalId });
  const postFestivalUnLike = usePostFestivalUnLike({ festivalId: recentItem.festivalId });
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const [itemIsLike, setIsItemLike] = useState<boolean>(recentItem.favorite);

  /** 2023/10/20 - 축제 좋아요/좋아요 취소 - by sineTlsl */
  const handlerFestivalLike = () => {
    optimisticUpdateWithMutate(
      timer, // 여기에 생성된 타이머
      itemIsLike, // 바꾸려는 상태
      setIsItemLike, // 바꾸려는 상태 Set함수
      postFestivalLike, // 생성 Api 요청 mutation
      postFestivalUnLike, // 취소 Api 요청 뮤테이션
      500, // 시간은 500~1000사이가 좋아용
    );

    console.log('실행중 >> ', itemIsLike);
  };

  return (
    <FestivalContainer>
      <Link className="link-wrap" to={`/detail/${recentItem.festivalId}`}>
        <ImgWrap>
          <img src={recentItem.imageUrl || '/assets/images/ticat-cover-image.png'} alt="" onError={handlerImgError} />
        </ImgWrap>
        <DescriptionWrap>
          <h3 className="festival-title">{recentItem.title}</h3>
          <div className="area-wrap">
            <MdPlace size="13px" color="var(--color-dark)" />
            <p className="festival-area">{splitAddress(recentItem.address)}</p>
          </div>
          <p className="festival-date">
            {formatDate(recentItem.eventStartDate)} ~ {formatDate(recentItem.eventEndDate)}
          </p>
        </DescriptionWrap>
      </Link>
      <FestivalLikeWrap>
        <button onClick={handlerFestivalLike}>
          <TiHeartFullOutline size="14px" color={itemIsLike ? 'var(--color-sub)' : 'var(--color-light-gray)'} />
        </button>
      </FestivalLikeWrap>
    </FestivalContainer>
  );
};

export default RecentListItem;

// 최근 목록 컨테이너
const FestivalContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: calc(100% - 4rem);
  height: 105px;
  color: var(--color-dark);
  font-size: 13px;

  > .link-wrap {
    display: flex;
    width: calc(100% - 20px);
    height: 100%;
    align-items: center;
  }
`;

// 이미지
const ImgWrap = styled.div`
  flex: 0 0 90px;
  height: 100%;
  padding: 1.5rem 1.5rem 1.5rem 0;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

// 축제 정보
const DescriptionWrap = styled.div`
  width: calc(100% - 90px - 14px);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding-right: 1rem;

  > .festival-title {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--color-dark);
    font-weight: 700;
    line-height: 2rem;
    font-size: 16px;
  }
  > .area-wrap {
    display: flex;
    align-items: center;
    font-size: 12px;
  }
  > .festival-date {
    color: var(--color-dark-gray);
    font-size: 12px;
  }
`;

// 축제 좋아요
const FestivalLikeWrap = styled.div`
  height: 100%;
  width: 20px;
  display: flex;
  align-items: flex-start;
  padding-top: 2rem;

  > button {
    border: none;
    padding: none;
    margin: none;
    background: none;
  }
`;
