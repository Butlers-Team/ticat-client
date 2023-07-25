import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { WeatherIcon } from '@components/WeatherIcon';

//icon
import { IoIosArrowForward } from 'react-icons/io';
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

  const myLocationWeather = async () => {
    const params: WeatherRequest = {
      currentLongitude: latitude,
      currentLatitude: longitude,
    };

    const weather = await getWeather(params);
    console.log(weather);
    weather && setMyWeather(weather);
    setIsLoading(true); // Weather 데이터를 받아오면 로딩 상태 해제.
  };

  useEffect(() => {
    /**2023.07.25 사용자 위치정보 요청 - by mscojl24 */
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
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

  useEffect(() => {
    // 위치 정보를 가져온 후에 myLocationWeather 함수를 실행합니다.
    if (latitude && longitude) {
      myLocationWeather();
    }
  }, [latitude, longitude]);

  return (
    <div>
      <MyInfoCheck bgcolor="var(--color-main)">
        <li className="flex-v-center column left-section">
          <span className="font-main">나의 티캣 확인하기</span>
          <p className="font-sub">현재 5마리의 티캣이 모여있어요</p>
        </li>
        <li className="flex-h-center row">
          <IoIosArrowForward className="size-large" />
        </li>
      </MyInfoCheck>
      {isLoading ? (
        <MyInfoCheck bgcolor="var(--color-sub)">
          <li className="flex-v-center column left-section">
            <span className="font-main">현재 집사님의 위치를 조회중 입니다</span>
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
            <p className="font-sub">{myWeather?.region}</p>
          </li>
          <li className="flex-h-center row">
            <div className="local-wather-icon">
              <WeatherIcon regionWeather={myWeather} />
            </div>
            <div className="local-Temperature flex-v-center row">
              <span>{myWeather?.weather.temp}</span>
              <p>˚C</p>
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
  padding: 20px;
  border-radius: 10px;
  background-color: ${({ bgcolor }) => bgcolor};
  color: #fff;
  margin: 10px 0px;

  .left-section {
    flex-grow: 3;
    .font-main {
      font-size: 1.8rem;
      font-weight: 700;
    }
    .font-sub {
      font-size: 1.2rem;
      font-weight: 400;
      opacity: 0.8;
    }
  }

  .size-large {
    font-size: large;
  }

  .local-wather-icon {
    font-size: 3rem;
  }
  .local-Temperature {
    align-items: flex-end;
    span {
      font-size: 3.5rem;
      font-weight: 900;
    }
    p {
      font-size: 1.5rem;
    }
  }
`;
