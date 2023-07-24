import styled from 'styled-components';

// utils
import { formatDate } from '@utils/formatDate';
import { splitAddress } from '@utils/address';
import { RecentListType } from 'types/api/myinfo';

// icons
import { MdPlace } from 'react-icons/md';
import { TiHeartFullOutline } from 'react-icons/ti';

interface RecentListItemProps {
  recentItem: RecentListType;
}

/** 2023/07/08 - 축제 컴포넌트 - by sineTlsl */
const RecentListItem = ({ recentItem }: RecentListItemProps) => {
  return (
    <FestivalContainer>
      <ImgWrap>
        {recentItem.imageUrl !== '' ? (
          <img src={recentItem.imageUrl} />
        ) : (
          <img src="/assets/images/ticat-cover-image.png" />
        )}
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
      <FestivalLikeWrap>
        <TiHeartFullOutline size="14px" color={recentItem.favorite ? 'var(--color-sub)' : 'var(--color-light-gray)'} />
      </FestivalLikeWrap>
    </FestivalContainer>
  );
};

export default RecentListItem;

// 최근 목록 컨테이너
const FestivalContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: calc(100% - 4rem);
  height: 105px;
  color: var(--color-dark);
  font-size: 13px;
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
  width: 14px;
  display: flex;
  align-items: flex-start;
  padding-top: 2.5rem;
`;
