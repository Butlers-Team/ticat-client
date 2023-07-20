import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { festivalLikedRequest, festivalUnLikedRequest } from '@api/festivalliked';
//icon
import { TiLocation } from 'react-icons/ti';
import { BiSun, BiSolidHeart } from 'react-icons/bi';
import { FiHeart, FiShare2 } from 'react-icons/fi';
import { LuTicket } from 'react-icons/lu';
import { BsCalendarPlus } from 'react-icons/bs';
import { FestivalDetailType } from 'types/api/detail';
import { formatDate } from '@utils/formatDate';
import { shareKakao } from '@utils/shareKakao';
interface FestivalCoverProps {
  detailList: FestivalDetailType;
}
const FestivalCover: React.FC<FestivalCoverProps> = ({ detailList }) => {
  const [defaultImg, setDefaultImg] = useState(detailList.image);

  /**2023-07-19 - 축제 이미지가 없을 시, 대체이미지 삽입하는 함수 - by parksubeom */
  const ImgErrorHandler = () => {
    setDefaultImg('/assets/images/ticat-cover-image.png');
  };

  const LikedHandler = () => {
    //https://ticat.store/festivals/2992167/favorite 로 엑세스토큰담아서 post요청 보내면된다
    if (detailList.liked === true) {
      festivalUnLikedRequest(detailList.festivalId);
    } else {
      festivalLikedRequest(detailList.festivalId);
    }
  };

  const ShareHandler = () => {
    shareKakao(
      'https://d99pqcn6hzkdg.cloudfront.net/detail/2994118',
      detailList.title,
      detailList.overview,
      detailList.image,
    );
  };

  return (
    <CoverContainer>
      <img src={defaultImg} onError={ImgErrorHandler}></img>
      <div className="wather-info flex-all-center">
        <span>축제날씨</span>
        <span className="wather-icon flex-all-center">
          <BiSun />
        </span>
      </div>
      <div className="festival-info">
        {detailList.status === 'ONGOING' ? (
          <button className="festival-proceeding">진행 중</button>
        ) : detailList.status === 'PLANNED' ? (
          <button className="festival-proceeding">예정 됨</button>
        ) : (
          <button className="festival-ended">종료 됨</button>
        )}
        <p className="shadow">
          {formatDate(detailList.eventstartdate)} - {formatDate(detailList.eventenddate)}
        </p>
        <h2 className="shadow">{detailList.title}</h2>
        <span className="shadow">
          <TiLocation /> {detailList.address}
        </span>
        <BtnSection>
          <button className="calendar-add-btn">
            캘린더등록
            <span>
              <BsCalendarPlus />
            </span>
          </button>
          <button className="calendar-icon-btn" onClick={LikedHandler}>
            {detailList.liked === true ? <BiSolidHeart /> : <FiHeart />}
          </button>
          {detailList.eventhomepage !== '' ? (
            <button className="calendar-icon-btn" onClick={ShareHandler}>
              <LuTicket />
            </button>
          ) : null}
          <button className="calendar-icon-btn">
            <FiShare2 />
          </button>
        </BtnSection>
      </div>
    </CoverContainer>
  );
};

export default FestivalCover;
/** 2023/07/06 - 축제 커버 컨테이너 - parksubeom */
const CoverContainer = styled.article`
  position: relative;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  z-index: 5;
  height: 500px;
  font-size: 1.5rem;
  color: #fff;
  > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    filter: brightness(40%);
  }
  //날씨 정보
  > .wather-info {
    position: absolute;
    top: 20px;
    right: 20px;
    //날씨 아이콘
    .wather-icon {
      width: 30px;
      height: 30px;
      margin-left: 5px;
      font-size: 2.5rem;
    }
  }
  .shadow {
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
  }
  //행사 정보
  > .festival-info {
    width: 100%;
    position: absolute;
    bottom: 60px;
    left: 20px;
    //행사가 진행중이라면 진행중
    > .festival-proceeding {
      color: var(--color-light);
      background-color: var(--color-main);
      border: none;
      border-radius: 5px;
      height: 2.5rem;
    }
    //행사가 종료됐다면 종료된
    > .festival-ended {
      color: var(--color-light);
      background-color: var(--color-dark-gray);
      border: none;
      border-radius: 5px;
      height: 2.5rem;
    }
    > * {
      margin-bottom: 10px;
    }

    > h2 {
      font-size: 24px;
      font-weight: 700;
    }
  }
`;

const BtnSection = styled.div`
  display: flex;
  flex-direction: row;
  margin: 3rem 0;

  > .calendar-add-btn {
    display: flex;
    align-items: center;
    justify-items: space-between;
    background-color: var(--color-main);
    color: var(--color-light);
    height: 3.5rem;
    border-radius: 5px;
    border: none;
    font-size: 1.5rem;
    margin-right: 5px;
    cursor: pointer;
    > span {
      font-size: 16px;
      margin-left: 2rem;
    }
  }
  > .calendar-icon-btn {
    cursor: pointer;
    text-align: center;
    justify-content: center;
    height: 3.5rem;
    width: 3.5rem;
    margin: 0 5px;
    background-color: var(--color-sub);
    color: var(--color-light);
    border: none;
    border-radius: 5px;
    font-size: 1.6rem;
    font-weight: bold;
  }
`;
