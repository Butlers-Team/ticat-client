import styled from 'styled-components';

// utils
import { formatDate } from '@utils/formatDate';
import { truncatedText } from '@utils/truncatedText';
import { splitAddress } from '@utils/address';
import { RecentListType } from 'types/api/myinfo';

// icons
import { MdPlace } from 'react-icons/md';
import { TiHeartFullOutline } from 'react-icons/ti';

interface FestivalLikeProps {
  recentItem: RecentListType;
}

/** 2023/07/08 - 축제 컴포넌트 - by sineTlsl */
const FestivalLike = ({ recentItem }: FestivalLikeProps) => {
  return (
    <FestivalContainer>
      <ImgBox>
        {recentItem.imageUrl !== '' ? (
          <img src={recentItem.imageUrl} />
        ) : (
          <img src="/assets/images/ticat-cover-image.png" />
        )}
      </ImgBox>
      <DescriptionWrap>
        <div className="title-space-between">
          <h3 className="festival-left-title">{truncatedText(recentItem.title, 15)}</h3>
          <div className="festival-right">
            <TiHeartFullOutline size="14px" color="var(--color-sub)" />
          </div>
        </div>
        <div className="area-wrap">
          <MdPlace size="13px" color="var(--color-dark)" />
          <p className="festival-area">{splitAddress(recentItem.address)}</p>
        </div>
        <p className="festival-date">
          {formatDate(recentItem.eventStartDate)} ~ {formatDate(recentItem.eventEndDate)}
        </p>
      </DescriptionWrap>
    </FestivalContainer>
  );
};

export default FestivalLike;

/** 2023/07/08 - 축제 컨테이너 - by sineTlsl */
const FestivalContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: calc(100% - 4rem);
  height: 105px;
  color: var(--color-dark);
  font-size: 13px;
`;

/** 2023/07/08 - 축제 정보 이미지 - by sineTlsl */
const ImgBox = styled.div`
  flex: 0 0 90px;
  height: 100%;
  width: 100%;
  padding: 1.5rem 1.5rem 1.5rem 0;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

/** 2023/07/08 - 축제 정보 텍스트 - by sineTlsl */
const DescriptionWrap = styled.div`
  flex: 0 1 calc(100% - 95px);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  > .title-space-between {
    display: flex;
    justify-content: space-between;
    color: var(--color-dark-gray);
    line-height: 2rem;
  }
  > .title-space-between > .festival-left-title {
    flex: 0 1 85%;
    font-size: 16px;
    font-weight: 700;
    color: var(--color-dark);
  }
  > .title-space-between > .festival-right {
    flex: 0 0 15%;
    display: flex;
    font-size: 12px;
    justify-content: flex-end;

    @media screen and (max-width: 400px) {
      font-size: 11px;
    }
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
