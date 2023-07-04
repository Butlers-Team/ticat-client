import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

//icon
import { TiLocation } from 'react-icons/ti';
import { BiSun } from 'react-icons/bi';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

interface Options {
  spaceBetween: number;
  effect: string;
  pagination: { clickable: boolean };
  loop: boolean;
  autoplay: { delay: number; disableOnInteraction: boolean };
  modules: (typeof Autoplay | typeof EffectFade | typeof Navigation | typeof Pagination)[];
}

interface festivaldata {
  contentId: number;
  title: string;
  image: string;
  address: string;
  eventstartdate: string;
  eventenddate: string;
  area: string;
}

interface BgImage {
  backqroundimage: string;
}

const RecommendFestival = () => {
  const [FestivalData, setFestivalData] = useState<festivaldata[]>([]);

  console.log(FestivalData);
  useEffect(() => {
    axios
      .get(`https://6cb7-124-111-225-247.ngrok-free.app/festivals/banner`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json', // Content-Type 값을 문자열로 지정
          'ngrok-skip-browser-warning': '69420',
        },
      })
      .then(res => {
        setFestivalData(res.data.data);
      });
  }, []);

  const swiperOptions: Options = {
    spaceBetween: 30,
    effect: 'fade',
    pagination: {
      clickable: true,
    },
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    modules: [Autoplay, EffectFade, Navigation, Pagination],
  };

  function formatDate(dateString: string) {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    return `${year}.${month}.${day}`;
  }

  return (
    <Swiper {...swiperOptions} className="mySwiper">
      {FestivalData.map(festival => (
        <SwiperSlide key={festival.contentId}>
          <SliderContainer
            backqroundimage={`url(${festival.image})`}
            className={`${festival.image}` === '' ? 'bg-color' : 'null'}>
            <div className="wather-info flex-all-center">
              <span>축제날씨</span>
              <span className="wather-icon flex-all-center">
                <BiSun />
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
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(104, 104, 104, 0.6)), ${props => props.backqroundimage};
  background-size: cover;
  background-position: center;
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

    > * {
      margin-bottom: 10px;
    }

    > h2 {
      font-size: 24px;
      font-weight: 700;
    }
  }
`;
