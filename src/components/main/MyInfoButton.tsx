import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//icon
import { IoIosArrowForward } from 'react-icons/io';
import { HiLocationMarker } from 'react-icons/hi';
import { WeatherIcon } from '@components/WeatherIcon';
import LodingIcon from '@components/LodingIcon';

//API
import { getWeather } from '@api/weather';

//type
import { WeatherRequest, WeatherType } from 'types/api/weather';

interface bgColor {
  bgcolor: string;
}

const MyInfoButton = () => {
  const [myWeather, setMyWeather] = useState<WeatherType>();
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const myLocationWeather = async () => {
    const params: WeatherRequest = {
      currentLongitude: longitude,
      currentLatitude: latitude,
    };
    const weather = await getWeather(params);
    console.log(weather);
    weather && setMyWeather(weather);
    setIsLoading(false); // Weather 데이터를 받아오면 로딩 상태 해제.
  };

  useEffect(() => {
    /**2023.07.25 사용자 위치정보 요청 - by mscojl24 */
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          console.log(position);
          console.log(`위도:${position.coords.latitude} 경도:${position.coords.longitude}`);
        },
        error => {
          console.error('Error getting location:', error);
          // 위치 정보를 받아오지 못할경우 디폴트 데이터 출력.
          setLatitude(126.98834145916423);
          setLongitude(37.54810058003352);
          setIsLoading(false);
        },
        {
          timeout: 5000,
        },
      );
    } else {
      setLatitude(126.98834145916423);
      setLongitude(37.54810058003352);
      setIsLoading(false);
    }
  }, []);

  const navigateStamp = () => {
    navigate(`/stamp/list`);
  };

  useEffect(() => {
    // 위치 정보를 가져온 후에 myLocationWeather 함수를 실행합니다.
    if (latitude && longitude) {
      myLocationWeather();
    }
  }, [latitude, longitude]);
  console.log(myWeather?.region);
  return (
    <div>
      <MyInfoCheck bgcolor="var(--color-main)" onClick={navigateStamp} className="cursor-pointer">
        <li className="flex-v-center column left-section">
          <span className="font-main">나의 티캣 확인하기</span>
          <p className="font-sub">집사님의 티캣을 수집해보세요</p>
        </li>
        <li className="flex-h-center row">
          <IoIosArrowForward className="size-large move-icon" />
        </li>
      </MyInfoCheck>
      {isLoading ? (
        <MyInfoCheck bgcolor="var(--color-sub)">
          <li className="flex-v-center column left-section">
            <span className="font-main">{`현재 집사님의 위치를 조회중 입니다`}</span>
            <p className="font-sub">{`잠시만 기다려주세요 :)`}</p>
          </li>
          <li className="flex-h-center row width">
            <div className="local-wather-icon">
              <LodingIcon></LodingIcon>
            </div>
          </li>
        </MyInfoCheck>
      ) : (
        <MyInfoCheck bgcolor="var(--color-sub)">
          <li className="flex-v-center column left-section">
            <span className="font-main">현재의 날씨는 {myWeather?.weather.sky} 입니다</span>
            <p className="font-sub">
              <HiLocationMarker className="icon-margin" />
              {myWeather?.region}
            </p>
          </li>
          <li className="flex-h-center row">
            <div className="local-wather-icon flex-h-center">
              <WeatherIcon regionWeather={myWeather} />
            </div>
            <div className="local-Temperature flex-v-center row">
              <span>{myWeather?.weather.temp}˚</span>
            </div>
          </li>
        </MyInfoCheck>
      )}
    </div>
  );
};

export default MyInfoButton;

const MyInfoCheck = styled.ul<bgColor>`
  display: flex;
  padding: 15px;
  border-radius: 10px;
  background-color: ${({ bgcolor }) => bgcolor};
  color: #fff;
  margin: 10px 0px;

  &.cursor-pointer {
    cursor: pointer;
  }

  .left-section {
    flex-grow: 3;
    .font-main {
      width: calc(100% - 10px);
      font-size: 1.8rem;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .font-sub {
      font-size: 1.3rem;
      font-weight: 400;
      opacity: 0.8;
      .icon-margin {
        margin-right: 3px;
      }
    }
  }

  .size-large {
    font-size: 2rem;
  }

  .move-icon {
    animation: moveIcon 1s infinite;
  }

  @keyframes moveIcon {
    0% {
      opacity: 0;
      transform: translateX(-8px);
    }
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }

  .local-wather-icon {
    font-size: 2rem;
    margin-right: 10px;
  }
  .local-Temperature {
    align-items: flex-end;
    span {
      font-size: 3.3rem;
      font-weight: 900;
    }
    p {
      font-size: 1.5rem;
      margin: 5px;
    }
  }
`;
