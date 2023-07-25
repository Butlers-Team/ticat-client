import styled from 'styled-components';
import { FestivalListType } from 'types/api/festival';

// utils
import { formatDate } from '@utils/formatDate';
import { splitAddress } from '@utils/address';

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
        <h3 className="festival-title">{item.title}</h3>
        <p className="festival-area">{splitAddress(item.address)}</p>
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
      <FestivalrCategoryWrap>
        <p className="festival-right">{item.category}</p>
      </FestivalrCategoryWrap>
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
  height: 105px;
  color: var(--color-dark);
  font-size: 13px;
`;

// 축제 정보 이미지
const ImgBox = styled.div`
  flex: 0 0 95px;
  height: 100%;
  width: 100%;
  padding: 1rem 1rem 1rem 0;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

// 축제 정보 텍스트
const DescriptionWrap = styled.div`
  width: calc(100% - 95px - 35px);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0 1rem 0 0.3rem;

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

  > .festival-area {
    width: 100%;
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

// 축제 카테고리
const FestivalrCategoryWrap = styled.div`
  height: 100%;
  color: var(--color-dark-gray);
  font-size: 12px;
  width: 35px;
  display: flex;
  white-space: nowrap;
  align-items: flex-start;
  justify-content: flex-end;
  padding-top: 1.2rem;

  @media screen and (max-width: 400px) {
    font-size: 11px;
  }
`;
