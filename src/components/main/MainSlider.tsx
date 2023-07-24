import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import WeatherIcon from '@components/WeatherIcon';
import { useNavigate } from 'react-router-dom';

//API
import { getMainFastival } from '@api/mainfastival';
import { getWeather } from '@api/weather';

//type
import { MainSwiperOptions } from 'types/swiper/swiperOptions';
import { MainFastivalType } from 'types/api/mainfastival';
import { WeatherRequest, WeatherType } from 'types/api/weather';

//icon
import { TiLocation } from 'react-icons/ti';

//swiper modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

//utils
import { formatDate } from '@utils/formatDate';

interface BgImage {
  backqroundimage: string;
}

const RecommendFestival = () => {
  const navigate = useNavigate();
  const [FestivalData, setFestivalData] = useState<MainFastivalType[]>([]);
  const [regionWeather] = useState<WeatherType | undefined>();

  const getMainData = async () => {
    const res = await getMainFastival();
    res.data && setFestivalData(res.data);
  };

  useEffect(() => {
    getMainData();
  }, []);

  const routingFestivalPage = (id: number) => {
    navigate(`/detail/${id}`);
  };

  /** 2023.07.05 main banner swiper options - by mscojl24 */

  const swiperOptions: MainSwiperOptions = {
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    modules: [Autoplay, EffectFade],
  };

  return (
    <Swiper {...swiperOptions} className="mySwiper">
      {FestivalData.map(festival => (
        <SwiperSlide key={festival.festivalId}>
          <SliderContainer
            backqroundimage={`url(${festival.image})`}
            onClick={() => {
              routingFestivalPage(festival.festivalId);
            }}>
            <div className="wather-info flex-all-center">
              <span>축제날씨</span>
              <span className="wather-icon flex-all-center">
                <WeatherIcon regionWeather={regionWeather} />
              </span>
            </div>
            <div className="festival-info">
              <p>
                {formatDate(festival.eventstartdate)} - {formatDate(festival.eventenddate)}
              </p>
              <h2>{festival.title}</h2>
              <span>
                <TiLocation /> {festival.area}
              </span>
            </div>
          </SliderContainer>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RecommendFestival;

const SliderContainer = styled.article<BgImage>`
  position: relative;
  background-image: linear-gradient(rgba(104, 104, 104, 0.6) 60%, rgba(0, 0, 0, 0.6)), ${props => props.backqroundimage};
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 300px;
  font-size: 1.5rem;
  color: #fff;
  z-index: 1;
  text-shadow: 0px 0px 10px rgb(0, 0, 0, 0.3);

  &.bg-color {
    background-color: #ccc;
  }

  > .wather-info {
    position: absolute;
    top: 20px;
    right: 20px;

    .wather-icon {
      width: 30px;
      height: 30px;
      margin-left: 5px;
      font-size: 2.5rem;
    }
  }

  > .festival-info {
    width: 100%;
    position: absolute;
    bottom: 60px;
    left: 20px;

    > h2 {
      width: calc(100% - 50px);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 2.5rem;
      font-weight: 700;
    }
  }
`;
