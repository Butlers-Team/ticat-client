import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//api
import { festivalLikedRequest, festivalUnLikedRequest } from '@api/festivalliked';
import { getWeather } from '@api/weather';
import { CalendarListType2 } from 'types/api/calendar';
import { WeatherRequest, WeatherType } from 'types/api/weather';
//components
import { WeatherIcon } from '@components/WeatherIcon';
import AddCalendar from '@components/calendar/AddCalendarForm';
//icon
import { TiLocation } from 'react-icons/ti';
import { LuStamp } from 'react-icons/lu';
import { BiSolidHeart } from 'react-icons/bi';
import { FiHeart, FiShare2 } from 'react-icons/fi';
import { LuTicket } from 'react-icons/lu';
import { BsCalendarPlus } from 'react-icons/bs';
import { FestivalDetailType } from 'types/api/detail';
import { formatDate } from '@utils/formatDate';
import { useTokenStore } from '@store/useTokenStore';
import { useMemberStore } from '@store/useMemberStore';

interface FestivalCoverProps {
  detailList: FestivalDetailType;
}
const FestivalCover: React.FC<FestivalCoverProps> = ({ detailList }) => {
  const { member } = useMemberStore();
  const { accessToken, refreshToken } = useTokenStore();
  const isAuthenticated = !!accessToken && !!refreshToken;
  const token = window.localStorage.getItem('accessToken');
  const location = useLocation();
  const navigate = useNavigate();
  const [dateForm, setDateForm] = useState<boolean>(false);
  const [defaultImg, setDefaultImg] = useState(detailList.image);
  const [festivalLiked, setFestivalLiked] = useState(detailList.liked);
  const [regionWeather, setRegionWeather] = useState<WeatherType | undefined>();
  const eventhomepage = detailList.eventhomepage.slice(
    // 축제 홈페이지 주소가 옛날 데이터 주소는 url이 그대로오고, 요즘 데이터는 <a>태그가 붙어서 오기 때문에 분기가 필요하다
    detailList.eventhomepage.indexOf('http'),
    detailList.eventhomepage.indexOf('target') - 2,
  );

  /**2023-07-19 - 축제 이미지가 없을 시, 대체이미지 삽입하는 함수 - by parksubeom */
  const ImgErrorHandler = () => {
    setDefaultImg('/assets/images/ticat-cover-image.png');
  };

  /** 2023-07-20 - 현재 축제의 좋아요 요청/좋아요 취소 요청을 보내는 함수 - by parksubeom */
  const LikedHandler = () => {
    if (!token) {
      if (window.confirm('로그인이 필요한 기능입니다. 로그인 하시겠습니까?')) {
        return (window.location.href = '/signin');
      } else {
        return;
      }
    }
    //https://ticat.store/festivals/2992167/favorite 로 엑세스토큰담아서 post요청 보내면된다
    if (festivalLiked === true) {
      festivalUnLikedRequest(detailList.festivalId);
      setFestivalLiked(!festivalLiked);
    } else {
      festivalLikedRequest(detailList.festivalId);
      setFestivalLiked(!festivalLiked);
    }
  };
  /** 2023-07-20 - 현재 머물고있는 페이지의 url을 클립보드에 복사해주는 함수 - by parksubeom */
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었어요.');
    } catch (err) {
      console.log(err);
    }
  };

  /** 2023-07-20 - 해당 축제 홈페이지로 라우팅 시켜주는 함수 - by parksubeom */
  const HomepageRoute = () => {
    if (detailList.eventhomepage.indexOf('<') === -1) {
      window.location.assign(detailList.eventhomepage);
    } else {
      window.location.assign(eventhomepage);
    }
  };

  /**2023-07-22 - 해당 축제의 위치에 날씨를 불러오는 함수 - by parksubeom */
  const fetchWeather = async () => {
    const params: WeatherRequest = {
      currentLongitude: detailList.mapx,
      currentLatitude: detailList.mapy,
    };
    const res = await getWeather(params);
    setRegionWeather(res);
  };
  /**2023-08-31 - 캘린더등록 버튼 클릭 이벤틑 함수 - by parksubeom */
  const addCalendar = () => {
    setDateForm(!dateForm);
  };
  const routeStampPage = () => {
    const item: CalendarListType2 = {
      address: detailList.address,
      category: detailList.category,
      eventEndDate: detailList.eventenddate,
      eventhomepage: detailList.eventhomepage,
      eventplace: detailList.eventplace,
      eventStartDate: detailList.eventstartdate,
      festivalId: detailList.festivalId,
      image: detailList.image,
      liked: detailList.liked,
      mapx: detailList.mapx,
      mapy: detailList.mapy,
      overview: detailList.overview,
      playtime: detailList.playtime,
      price: detailList.price,
      status: detailList.status,
      tel: detailList.tel,
      title: detailList.title,
    };
    navigate('/stamp/valid', { state: { item } });
  };

  useEffect(() => {
    fetchWeather();
  }, []);
  return (
    <CoverContainer>
      {dateForm && (
        <AddCalendar
          setDateForm={setDateForm}
          festivalId={detailList.festivalId}
          startdate={detailList.eventstartdate}
          enddate={detailList.eventenddate}
        />
      )}
      <img src={defaultImg} onError={ImgErrorHandler}></img>
      <div className="wather-info flex-all-center">
        <span>{regionWeather ? regionWeather.region : 'Loding...'}</span>
        <span className="wather-icon flex-all-center">
          <WeatherIcon regionWeather={regionWeather} />
        </span>
      </div>
      <div className="festival-info">
        {detailList.status === 'ONGOING' ? (
          <button className="festival-proceeding">진행 중</button>
        ) : detailList.status === 'EXPECTED' ? (
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
          {detailList.status !== 'COMPLETED' && !!isAuthenticated && !!member ? (
            <button className="calendar-add-btn" onClick={addCalendar}>
              캘린더등록
              <span>
                <BsCalendarPlus />
              </span>
            </button>
          ) : (
            <button className="calendar-disaled-btn" onClick={addCalendar} disabled>
              캘린더등록
              <span>
                <BsCalendarPlus />
              </span>
            </button>
          )}
          <button className="calendar-icon-btn" onClick={LikedHandler}>
            {festivalLiked === true ? <BiSolidHeart /> : <FiHeart />}
          </button>
          {detailList.eventhomepage !== '' ? (
            <button className="calendar-icon-btn" onClick={HomepageRoute}>
              <LuTicket />
            </button>
          ) : null}
          <button
            className="calendar-icon-btn"
            onClick={() => handleCopyClipBoard(`${window.location.origin}${location.pathname}`)}>
            <FiShare2 />
          </button>

          <button className="calendar-icon-btn" onClick={routeStampPage}>
            <LuStamp />
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
    padding: 0 2rem;
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
    font-size: 15px;
    margin-right: 5px;
    cursor: pointer;
    > span {
      font-size: 16px;
      margin-left: 2rem;
    }
  }
  > .calendar-disaled-btn {
    display: flex;
    align-items: center;
    justify-items: space-between;
    background-color: #949090;
    color: var(--color-light);
    height: 3.5rem;
    border-radius: 5px;
    border: none;
    font-size: 15px;
    margin-right: 5px;
    cursor: pointer;
    > span {
      font-size: 16px;
      margin-left: 2rem;
    }
  }
  > .calendar-icon-btn {
    display: flex;
    cursor: pointer;
    align-items: center;
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
