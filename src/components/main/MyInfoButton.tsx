import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocationStore } from '@store/userLocation';

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { location } = useLocationStore();

  console.log(location);

  const myLocationWeather = async () => {
    const params: WeatherRequest = {
      currentLongitude: location.longitude,
      currentLatitude: location.latitude,
    };

    const weather = await getWeather(params);
    weather && setMyWeather(weather);
    setIsLoading(false); // Weather 데이터를 받아오면 로딩 상태 해제.
  };

  const navigateStamp = () => {
    navigate(`/stamp/list`);
  };

  useEffect(() => {
    // 위치 정보를 가져온 후에 myLocationWeather 함수를 실행합니다.
    if (location) {
      myLocationWeather();
    }
  }, [location.latitude, location.latitude]);

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
            <span className="font-main">{`집사님의 위치를 조회중 입니다`}</span>
            <p className="font-sub">{`잠시만 기다려주세요 :)`}</p>
          </li>
          <li className="flex-h-center row width">
            <div className="local-wather-icon">
              <LodingIcon width="20px" height="20px"></LodingIcon>
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
