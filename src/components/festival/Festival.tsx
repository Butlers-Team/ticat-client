import styled from 'styled-components';
import { FestivalListType } from 'types/api/festival';

// utils
import { formatDate } from '@utils/formatDate';
import { truncatedText } from '@utils/truncatedText';

// icons
import { FaStar } from 'react-icons/fa';
import { TiHeartFullOutline } from 'react-icons/ti';

interface FestivalProps {
  item: FestivalListType;
}

/** 2023/07/08 - 축제 컴포넌트 - by sineTlsl */
const Festival = ({ item }: FestivalProps) => {
  return (
    <FestivalContainer>
      <ImgBox>
        {item.image !== '' ? <img src={item.image} /> : <img src="/assets/images/ticat-cover-image.png" />}
      </ImgBox>
      <DescriptionWrap>
        <div className="title-space-between">
          <h3 className="festival-left-title">{truncatedText(item.title, 15)}</h3>
          <p className="festival-right">{item.category}</p>
        </div>
        <p className="festival-area">{item.address}</p>
        <div className="icon-wrap">
          <div className="review-icon">
            <FaStar size="14px" color="#FFAD33" />
            <span>
              {item.reviewRating} ({item.reviewCount})
            </span>
          </div>
          <p className="gap">|</p>
          <div className="review-icon">
            <TiHeartFullOutline size="14px" color="var(--color-sub)" />
            <span>{item.likeCount}</span>
          </div>
        </div>
        <p className="festival-date">
          {formatDate(item.eventstartdate)} ~ {formatDate(item.eventenddate)}
        </p>
      </DescriptionWrap>
    </FestivalContainer>
  );
};

export default Festival;

/** 2023/07/08 - 축제 컨테이너 - by sineTlsl */
const FestivalContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 110px;
  color: var(--color-dark);
  font-size: 13px;
`;

/** 2023/07/08 - 축제 정보 이미지 - by sineTlsl */
const ImgBox = styled.div`
  flex: 0 1 25%;
  height: 100%;
  width: 100%;
  padding-right: 1rem;

  > img {
    width: 100%;
    height: 100%;
    padding: 1rem 1rem 1rem 0;
    object-fit: cover;
  }
`;

/** 2023/07/08 - 축제 정보 텍스트 - by sineTlsl */
const DescriptionWrap = styled.div`
  flex: 0 1 75%;
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
  > .festival-area {
    width: 85%;
    font-size: 12px;

    @media screen and (max-width: 400px) {
      font-size: 11px;
      line-height: 15px;
    }
  }
  > .icon-wrap {
    display: flex;
  }
  > .icon-wrap > .gap {
    display: inline-block;
    font-size: 0;
    width: 1px;
    height: 10px;
    background: var(--color-dark-gray);
    margin: 4px 6px 0 8px;
    vertical-align: top;
    box-sizing: border-box;
  }
  > .icon-wrap > .review-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
  }
  > .festival-date {
    color: var(--color-sub);
  }
`;
